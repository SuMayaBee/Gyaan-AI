# জ্ঞান AI - AI-Powered Learning Platform

জ্ঞান AI is an AI-driven learning platform designed to enhance the educational experience. It allows users to create learning content, generate flashcards, quizzes, and much more using artificial intelligence for an optimized learning process.

## 🚀 Features

- **AI-Powered Content Creation**: Generate educational content effortlessly with AI.
- **Flashcards & Quizzes**: Automatically create interactive flashcards and quizzes.
- **Personalized Learning**: Tailored content for different learning levels.
- **Serverless Functions**: Uses Inngest for seamless backend processes.
- **Next.js & Tailwind**: Modern frontend stack for performance and scalability.

## 🎬 Demo

🔗 **Live Demo**: [AI LMS - SalamHack](https://ai-lms-salamhack.vercel.app/)

## 🛠️ Getting Started

### First Run

To set up the project locally, follow these steps:

```bash
# Install dependencies
npm install

# Set up database schema
npx drizzle-kit generate
npx drizzle-kit push
node scripts/migrate.js

# Run Inngest serverless functions
npx inngest-cli@latest dev

# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database connection
NEXT_PUBLIC_DATABSE_CONNECTION_STRING=your_neon_db_connection_string

# Google Generative AI
GEMINI_API_KEY=your_gemini_api_key

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Explore Next.js features.
- [Inngest Documentation](https://www.inngest.com/docs) - Learn about serverless functions.
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework for modern UI.
- [Drizzle ORM](https://orm.drizzle.team) - Learn about the database ORM used.

## 🚀 Deployment

Deploy easily on **Vercel**:

[Deploy on Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 🤝 Contributing

We welcome contributions! Feel free to submit issues and pull requests to improve জ্ঞান AI.

---


