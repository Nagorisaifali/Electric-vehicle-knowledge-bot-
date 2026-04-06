
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from routes.chat import chat_bp
from routes.upload import upload_bp
from routes.history import history_bp
from database.db import init_db
import os

load_dotenv()

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/chat/*": {"origins": "*"},
    r"/upload/*": {"origins": "*"},
    r"/history/*": {"origins": "*"}
})

# Initialize database
init_db()

# Register blueprints
app.register_blueprint(chat_bp, url_prefix="/chat")
app.register_blueprint(upload_bp, url_prefix="/upload")
app.register_blueprint(history_bp, url_prefix="/history")

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "EV Knowledge Bot is running"}), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)