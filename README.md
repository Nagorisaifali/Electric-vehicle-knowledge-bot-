# ⚡ EV Knowledge Bot - Gemini AI Powered

A modern, full-stack Electric Vehicle knowledge chatbot powered by Google's Gemini AI. Upload PDFs, ask questions, and get intelligent responses backed by your custom knowledge base.

## ✨ Features

- ✅ **RAG (Retrieval-Augmented Generation)** - PDF-based knowledge retrieval
- ✅ **Vector Database** - FAISS for semantic search
- ✅ **Chat History** - SQLite database for conversation tracking
- ✅ **Multi-PDF Upload** - Batch process multiple documents
- ✅ **Streaming-like UI** - Responsive, real-time chat experience
- ✅ **Download Chat** - Export conversations as text files
- ✅ **Modern UI** - Tailwind CSS with glass morphism design
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Vector Embeddings** - Google's embedding model for intelligent search

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask
- **LLM**: Google Gemini AI (`gemini-1.5-flash`)
- **Vector DB**: FAISS
- **Text Processing**: LangChain
- **Database**: SQLite
- **API**: REST with CORS

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Router**: React Router DOM

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

## 🚀 Installation & Setup

### 1. Clone and Setup Backend

```bash
cd Backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### 2. Setup Frontend

```bash
cd Frontend
npm install
```

## 🔑 Environment Configuration

Create a `.env` file in the Backend directory:

```
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE_PATH=db.sqlite3
```

## ▶️ Running the Application

### Terminal 1 - Backend Server

```bash
cd Backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python venv/app.py
```

Backend will run on `http://localhost:5000`

### Terminal 2 - Frontend Server

```bash
cd Frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📱 Usage

### 1. **Upload PDFs** (Admin Page)
- Go to `/admin`
- Drag & drop or click to select PDF files
- Files are automatically processed and embeddings created
- Knowledge base is updated in real-time

### 2. **Chat** (Main Page)
- Go to `/` or click "Chat" in navbar
- Ask questions about Electric Vehicles
- Bot retrieves relevant context from knowledge base
- Responses powered by Gemini AI

### 3. **View History**
- Go to `/history`
- See all previous conversations
- Download entire history as text file
- Clear history if needed

## 🗂️ Project Structure

```
EV/
├── Backend/
│   ├── venv/
│   │   ├── app.py              # Main Flask app
│   │   ├── requirements.txt    # Python dependencies
│   │   ├── routes/
│   │   │   ├── chat.py         # Chat endpoint
│   │   │   ├── upload.py       # PDF upload endpoint
│   │   │   └── history.py      # History endpoint
│   │   ├── services/
│   │   │   ├── rag_service.py  # RAG logic
│   │   │   ├── vector_store.py # FAISS management
│   │   │   └── gemini_service.py # Gemini integration
│   │   ├── database/
│   │   │   └── db.py           # SQLite configuration
│   │   ├── utils/
│   │   │   └── pdf_loader.py   # PDF text extraction
│   │   └── uploads/            # Uploaded PDFs storage
│   └── .env.example            # Environment template
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx       # Navigation component
    │   │   ├── ChatBox.jsx      # Chat messages display
    │   │   └── Loader.jsx       # Loading spinner
    │   ├── pages/
    │   │   ├── Chat.jsx         # Main chat interface
    │   │   ├── Admin.jsx        # PDF upload page
    │   │   └── History.jsx      # Chat history page
    │   ├── services/
    │   │   └── api.jsx          # API configuration
    │   ├── App.jsx              # Main app component
    │   ├── main.jsx             # Entry point
    │   ├── index.css            # Global styles + Tailwind
    │   └── App.css              # App-specific styles
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🔄 API Endpoints

### Chat
- `POST /chat/` - Send message and get response
  ```json
  {
    "message": "What is EV battery technology?"
  }
  ```

### Upload
- `POST /upload/` - Upload PDF files
  - Multi-part form data with files array
  - Automatically creates embeddings

### History
- `GET /history/` - Get all chat history
- `POST /history/clear` - Clear all history

## 🎨 UI Features

- **Glass Morphism Design** - Modern frosted glass effect
- **Gradient Accents** - Sky blue to cyan gradients
- **Smooth Animations** - Fade-in, slide transitions
- **Dark Theme** - Eye-friendly dark mode
- **Responsive Grid** - Mobile-first design
- **Icon Integration** - Lucide React icons

## 🧠 How RAG Works

1. **Upload PDFs** → Text extraction via PyPDF2
2. **Split Text** → Chunking with LangChain (500 char chunks, 50 char overlap)
3. **Create Embeddings** → Google's embedding model
4. **Store in FAISS** → Vector database for fast similarity search
5. **Search** → Find relevant context for user query
6. **Generate Response** → Gemini AI creates answer based on context

## 📊 Database Schema

### History Table
```sql
CREATE TABLE history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## 🐛 Troubleshooting

### Backend Issues
- **"No module named 'flask'"** → Run `pip install -r requirements.txt`
- **"GEMINI_API_KEY not found"** → Create `.env` file and add your key
- **"CORS errors"** → Backend runs on port 5000, frontend on 5173

### Frontend Issues
- **"Module not found"** → Run `npm install`
- **"Port 5173 in use"** → Vite will automatically use another port

### PDF Processing
- **"Only PDF files are supported"** → Ensure you're uploading `.pdf` files
- **"No text extracted"** → Some PDFs may have image-only content

## 📝 Development Notes

- Backend runs in debug mode by default
- Frontend uses Vite's fast reload
- FAISS index stored in `Backend/faiss_index/`
- Database stored in `Backend/db.sqlite3`

## 🚀 Deployment

### Backend (Production)
```bash
gunicorn --bind 0.0.0.0:5000 app:app
```

### Frontend (Production Build)
```bash
npm run build
npm run preview
```

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Add authentication
- Implement user sessions
- Add more LLM models
- Improve PDF parsing
- Add voice input/output
- Implement streaming responses

## 📄 License

MIT License - Feel free to use for your projects

## 🙏 Acknowledgments

- Google Gemini AI for powerful LLM capabilities
- LangChain for RAG implementation
- FAISS for vector search efficiency

---

**Made with ❤️ for EV enthusiasts and developers**

For issues or questions, feel free to open an issue or contact the development team.
