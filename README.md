# 🔮 CareerForge – Premium Full-Stack AI Career Coach

An intelligent full-stack career development platform that empowers job seekers with ATS-optimized resume builder, tailored cover letters, adaptive mock interviews, elite AI code reviewer, and an interactive career coach.

Built using Next.js 15, React 19, Prisma ORM, Clerk Auth, Inngest, Neon PostgreSQL, Tailwind CSS, and powered by Google Gemini AI to deliver a modern, premium, and accessible career building experience.

---

## 🌐 Live Demo

🔗 **Live Application:** [https://careerforge-sanjay.vercel.app](https://careerforge-sanjay.vercel.app)

---

## ✨ Key Features

### 📄 ATS-Optimized Resume Builder
- Generates and rewrites resume sections using **Google Gemini AI**
- Computes real-time **ATS scoring** to evaluate resume strength
- Highlights key areas of improvement and **keyword recommendations**
- Supports direct client-side **PDF export** with professional layouts

---

### ✉️ Targeted Cover Letter Generator
- Analyzes candidate profile (industry, skills, bio) against job description
- Generates highly tailored, high-end, and professional **cover drafts**
- Integrated **inline editor** to fine-tune the content before saving
- Clean **PDF download** options for immediate job applications

---

### 🧠 Intelligent Mock Interviews
- Dynamically creates **adaptive technical quizzes** matching specific roles and skills
- Interactive testing console with **automated scoring** and performance reports
- AI-generated improvement tips and comprehensive answer feedback
- Built-in **proctoring engine** detecting tab-switching and cheating attempts

---

### 💻 Elite AI Code Reviewer
- Multi-mode code diagnostics supporting **Simple, Technical, and Error-focused** feedback
- Queries **Stack Exchange API** to fetch real-world accepted **StackOverflow solutions** for runtime errors
- Helps developers debug, refactor, and learn coding best practices in real time

---

### 💬 HireMind AI Career Coach
- Interactive chatbot acting as your personal, professional **career mentor**
- Delivers real-time advice on **salary negotiation, interview tips, and job searching**
- Tailored suggestions based on onboarding experience and user profile data

---

### 🗺️ Interactive Career Roadmaps
- Displays curated learning grids for over **20+ technology and engineering roles**
- Features direct embedded roadmaps integrated from **roadmap.sh**
- Helps developers select and chart their skill paths from Frontend to AI Engineering

---

### 🌀 Inngest Automated Insights
- Automated background runner executing **weekly cron jobs** for industry updates
- Scrapes and updates local databases with **market demand levels, salary statistics, and hiring trends**
- Serverless event coordination ensuring consistent database optimization

---

### 🔐 Secure Authentication
- **Clerk Security** gateway mapping and protecting private dashboard access
- Customizable theme layouts integrated with **Next.js App Router**
- Dynamic onboarding questionnaire mapping candidate profile to local database schemas

---

### 📱 Responsive Design
- Mobile-first premium layout crafted using **Tailwind CSS** and **shadcn/ui**
- Seamless transition between dark and light themes for elite dark-mode experiences
- Interactive animations powered by **Framer Motion** and **Lucide icons**

---

## 🛠️ Technology Stack

### Frontend
- Next.js 15 (App Router, Server Actions)
- React 19
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Monaco Editor (for code inputs)
- Recharts (for analytics and insights graphs)

---

### Backend & Database
- Next.js 15 Server Actions (Unified full-stack logic)
- Clerk Security (Authentication and user management)
- Inngest Engine (Serverless background cron jobs and event handling)
- Prisma ORM (Object-Relational Mapping)
- Neon PostgreSQL (Cloud serverless database instance)

---

### AI & External APIs
- Google Gemini AI (gemini-2.5-flash with gemini-pro fallback)
- Stack Exchange API (StackOverflow)

---

## 🏗️ System Overview

```
                     [Clerk Authentication Gate]
                                  │
                                  ▼
                     [Onboarding Questionnaire]
                 (Industry, Experience, Skills, Bio)
                                  │
                                  ▼
     ┌────────────────────── [Dashboard] ──────────────────────┐
     │                            │                            │
     ▼                            ▼                            ▼
[Resume Builder]          [Cover Letter Gen]           [Mock Interview]
- AI Resume Writer        - Custom per Job            - 10 Adaptive Qs
- ATS Score & Feedback    - Draft / Save / Edit        - Proctoring Engine
- Client PDF Export       - Client PDF Export          - Score & AI Tips
     │                            │                            │
     └────────────────────────────┼────────────────────────────┘
                                  │
                                  ▼
     ┌─────────────────────── Services ────────────────────────┐
     │                            │                            │
     ▼                            ▼                            ▼
[AI Code Reviewer]        [HireMind Coach]             [Career Roadmaps]
- Multi-mode Analysis     - AI Interactive Chat        - Interactive Grid
- StackOverflow Sync      - Contextual Career Tips     - Curated roadmaps
                                  │
                                  ▼
                     [Inngest Background Worker]
                 - Cron Job: Weekly Insight Updates
                 - API Data Mapping & Neon Sync
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or above)
- Git
- Neon Database or local PostgreSQL database
- Gemini API Key
- Clerk API Keys

---

### Clone the Repository
```bash
git clone https://github.com/sanjay-dtu/CareerForge.git
cd CareerForge
npm install
```

---

### Environment Variables
Create a `.env` file in the project root.

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Auth Route Mappings
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Gemini AI Credentials
GEMINI_API_KEY=your_google_gemini_api_key_here

# StackOverflow API key (Optional, for higher rate limits on error explanations)
STACK_EXCHANGE_API=your_stack_exchange_api_key_here

# Custom Application Constants (Optional)
NEXT_PUBLIC_REVIEW_MIN_INTERVAL_MS=20000
NEXT_PUBLIC_BASE_URL="/api"
NEXT_PUBLIC_MAX_LENGTH=8000
```

---

### Run Locally
```bash
# Generate Prisma Client and sync DB schemas
npx prisma generate
npx prisma db push

# Start the Inngest local development server (runs background actions on port 8288)
npx inngest-cli dev

# Launch the Next.js development server
npm run dev
```

Next.js Server: http://localhost:3000
Inngest Local Panel: http://localhost:8288

---

## ☁️ Deployment
The application is deployed on Vercel with Inngest hooks set up to coordinate background cron events. Neon serverless postgres operates as the backend database layer.

Live URL
[https://careerforge-sanjay.vercel.app](https://careerforge-sanjay.vercel.app)

---

## 🚧 Challenges Faced

Developing CareerForge involved solving several practical challenges that are common in modern AI-powered full-stack applications.

---

### 🔄 Next.js 15 & React 19 State Synchronization
Coordinating communication between server-side actions, client components, and Inngest runners required careful layout structure and state caching. Handling concurrent async requests for resume writing while avoiding network timeouts was a major developmental hurdle.

---

### 🌐 Cloud Auth & Database Migration
Securing Clerk authentication gate redirects on the server-side, while handling user profile schema creation on Prisma db push migrations, demanded precise onboarding triggers. Managing postgres connection pools on serverless Neon instances during heavy database queries required optimizing Prisma client initializers.

---

### 🔐 Secure API Key & Secrets Management
CareerForge relies heavily on multiple API credentials (Gemini, Clerk, Stack Exchange). Shifting high-risk AI operations strictly to next.js server-side files prevented exposure of credentials to frontend clients, ensuring keys are safely contained within the environment.

---

### 🤖 AI Output Consistency & Structuring
Gemini-generated output can sometimes return unformatted text or violate structural guidelines. Implementing strict JSON validation, error bounds, and default fallback content structures ensured that the resume builder and mock interview dashboard render reliably under any AI result.

---

### 🗄 Background Jobs & Cron Scheduling
Executing Inngest background workers to fetch and compute industry salary insights weekly required syncing local data with Gemini insights. Designing serverless function endpoints that are easily pingable by Inngest servers without compromising security was an important backend architectural achievement.

---

### 📱 Multi-Device UI Fidelity & PDF Rendering
Ensuring that complex components (interactive dashboards, mock interview editors, and roadmaps) adjust seamlessly on tablets, desktop, and mobile viewports. Generating print-perfect resume PDFs client-side without layout shifts or text breaks using html2pdf.js required substantial CSS optimizations.

---

## 🔮 Upcoming Features (Roadmap)
We are constantly working to make CareerForge the ultimate tool for modern career preparation. Here is what we are planning next:

- **Real-Time Mock Interview Partner:** A peer-to-peer WebRTC platform to practice live behavioral interviews with real-time video/audio.
- **AI Video & Speech Sentiment Analysis:** Using computer-vision/audio models to assess eye contact, filler words, and vocal pacing during practice tests.
- **Auto-Apply Chrome Extension:** An extension that auto-fills jobs, extracts requirements from LinkedIn/Indeed, and auto-generates custom cover letters in one click.
- **Automated Job Boards Aggregator:** Direct dashboard integrations importing and listing recent matching roles with one-click custom fit scoring.
- **Hyper-Tailored Interview Prep:** Directly upload a job description document and let CareerForge create a focused, 10-step mock exam matching that precise company.
