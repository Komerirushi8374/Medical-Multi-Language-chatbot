Komeri Rushi(23bds030) , Meghavath Likhith Naik(23bds034)  , Saragalla Manasa(23bds051) , Tejaswi A C (23bds064) , J P K Sree Harsha(23bds073)

This project is built with:
- Vite
- TypeScript
- React 
- shadcn-ui
- Tailwind CSS


Projct url :- https://medical-multi-language-chatbot.vercel.app/



 Frontend (User Interface)
Developed using HTML, CSS, JavaScript, and
React. Features include:
• Multilingual user interface
• Login and signup workflows
• Chat history viewer
• Emergency contact panel



 Backend (Server Layer)
The backend uses Supabase for auth and database
storage.
Modules:
• LLM Processor: Communicates with external
LLM APIs
• History Manager: Stores and retrieves chat
conversations
• Authentication Layer: Controls access to secure data
• Translation Layer: Ensures multilingual understanding

Medical Multi-Language Chatbot
│
├── Project Technologies
│   ├── Vite
│   ├── TypeScript
│   ├── React
│   ├── shadcn-ui
│   └── Tailwind CSS
│
├── URL
│   └── https://medical-multi-language-chatbot.vercel.app/
│
├── Frontend (User Interface)
│   ├── Technologies: HTML, CSS, JavaScript, React
│   └── Features
│       ├── Multilingual user interface
│       ├── Login and signup workflows
│       ├── Chat history viewer
│       └── Emergency contact panel
│
└── Backend (Server Layer)
    ├── Supabase (Auth + Database)
    └── Modules
        ├── LLM Processor
        │   └── Communicates with external LLM APIs
        ├── History Manager
        │   └── Stores and retrieves chat conversations
        ├── Authentication Layer
        │   └── Controls access to secure data
        └── Translation Layer
            └── Ensures multilingual understanding
## 🚀 Implementation Overview

This project is a **Medical Multi-Language Chatbot** built using modern web technologies and a scalable backend.

---

### 🧱 Frontend Implementation

1. **Project Initialization**
   ```bash
   npm create vite@latest
Choose React and TypeScript setup.

Install dependencies:

bash
Copy code
npm install
UI Stack Setup

Install and configure shadcn-ui components.

Set up Tailwind CSS:

bash
Copy code
npx tailwindcss init -p
User Interface Features

🌍 Multilingual Interface

Implemented using i18next and a language selector.

🔐 Authentication

Login and signup workflows integrated with Supabase Auth.

💬 Chat Window

Built a responsive chat interface with history viewer.

🚨 Emergency Panel

Displays emergency contact options.

🛠 Backend Implementation
Supabase Setup

Create a project in Supabase.

Configure environment variables in .env:

makefile
Copy code
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
Create database tables:

users

chat_history

Backend Modules

⚙️ LLM Processor

Communicates with external LLMs (e.g., Gemini, Llama 2).

📦 History Manager

Stores and retrieves chat conversations.

🛡 Authentication Layer

Secures access with role-based Supabase policies.

🌐 Translation Layer

Ensures multilingual input/output handling.

🌐 Deployment
Frontend hosted on Vercel
🔗 Live Link: https://medical-multi-language-chatbot.vercel.app/

Backend powered by Supabase (Auth + Database + Functions)


