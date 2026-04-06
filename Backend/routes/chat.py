from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
from services.rag_service import get_context
from services.gemini_service import ask_gemini
from database.db import save_to_history

load_dotenv()

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").strip()

    if not message:
        return jsonify({"error": "Message is required"}), 400

    # Get relevant context from RAG
    context = get_context(message)

    # Get response from Gemini
    reply = ask_gemini(message, context)

    # Save to history
    save_to_history(message, reply)

    return jsonify({
        "reply": reply,
        "question": message
    })