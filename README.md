# 🤖 NEXUS AI Chatbot

NEXUS AI is a powerful **offline AI chatbot** built using local Large Language Models (LLMs).  
It runs completely on your machine — no API, no internet required.

---

## ✨ Features

- 🧠 Local AI (No API required)
- 💬 Real-time chat interface
- 📄 PDF upload & question answering
- 🕘 Chat history memory
- 🎨 Modern animated UI (glassmorphism design)
- ⚡ Fast & lightweight (GGUF models)

---

## 🏗️ Tech Stack

### Backend
- Python
- FastAPI
- LangChain
- llama-cpp-python

### Frontend
- React (Vite)
- Framer Motion (animations)
- Axios

### AI Model
- Mistral 7B (GGUF format)

---

## 📁 Project Structure


local-llm-chat/
│
├── backend/
│ ├── main.py
│ ├── llm.py
│ ├── pdf_utils.py
│ ├── models/
│ │ └── mistral-7b.gguf
│
├── frontend/
│ ├── src/
│ ├── index.html
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/your-username/nexus-ai-chatbot.git

cd nexus-ai-chatbot


---

### 2️⃣ Backend Setup


cd backend
pip install -r requirements.txt


---

### 3️⃣ Download Model

Download **Mistral 7B GGUF** and place it inside:


backend/models/


---

### 4️⃣ Run Backend


uvicorn main:app --reload


Server will run at:
👉 http://localhost:8000

---

### 5️⃣ Frontend Setup


cd frontend
npm install
npm run dev


Open:
👉 http://localhost:5173

---

## 🧪 Usage

1. Start backend & frontend
2. Open web app
3. Type your message
4. Get AI response instantly 🤖

---

## 📄 PDF Q&A

- Upload any PDF
- Ask questions from it
- AI will answer based on document context

---

## 🚀 Future Improvements

- 🔊 Voice input (Speech-to-Text)
- 🌙 Dark/Light mode toggle
- 💾 Save chats (database)
- ⚡ Streaming responses (typing effect)
- 🧠 Multi-agent system

---

## ⚠️ Note

- Requires **8GB+ RAM** (16GB recommended)
- Use quantized GGUF models for better performance

---

## 👨‍💻 Author

**Hamdan Saddique**

---

## ⭐ Support

If you like this project:
- ⭐ Star the repo
- 🍴 Fork it
- 🧠 Contribute ideas

---

## 📜 License

MIT License
