# Melascope DX

Melascope DX is a skin lesion analysis tool powered by AI.

## Setup

### Prerequisites
- Python 3.8+
- Node.js 14+

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
   *(Ensure `httpx` is installed for the chatbot feature)*: `pip install httpx`
5. Create a `.env` file in `backend/` with:
   ```
   HF_TOKEN=your_huggingface_token
   
   # For Advisory Chatbot (OpenAI-compatible)
   LLM_API_KEY=your_api_key
   LLM_BASE_URL=https://api.openai.com/v1  # or https://api.groq.com/openai/v1 etc
   LLM_MODEL=gpt-4o-mini  # or llama-3.1-70b-versatile etc
   ```
6. Run: `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Features
- **Image Analysis**: Upload skin images to classify lesions.
- **Advisory Logic**: 
  - **Initial Report**: Generates safe, educational advice based on the predicted label.
  - **Chatbot**: Allows follow-up questions (e.g., "Is this contagious?") while maintaining strict safety constraints (no diagnosis).
- **Advisory Panel**: Expandable UI with smooth animations.

## Author
**V KARTHIKEYAN**
