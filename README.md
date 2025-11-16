## 👥 Contributors

- **Rushi** (23BDS030)
- **Harsha** (23BDS073)
- **Likhith** (23BDS034)
- **Manasa** (23BDS051)
- **Teja** (23BDS064)

# 🏥 Medical Multi-Language Chatbot

A comprehensive multilingual medical chatbot application powered by Large Language Models (LLMs) that assists users in obtaining reliable health-related information through natural language interactions. The system supports multiple languages and provides contextual health advice with proper medical disclaimers.

## 🌐 Live Demo

**Project URL:** [https://medical-multi-language-chatbot.vercel.app/](https://medical-multi-language-chatbot.vercel.app/)

## ✨ Features

### Core Features
- **🌍 Multi-Language Support**: Chat in 9 different languages with dual-language mode support
  - English
  - Telugu + English
  - Hindi + English
  - Kannada + English
  - Tamil + English
  - Marathi + English
  - Urdu + English
  - Malayalam + English
  - Bengali + English

- **💬 Intelligent Chat Interface**: Powered by Google Gemini 2.5 Flash via LLM API
  - Natural language understanding
  - Context-aware responses
  - Medical information with proper disclaimers
  - Real-time chat experience

- **🔍 Symptoms Checker**: Interactive symptom selection tool
  - Pre-defined common symptoms list
  - Multi-symptom selection
  - Language-specific symptom translations
  - Quick health information retrieval

- **📜 Chat History Management**: 
  - Persistent conversation storage
  - View and resume previous conversations
  - Create new chat sessions
  - Similar to ChatGPT-style history management

- **🚨 Emergency Contacts**: 
  - Save and manage emergency contacts
  - Quick dial emergency services (108, 100, 101, 112)
  - Add, edit, and delete personal contacts
  - One-click calling functionality

- **🔐 User Authentication**:
  - Secure login and signup
  - Session management
  - Protected routes
  - User-specific data storage

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19
- **UI Library**: shadcn/ui (Radix UI components)
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack Query (React Query) 5.83.0
- **Form Handling**: React Hook Form 7.61.1 + Zod 3.25.76
- **Icons**: Lucide React 0.462.0

### Backend
- **Database & Auth**: Supabase
  - PostgreSQL database
  - Row Level Security (RLS)
  - Authentication service
  - Edge Functions (Deno)

- **AI/LLM Integration**:
  - Lovable AI Gateway
  - Google Gemini 2.5 Flash model
  - Custom medical assistant prompts
  - Multi-language response handling

### Deployment
- **Frontend**: Vercel
- **Backend**: Supabase Cloud

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **bun** (package manager)
- **Git**
- **Supabase Account** (for backend services)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Medical-Multi-Language-chatbot.git
cd Medical-Multi-Language-chatbot
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Configuration

#### Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the migration files in `supabase/migrations/` to set up the database schema:
   - `20251111053906_6f556fe5-4736-42ba-9722-0ed3e62c22c3.sql`
   - `20251112060906_d57eddac-fdb7-438a-bd05-53938daf1bb2.sql`

#### Edge Function Setup

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Deploy the edge function:
   ```bash
   supabase functions deploy medical-chat
   ```

4. Set the environment variable for the edge function:
   ```bash
   supabase secrets set LOVABLE_API_KEY=your_lovable_api_key
   ```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

## 📁 Project Structure

```
Medical-Multi-Language-chatbot/
├── public/                 # Static assets
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── ChatInterface.tsx
│   │   ├── ChatHistory.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── SymptomsChecker.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/      # Third-party integrations
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/               # Utility functions
│   │   ├── symptomsTranslations.ts
│   │   └── utils.ts
│   ├── pages/             # Page components
│   │   ├── Auth.tsx
│   │   ├── EmergencyContacts.tsx
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── supabase/
│   ├── functions/         # Edge functions
│   │   └── medical-chat/
│   │       └── index.ts
│   ├── migrations/        # Database migrations
│   └── config.toml        # Supabase config
├── .env                   # Environment variables (create this)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Supabase Database Schema

The application uses the following main tables:
- `conversations`: Stores chat conversation metadata
- `messages`: Stores individual chat messages
- `emergency_contacts`: Stores user emergency contacts
- `auth.users`: Supabase authentication users table

### Edge Function Configuration

The `medical-chat` edge function handles:
- LLM API communication
- Multi-language response formatting
- Medical disclaimers
- Error handling and rate limiting

## 💻 Usage

### For Users

1. **Sign Up / Login**: Create an account or log in to access the chatbot
2. **Select Language**: Choose your preferred language from the language selector
3. **Check Symptoms**: Use the symptoms checker to select your symptoms and get health information
4. **Chat**: Type your health-related questions in the chat interface
5. **View History**: Access your previous conversations from the chat history panel
6. **Manage Contacts**: Add and manage emergency contacts for quick access

### For Developers

#### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

#### Preview Production Build

```bash
npm run preview
```

#### Linting

```bash
npm run lint
```

## 🔌 API Integration

### Medical Chat API

The application uses a Supabase Edge Function that communicates with the Lovable AI Gateway:

**Endpoint**: `https://your-project.supabase.co/functions/v1/medical-chat`

**Request Format**:
```json
{
  "message": "User's health question",
  "language": "english" // or "telugu-english", "hindi-english", etc.
}
```

**Response Format**:
```json
{
  "reply": "AI-generated medical response"
}
```

## 🎨 UI Components

The project uses **shadcn/ui** components built on Radix UI primitives:
- Fully accessible components
- Customizable with Tailwind CSS
- Dark mode support (via next-themes)
- Responsive design

## 🔒 Security & Privacy

- **Authentication**: Secure user authentication via Supabase Auth
- **Row Level Security**: Database-level security policies
- **Data Encryption**: All data transmitted over HTTPS
- **User Privacy**: Chat history stored per user with proper isolation

## ⚠️ Medical Disclaimer

**IMPORTANT**: This chatbot is an AI assistant designed to provide general health information and suggestions for informational purposes only. 

- **NOT a substitute** for professional medical advice, diagnosis, or treatment
- **Always consult** with qualified healthcare professionals for proper medical diagnosis and treatment
- **Do not use** for emergency medical situations - call emergency services immediately
- **Never provides** specific medical diagnoses or prescription recommendations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed



## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for backend infrastructure
- [shadcn/ui](https://ui.shadcn.com) for beautiful UI components
- [Vercel](https://vercel.com) for deployment platform
- [Lovable AI](https://lovable.dev) for AI gateway services
- [Google Gemini](https://deepmind.google/technologies/gemini/) for LLM capabilities

## 📞 Support

For support, please open an issue in the GitHub repository or contact the project maintainers.

## 🔮 Future Enhancements

- [ ] Voice input/output support
- [ ] Additional language support
- [ ] Medical appointment scheduling
- [ ] Integration with health tracking devices
- [ ] Medication reminder system
- [ ] Health report generation
- [ ] Multi-user family accounts
- [ ] Offline mode support

---

**Made with ❤️ for better healthcare accessibility**
