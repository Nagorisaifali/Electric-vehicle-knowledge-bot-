
import google.generativeai as genai
import os
from urllib.error import URLError

GEMINI_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_KEY:
    raise RuntimeError("GEMINI_API_KEY is missing. Set it in your .env file.")

genai.configure(api_key=GEMINI_KEY)

# You can set a specific model in .env to override runtime pick
MODEL_NAME = os.getenv("GEMINI_MODEL_NAME")

FALLBACK_MODELS = [
    "gemini-1.5-flash",
    "gemini-1.0",
    "gemini-1.5-pro",
    "gemini-2.5-flash",  
    "gemini-ultra-1.0",   
    "gemini-pro",                                    
]


def choose_model():
    if MODEL_NAME:
        return MODEL_NAME

    try:
        models = genai.list_models()
    except Exception as e:
        print(f"Could not list models: {e}")
        # fallback list if service call fails
        return FALLBACK_MODELS[0]

    available = [m.name for m in models if hasattr(m, "name")]

    for m in FALLBACK_MODELS:
        if m in available:
            print(f"Using Gemini model: {m}")
            return m

    # if none matches fallback, take first supported that has generate_content hint
    for m in available:
        # this check may require `supported_generation_methods` attribute in newest SDK
        # fallback to first available model name if no method details
        return m

    raise RuntimeError("No Gemini model available from list_models")

MODEL_ACTIVE = choose_model()
print(f"Gemini active model selected: {MODEL_ACTIVE}")

def ask_gemini(question, context):
    prompt = f"""
You are an EV expert.

Context:
{context}

Question:
{question}
"""

    try:
        model = genai.GenerativeModel(MODEL_ACTIVE)
        res = model.generate_content(prompt)
        return res.text
    except Exception as e:
        # Return error text for debugging
        return f"Error: {str(e)}" 