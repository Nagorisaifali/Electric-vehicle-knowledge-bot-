
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from services.vector_store import save_index, load_index

def create_rag(texts):
    """Create RAG embeddings from extracted text"""
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    
    docs = []
    for text in texts:
        chunks = splitter.split_text(text)
        for chunk in chunks:
            docs.append(Document(page_content=chunk))
    
    if docs:
        success = save_index(docs)
        return success
    return False

def get_context(query):
    """Retrieve relevant context from vector store"""
    try:
        db = load_index()
        if db is None:
            return ""
        
        docs = db.similarity_search(query, k=3)
        context = " ".join([d.page_content for d in docs])
        return context
    except Exception as e:
        print(f"Error retrieving context: {str(e)}")
        return ""