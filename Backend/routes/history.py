from flask import Blueprint, jsonify
from database.db import get_history, clear_history, get_history_by_id

history_bp = Blueprint("history", __name__)

@history_bp.route("/", methods=["GET"])
def get_chat_history():
    """Get all chat history"""
    data = get_history()
    return jsonify(data)

@history_bp.route("/<int:history_id>", methods=["GET"])
def get_chat_history_detail(history_id):
    """Get specific chat history by ID"""
    data = get_history_by_id(history_id)
    if data:
        return jsonify(data)
    else:
        return jsonify({"error": "History not found"}), 404

@history_bp.route("/clear", methods=["POST"])
def clear_chat_history():
    """Clear all chat history"""
    success = clear_history()
    if success:
        return jsonify({"message": "History cleared successfully"}), 200
    else:
        return jsonify({"error": "Failed to clear history"}), 500