# backend/main.py

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from model import load_model, predict, get_class_names
from advisory import router as advisory_router

app = FastAPI(
    title="Melascope DX Backend",
    description="Skin lesion classifier API",
    version="1.0.0",
)

app.include_router(advisory_router, prefix="/api")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173", # Vite default
    "http://127.0.0.1:5173",
    "*" # Debug: Allow all
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    load_model()


@app.get("/api/health")
def health():
    try:
        classes = get_class_names()
        model_loaded = len(classes) > 0
    except Exception:
        model_loaded = False
        classes = []

    return {
        "status": "ok" if model_loaded else "error",
        "model_loaded": model_loaded,
        "num_classes": len(classes),
    }


@app.post("/api/analyze")
@app.post("/api/assess")  # <- frontend currently calls this
async def analyze_lesion(file: UploadFile = File(...)):
    """
    Receive an image and return probabilities for all 31 classes.
    """
    print(f"Received analysis request for file: {file.filename}")
    try:
        image_bytes = await file.read()
        print(f"Read {len(image_bytes)} bytes")
        result = predict(image_bytes)
        print("Prediction successful")
        return result
    except Exception as e:
        print(f"Error during analysis: {e}")
        import traceback
        traceback.print_exc()
        return {"error": str(e), "top_prediction": {"label": "Error", "confidence": 0.0}, "predictions": []}
