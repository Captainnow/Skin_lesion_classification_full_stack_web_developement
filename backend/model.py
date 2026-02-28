# backend/model.py

import io
from typing import Dict, List, Any

import torch
from PIL import Image
from transformers import (
    AutoConfig,
    AutoImageProcessor,
    AutoModelForImageClassification,
)

# Load from local folder with config.json, preprocessor_config.json, model.safetensors
MODEL_DIR = "model_files"

_device = torch.device("cpu")
_model = None
_processor = None
_class_names: List[str] = []


def load_model():
    global _model, _processor, _class_names

    print("Melascope DX - Starting up...")
    print("==================================================")
    print(f"Loading Melascope DX model from local folder: {MODEL_DIR}")

    try:
        # Load config with correct id2label/label2id from local files
        config = AutoConfig.from_pretrained(MODEL_DIR, local_files_only=True)
        config.protected_namespaces = ()

        # Image processor
        _processor = AutoImageProcessor.from_pretrained(
            MODEL_DIR, local_files_only=True
        )

        # Model
        _model = AutoModelForImageClassification.from_pretrained(
            MODEL_DIR,
            config=config,
            local_files_only=True,
        )

        _model.to(_device)
        _model.eval()

        # Build class names from config.id2label (0..N-1)
        _class_names = [config.id2label[i] for i in range(len(config.id2label))]

        print(f"Number of classes: {len(_class_names)}")
        print("\nID → Label mapping:\n")
        for i, name in enumerate(_class_names):
            print(f"{i}: {name}")

        print("Model loaded successfully.")
    except Exception as e:
        print(f"ERROR: Failed to load model from local folder: {e}")

    print("==================================================")


def get_class_names() -> List[str]:
    return _class_names


def _prepare_inputs(image_bytes: bytes) -> Dict[str, torch.Tensor]:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    inputs = _processor(images=img, return_tensors="pt")
    inputs = {k: v.to(_device) for k, v in inputs.items()}
    return inputs


def predict(image_bytes: bytes) -> Dict[str, Any]:
    """Run inference and return raw class probabilities (no risk logic)."""
    assert _model is not None and _processor is not None, "Model not loaded"

    inputs = _prepare_inputs(image_bytes)

    with torch.no_grad():
        outputs = _model(**inputs)
        probs = torch.softmax(outputs.logits, dim=-1)[0].cpu().numpy()

    indices = probs.argsort()[::-1]
    predictions = [
        {"label": _class_names[idx], "confidence": float(probs[idx])}
        for idx in indices
    ]
    top_prediction = predictions[0]

    return {
        "top_prediction": top_prediction,
        "predictions": predictions,
    }
