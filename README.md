# 🔮 CareerForge – Full Stack AI Career Coach

**CareerForge** is an AI-powered career platform built using modern full-stack tools. It helps job seekers with AI-generated resumes, cover letters, interview prep, career insights, and personalized roadmaps using **Google Gemini AI**.



## 🚀 Features

- 📄 **AI Resume & Cover Letter Generator** using Gemini
- 🧠 **Mock Interviews** with instant feedback
- 📈 **Industry Insights** – salary, skill demand, growth rate
- 🗺️ **Explore Roadmap** – personalized learning paths for roles
- 🔐 **Secure Auth** using Clerk
- 🌀 **Serverless Flows** using Inngest
- 💅 **Modern UI** with Tailwind & Shadcn UI

---
## 🛠️ Tech Stack

This project is built using the following technologies:

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS & Shadcn UI
- **AI Engine:** Google Gemini AI API
- **Authentication:** Clerk
- **Database ORM:** Prisma
- **Background Jobs:** Inngest
- - **Hosting:** Vercel


---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/interview-os.git
cd interview-os
2. Install dependencies
bash
Copy
Edit
npm install
3. Create .env file
env
Copy
Edit
DATABASE_URL=your_neon_db_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=your_google_gemini_api_key
4. Push schema and start dev server
bash
Copy
Edit
npx prisma db push
npm run dev
