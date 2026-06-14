# 🎓 CampusCopilot AI
### Your AI Copilot for Every College Decision

> Built at VEDAM AI Builders Bootcamp · June 2026

CampusCopilot AI is a web-based AI assistant that helps Indian students make smarter college decisions — using Generative AI, not just information.

---

## 🚀 Live Demo
**[campuscopilot.github.io](https://your-username.github.io/CampusCopilot-AI)**

---

## 🧠 Features

| Module | What it does |
|--------|-------------|
| 🏫 **College Finder** | Enter your percentile, budget & goal → Get ranked college recommendations |
| ⚖️ **College Comparator** | Name two colleges → Get a detailed head-to-head with final verdict |
| 🔍 **Reality Check** | Any college → Honest summary of what students praise & flag |
| 🗺️ **Career Roadmap** | Your goal → Semester-by-semester 4-year plan |
| 📄 **Resume Reviewer** | Paste your resume → Score, gaps, and line-by-line rewrites |
| 🎤 **Interview Coach** | Live interview simulation with per-answer feedback & final scorecard |
| 📋 **Admission Guide** | College + exam → Step-by-step checklist, documents, and deadlines |
| 🎯 **Decision Score** ⭐ | Personalized college Fit Score out of 100 with 6-dimension star ratings |

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no framework)
- **AI:** [Groq API](https://groq.com) — ultra-fast inference (LLaMA 3)
- **Streaming:** Real-time token streaming for instant responses
- **Deployment:** GitHub Pages (static, free, permanent URL)

---

## 📁 Project Structure

```
CampusCopilot-AI/
├── index.html                  # Landing page
├── css/
│   └── style.css               # Full design system
├── js/
│   ├── groq.js                 # Groq API handler + markdown renderer
│   └── shell.js                # Nav + floating chat widget
├── pages/
│   ├── college-finder.html
│   ├── compare.html
│   ├── reality.html
│   ├── roadmap.html
│   ├── resume.html
│   ├── interview.html
│   ├── admission.html
│   └── decision-score.html
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/CampusCopilot-AI.git
cd CampusCopilot-AI
```

### 2. Add your Groq API key
Open `js/groq.js` and replace:
```js
const GROQ_API_KEY = "YOUR_GROQ_API_KEY";
```
Get a free key at [console.groq.com](https://console.groq.com)

### 3. Open locally
Just open `index.html` in your browser. No server needed.

### 4. Deploy to GitHub Pages
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
Then go to **Settings → Pages → Deploy from main branch**. Live in ~60 seconds.

---

## 🏗️ Architecture

```
User Input
    │
    ▼
HTML Form / Chat UI
    │
    ▼
Feature-specific System Prompt (js/groq.js)
    │
    ▼
Groq API (LLaMA 3 · Streaming)
    │
    ▼
Markdown Renderer → Live UI Update
    │
    ▼
User sees response in real-time
```

---

## 🔮 Future Scope

- [ ] RAG with official college brochures (PDF upload)
- [ ] JEE/MHT-CET scorecard upload → instant college list
- [ ] Voice-based interview practice
- [ ] Real placement data integration
- [ ] Multi-language support (Hindi, Marathi)
- [ ] College community Q&A with AI moderation

---

## 💡 Inspiration

This project was inspired by:
- **CampusCritique** — student reviews and honest opinions
- **Campus Connect** — mentorship and personalized guidance

CampusCopilot AI takes their central mission — helping students make better college decisions — and rebuilds it as an **AI-native decision engine** that couldn't exist before LLMs.

---

## 👨‍💻 Built By

**Prathamesh Thakur** · VEDAM AI Builders Bootcamp · June 2026

---

## 📄 License

MIT License — free to use and build upon.
