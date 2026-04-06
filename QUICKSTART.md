# 🚀 Quick Start Guide - EV Knowledge Bot

Get up and running in 5 minutes!

## ⚡ 1-Line Setup

### First Time Setup

**Windows:**
```bash
cd Backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && cd ..\Frontend && npm install
```

**macOS/Linux:**
```bash
cd Backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && cd ../Frontend && npm install
```

## 🔑 Set Your API Key

1. Get your Gemini API key: https://makersuite.google.com/app/apikey
2. Create `.env` in Backend folder:
```
GEMINI_API_KEY=your_key_here
```

## ▶️ Run the App

**Open 2 terminals:**

**Terminal 1 (Backend):**
```bash
cd Backend
venv\Scripts\activate  # or source venv/bin/activate
python venv/app.py
```
✅ Backend running on http://localhost:5000

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm run dev
```
✅ Frontend running on http://localhost:5173

## 🎯 What to Try

1. **📄 Upload PDFs** → Go to Admin page (`/admin`), upload EV-related PDFs
2. **💬 Chat** → Ask questions about EVs on main page (`/`)
3. **📚 History** → View past conversations (`/history`)

## 📝 Example Questions

- "What are the advantages of lithium-ion batteries?"
- "How far can modern electric vehicles travel on a single charge?"
- "What is the environmental impact of EV production?"
- "Explain DC fast charging technology"
- "What are the different EV platforms available?"

## 🛠️ Available Commands

### Backend
```bash
python venv/app.py          # Run development server
```

### Frontend
```bash
npm run dev                 # Start development server
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Check code quality
```

## 📱 Mobile Support

The app is fully responsive! Works great on:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)

## 🔧 Troubleshooting

### Issue: "Module not found"
**Solution:** Make sure you ran `pip install -r requirements.txt` and `npm install`

### Issue: "GEMINI_API_KEY not found"
**Solution:** Create `.env` file in Backend folder with your API key

### Issue: Port already in use
**Solution:** 
- Backend: Change port in `app.py` (last line)
- Frontend: Vite will automatically use another port

### Issue: CORS errors
**Solution:** Make sure Backend is running on port 5000 and Frontend on 5173

## 📊 Project Stats

- **Backend**: ~300 lines Python
- **Frontend**: ~900 lines React
- **Components**: 8 components
- **Pages**: 3 pages (Chat, Admin, History)
- **Dependencies**: 15 Python packages, 7 npm packages

## 🎓 Learning Resources

- [LangChain Docs](https://python.langchain.com)
- [FAISS Documentation](https://github.com/facebookresearch/faiss)
- [Gemini API](https://ai.google.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 💡 Next Steps

1. Upload your EV knowledge PDFs
2. Start asking questions!
3. Download and share conversations
4. Customize the UI colors/theme

## 🎨 Customization

### Change Colors
Edit `Frontend/tailwind.config.js`:
```js
colors: {
  primary: '#0EA5E9',      // Change these
  secondary: '#06B6D4',
  accent: '#EC4899',
}
```

### Change Chatbot Personality
Edit `Backend/venv/routes/chat.py`:
```python
prompt = f"""You are an expert on..."""  # Modify this
```

## 📞 Support

- Check README.md for detailed documentation
- Review code comments for implementation details
- Ensure all dependencies are installed correctly

---

**Ready? Start your Backend and Frontend servers above! 🚀**
