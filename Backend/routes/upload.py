from flask import Blueprint, request, jsonify
import os
from utils.pdf_loader import extract_text
from services.rag_service import create_rag

upload_bp = Blueprint("upload", __name__)

# Ensure uploads directory exists
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@upload_bp.route("/", methods=["POST"])
def upload():
    """Upload and process PDFs for RAG"""
    files = request.files.getlist("files")
    
    if not files or len(files) == 0:
        return jsonify({"error": "No files provided"}), 400
    
    texts = []
    processed_files = []
    
    try:
        for file in files:
            if file.filename == "":
                continue
            
            # Check file extension
            if not file.filename.lower().endswith(".pdf"):
                continue
            
            # Save file
            path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(path)
            processed_files.append(file.filename)
            
            # Extract text
            text = extract_text(path)
            if text:
                texts.append(text)
        
        if not texts:
            return jsonify({"error": "No valid PDF text extracted"}), 400
        
        # Create RAG embeddings
        success = create_rag(texts)
        
        if success:
            return jsonify({
                "message": "PDFs processed successfully",
                "files_processed": processed_files,
                "count": len(processed_files)
            }), 200
        else:
            return jsonify({"error": "Failed to create embeddings"}), 500
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500