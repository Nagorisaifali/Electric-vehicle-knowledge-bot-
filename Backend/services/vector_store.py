
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from dotenv import load_dotenv

load_dotenv()

def save_index(docs):
    """Save document embeddings to FAISS vector store"""
    try:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
        db = FAISS.from_documents(docs, embeddings)
        db.save_local("faiss_index")
        return True
    except Exception as e:
        print(f"Error saving FAISS index: {str(e)}")
        return False

def load_index():
    """Load FAISS vector store from local storage"""
    try:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
        if os.path.exists("faiss_index"):
            return FAISS.load_local("faiss_index", embeddings)
        else:
            return None
    except Exception as e:
        print(f"Error loading FAISS index: {str(e)}")
        return None