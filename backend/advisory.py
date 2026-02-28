# backend/advisory.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os, json
import httpx
from typing import List, Optional

# Env vars for OpenAI-compatible endpoint
LLM_API_KEY = os.getenv("LLM_API_KEY")
LLM_BASE_URL = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")

router = APIRouter()

# --- Data Models ---

class AdvisoryRequest(BaseModel):
    label: str
    confidence: float

class AdvisoryResponse(BaseModel):
    title: str
    summary: str
    next_steps: str
    prevention: str
    disclaimer: str

class ChatTurn(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    
class ChatRequest(BaseModel):
    label: str
    confidence: float
    history: List[ChatTurn]  # Previous conversation

class ChatResponse(BaseModel):
    content: str

# --- Risk Logic ---

def get_risk_profile(label: str, confidence: float) -> dict:
    """
    Returns dict with {risk, type, note} for all 31 labels.
    """
    l = label.lower()
    
    # Defaults
    risk = "Medium"
    l_type = "Skin Condition"
    note = "Standard dermatological condition."

    # 1. High Risk / Neoplastic
    if any(x in l for x in ["melanoma", "basal cell", "squamous cell", "mycosis fungoides", "carcinoma"]):
        risk = "High"
        l_type = "Neoplastic / Potential Malignancy"
        note = "Urgent. Suggest professional biopsy/evaluation. Do not panic but emphasize importance of doctor visit."
    
    # 2. Pre-cancerous
    elif "actinic keratosis" in l:
        risk = "Medium-High"
        l_type = "Pre-cancerous (Actinic Keratosis)"
        note = "Potential to develop into carcinoma if untreated. Needs medical attention."

    # 3. Infectious (Fungal/Viral/Parasitic/Bacterial)
    elif "tinea" in l:
        risk = "Medium"
        l_type = "Fungal Infection"
        note = "Contagious. Needs antifungal treatment."
    elif "herpes" in l or "molluscum" in l:
        risk = "Medium"
        l_type = "Viral Infection"
        note = "Contagious. Herpes needs antiviral consideration; Molluscum often self-limiting but contagious."
    elif "impetigo" in l:
        risk = "Medium"
        l_type = "Bacterial Infection"
        note = "Highly contagious. Needs antibiotics."
    elif any(x in l for x in ["larva", "pediculosis", "tungiasis", "scabies"]):
        risk = "Medium"
        l_type = "Parasitic Infestation"
        note = "Needs antiparasitic treatment. Hygiene advice important."
    elif "leprosy" in l:
        risk = "High" # Serious chronic infection
        l_type = "Chronic Bacterial Infection (Leprosy)"
        note = "Serious condition requiring specialized long-term antibiotic therapy."

    # 4. Inflammatory / Autoimmune / Chronic
    elif any(x in l for x in ["psoriasis", "lichen", "lupus", "porokeratosis", "pityriasis", "darier", "hailey", "epidermolysis"]):
        risk = "Medium"
        l_type = "Inflammatory / Autoimmune"
        note = "Chronic mgmt. Not usually immediate emergency, but needs dermatologist for quality of life/treatment."
    
    # 5. Benign
    elif any(x in l for x in ["nevus", "benign", "keratosis", "dermatofibroma", "vascular", "skin tag", "papilomatosis"]):
        risk = "Low"
        l_type = "Benign Growth"
        note = "Likely harmless. Monitor for changes."

    # Confidence Adjustment
    if confidence < 0.6:
        note += " (Model confidence is LOW. Emphasize uncertainty.)"
    
    return {"risk": risk, "type": l_type, "note": note}

# --- LLM Helper ---

def build_system_prompt() -> str:
    return (
        "You are a dermatology education assistant for a student project 'Melascope DX'. "
        "You are NOT a doctor. You DO NOT diagnose, prescribe, or give medical instructions.\n"
        "SAFETY CONSTRAINTS (NEVER BREAK):\n"
        "1. NO DIAGNOSIS: Never say 'You have X'. Say 'The image shows signs consistent with X'.\n"
        "2. STRICTLY NO TREATMENTS OR MEDICATIONS: You must NOT mention any liquid, cream, pill, or procedure names, NOT EVEN categories like 'corticosteroids' or 'antifungals'. If asked about treatment, you MUST say: 'I cannot recommend treatments or medications. Please consult a dermatologist for a proper care plan.'\n"
        "3. NO EMERGENCIES: Do not triage. Always say 'See a doctor'.\n"
        "4. DISCLAIMER: Always imply uncertainty. Use phrases like 'typically', 'common presentation'.\n"
    )

async def call_llm(messages: list, json_mode: bool = False) -> str:
    if not LLM_API_KEY:
        raise Exception("LLM_API_KEY not set")
        
    headers = {
        "Authorization": f"Bearer {LLM_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": LLM_MODEL,
        "messages": messages,
        "max_tokens": 400,
        "temperature": 0.3
    }
    
    if json_mode:
        payload["response_format"] = {"type": "json_object"}

    async with httpx.AsyncClient() as client:
        # User requested specific OpenAI-comaptible path construction
        url = f"{LLM_BASE_URL}/v1/chat/completions"
        resp = await client.post(url, headers=headers, json=payload, timeout=30.0)
        
        if resp.status_code != 200:
            raise Exception(f"LLM API Error {resp.status_code}: {resp.text}")
            
        data = resp.json()
        return data["choices"][0]["message"]["content"]

# --- Endpoints ---

@router.post("/advisory", response_model=AdvisoryResponse)
async def advisory(req: AdvisoryRequest):
    # Mock fallback for local dev if key missing OR explicitly set to "MOCK"
    if not LLM_API_KEY or LLM_API_KEY == "MOCK":
        print("MOCK mode active.")
        return {
            "title": f"Advisory for {req.label} (Simulation)",
            "summary": f"This is a SIMULATED advisory for {req.label}. The AI service is in Mock Mode.",
            "next_steps": "Set a valid API key in .env to get real AI advice.",
            "prevention": "Check README for setup instructions.",
            "disclaimer": "Simulated response. NOT A DIAGNOSIS."
        }

    profile = get_risk_profile(req.label, req.confidence)
    
    system_msg = build_system_prompt() + (
        "\nTASK: Provide structured advice for the predicted label.\n"
        "Output JSON with keys: title, summary, next_steps, prevention, disclaimer."
    )
    
    user_msg = (
        f"Label: {req.label}\n"
        f"Confidence: {req.confidence:.2f}\n"
        f"Risk Category: {profile['risk']}\n"
        f"Type: {profile['type']}\n"
        f"Context: {profile['note']}\n\n"
        "Generate JSON."
    )
    
    try:
        content = await call_llm([
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ], json_mode=True)
        return json.loads(content)
    except Exception as e:
        print(f"Error in advisory: {e}")
        # Graceful fallback so UI doesn't break
        return {
            "title": f"Advisory for {req.label} (Fallback)",
            "summary": "We could not reach the AI advisor at this moment. The lesion has been analyzed, but detailed AI advice is unavailable.",
            "next_steps": "Please consult a dermatologist for a manual evaluation.",
            "prevention": "Monitor the area for changes and protect from sun exposure.",
            "disclaimer": "AI service unavailable. NOT A DIAGNOSIS."
        }

@router.post("/advisory/chat", response_model=ChatResponse)
async def advisory_chat(req: ChatRequest):
    if not LLM_API_KEY:
         return {"content": "I cannot chat because the LLM_API_KEY is missing."}
    
    profile = get_risk_profile(req.label, req.confidence)

    # Explicit Mock Mode
    if LLM_API_KEY == "MOCK":
        return {"content": f"[MOCK AI] I see you are asking about {req.label}. Since I am in simulation mode, I can confirm this is typically a {profile['risk']} risk condition. Please see a doctor!"}

    
    system_msg = build_system_prompt() + (
        "\nTASK: Answer the user's follow-up question about the lesion.\n"
        "Keep answers concise (2-3 sentences max unless asked for detail).\n"
        "Maintain the safety tone established by the risk profile."
    )
    
    # Build history
    messages = [{"role": "system", "content": system_msg}]
    
    # Provide context in the first assistant turn simulation or strictly in system
    # Let's add specific context msg
    messages.append({
        "role": "system", 
        "content": f"Current Context - Condition: {req.label}, Risk: {profile['risk']}, Type: {profile['type']}."
    })
    
    # Append history
    for turn in req.history:
        messages.append({"role": turn.role, "content": turn.content})
        
    try:
        content = await call_llm(messages, json_mode=False)
        return {"content": content}
    except Exception as e:
        print(f"Error in chat: {e}")
        # Return error as a chat message so user sees it
        return {"content": "I apologize, but I am currently unable to connect to the AI service (Quota/Connection Error). Please try again later or consult a doctor."}
