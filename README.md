# Brightly AI - Next-Gen AI-Powered Learning Platform

Brightly AI is a comprehensive, AI-driven educational platform that revolutionizes the way students learn and collaborate. Our platform combines cutting-edge artificial intelligence with modern web technologies to create an immersive, interactive, and personalized learning experience.



## ✨ Features

### 🔬 Virtual Labs
Experience hands-on learning through our AI-powered virtual laboratory environments. Students can conduct experiments, simulations, and practical exercises in a safe, controlled digital environment without the need for physical equipment.

![Virtual Labs Demo](https://i.ibb.co/20wD8rNr/50698-CA5-BFB9-4-E83-AFA3-49-CA2-EA45517.png)

**Key Capabilities:**
- Interactive 3D simulations for physics, chemistry, and biology experiments
- Real-time data collection and analysis tools
- Safe environment to test hypotheses and learn from mistakes
- Customizable lab scenarios for different skill levels
- Progress tracking and performance analytics
- Equipment-free experimentation with realistic physics engines

### 👥 Collaboration Hub
Connect with peers and educators through our integrated video collaboration platform. Foster teamwork and enhance learning through real-time communication and shared workspaces.

![Collaboration Platform](https://i.ibb.co/S2zHZP1/F3-D0683-C-FBF8-4-E15-9-ABE-7-CBCB76-CE53-A.png)

**Key Capabilities:**
- HD video calls with screen sharing capabilities
- Virtual whiteboards for collaborative problem-solving
- Breakout rooms for group discussions and projects
- Recording functionality for session playback
- Integrated chat and file sharing
- Cross-platform compatibility (desktop, tablet, mobile)
- Real-time collaborative document editing

### 📚 Adaptive Course Creation
Create personalized learning experiences with our AI-powered adaptive course creation system. Generate interactive content that adapts to individual learning styles and progress.

![Adaptive Course Creation](https://i.ibb.co/YzX5PGF/dc9f2086-27d3-488a-84ed-c6d5e823838e.jpg)
![Adaptive Course Creation](https://i.ibb.co/tTgcd0F2/36-E7-E815-E68-D-40-D3-81-D7-81-A73-F228919.png)
![Adaptive Course Creation](https://i.ibb.co/zhGDJQCq/FBC3-CF80-D296-41-C2-9178-C268-D3-D58-D11.png)
![Adaptive Course Creation](https://i.ibb.co/b421c2F/47-D93-BE6-A6-FE-482-B-A08-D-3615679-EEAE8.png)


**Key Capabilities:**
- **AI-Generated Flashcards**: Automatically create flashcards from any content with spaced repetition algorithms
- **Adaptive Quizzes**: Dynamic quiz generation that adjusts difficulty based on performance
- **Personalized Learning Paths**: Custom course sequences tailored to individual learning needs
- **Progress Analytics**: Detailed insights into learning patterns and knowledge retention
- **Multi-format Content**: Support for text, images, videos, and interactive elements
- **Smart Recommendations**: AI-powered suggestions for optimal study schedules and content review

### 🤖 Course Chatbot
Our intelligent AI chatbot serves as your personal learning assistant, available 24/7 to answer questions, provide explanations, and guide you through complex topics.

![AI Course Chatbot](https://i.ibb.co/6c9T6v8Q/A93-D49-F2-C112-4412-93-F1-CDCD54439418.png)

**Key Capabilities:**
- Context-aware responses based on your current course material
- Multi-language support for global accessibility
- Adaptive learning recommendations
- Instant answers to frequently asked questions
- Integration with course content and assignments
- Natural language processing for conversational interactions
- Voice-to-text and text-to-speech functionality

### 📹 Video Summarization
Transform lengthy educational videos into concise, digestible summaries using advanced AI algorithms. Never miss important concepts while saving valuable study time.

![Video Summarization](https://i.ibb.co/21wN1MtC/503-DF954-6-F40-4-A7-A-BE6-E-D9-F44-CD8-ADCD.png)

**Key Capabilities:**
- Automatic extraction of key concepts and timestamps
- Customizable summary length and detail level
- Visual highlights and important moment markers
- Searchable transcripts with keyword highlighting
- Multi-format export (text, audio, visual notes)
- Integration with popular video platforms (YouTube, Vimeo, custom uploads)
- Chapter-based navigation and bookmarking

### 🎧 PDF to Podcast
Convert static PDF documents into engaging audio content. Perfect for auditory learners and on-the-go studying.

![PDF to Podcast Converter](https://i.ibb.co/k2fxf1Bj/3-C174-A35-FC77-41-DE-93-E6-7887014-F51-CB.png)

**Key Capabilities:**
- Natural-sounding AI voice synthesis with multiple accent options
- Multiple voice types and adjustable speaking speeds
- Chapter-based audio segmentation with smart breaks
- Background music and sound effects options
- Offline listening capabilities with mobile app sync
- Automatic bookmark creation for easy navigation
- Batch processing for multiple documents

### 👨‍🏫 Talk to Mentor
Connect with AI-powered mentors and real human experts for personalized guidance and career advice. Get the support you need to achieve your learning goals.


**Key Capabilities:**
- AI mentors specialized in different subjects and industries
- Real-time advice and study plan recommendations
- Career pathway guidance and skill assessment
- Goal setting and progress tracking with milestone celebrations
- Scheduling system for human mentor sessions
- Personalized feedback on assignments and projects
- Industry-specific mentorship programs

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- Git
- PostgreSQL database
- Express.js knowledge (for backend development)

### Installation

1. **Clone the repository**
  ```bash
  git clone https://github.com/your-username/brightly-ai.git
  cd brightly-ai
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

# Database Configuration
```
DATABASE_URL=postgresql://username:password@localhost:5432/brightly_ai

# AI Services
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Video Services
AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_certificate

# File Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Serverless Functions
VERCEL_URL=your_deployment_url
INNGEST_EVENT_KEY=your_inngest_event_key

# Express.js Backend
EXPRESS_SERVER_URL=http://localhost:8000
JWT_SECRET=your_jwt_secret_key
```

# 🚀 Getting Started with Virtual Labs

**Open Your Application**  
Navigate to: [http://localhost:3000](http://localhost:3000)

---

## 🎯 How to Use

### 🔬 Virtual Labs

1. Navigate to the **"Virtual Labs"** section from the main dashboard
2. Select your subject area (Physics, Chemistry, Biology, etc.)
3. Choose an experiment or create a custom simulation
4. Follow the interactive guided tutorial with step-by-step instructions
5. Conduct your experiment and analyze results in real-time
6. Save your work, generate reports, and share findings with peers
7. Access lab history and compare results across multiple sessions

---

### 🤝 Using the Collaboration Platform

1. Create or join a study room from the **"Collaborate"** tab
2. Invite classmates using room codes, direct links, or email invitations
3. Use the integrated whiteboard for visual explanations and brainstorming
4. Share your screen to present materials and demonstrate concepts
5. Create breakout rooms for smaller group discussions
6. Record sessions for later review and absent participants
7. Access chat history, shared files, and session recordings anytime

---

### 🧠 Creating Adaptive Learning Content

1. Go to **"Course Creation"** and select **"New Adaptive Course"**
2. Upload your source material (PDFs, videos, text content)
3. Let AI analyze and create initial flashcards and quiz questions
4. Review and customize generated content to match your learning objectives
5. Set difficulty levels and progression criteria
6. Test the adaptive algorithms with sample learning sessions
7. Publish your course and track student engagement analytics

---

### 💬 Interacting with the Course Chatbot

1. Click the chat icon available on any course page or use the floating chat bubble
2. Ask questions in natural language about course content
3. Request explanations, examples, or clarifications on complex topics
4. Use voice commands for hands-free interaction while studying
5. Access conversation history and bookmark important responses
6. Set up study reminders and get personalized learning suggestions
7. Export chat conversations as study notes

---

### 🎞️ Creating Video Summaries

1. Upload your video file or paste a YouTube/Vimeo URL
2. Select desired summary length (brief, detailed, comprehensive)
3. Choose focus areas (key concepts, formulas, examples, etc.)
4. Wait for AI processing (typically 2–5 minutes depending on video length)
5. Review generated summary with clickable timestamps
6. Edit and annotate summaries with personal notes
7. Export in your preferred format and share with study groups

---

### 🎧 Converting PDFs to Podcasts

1. Upload your PDF document using the drag-and-drop interface
2. Choose voice type, accent, and speaking speed preferences
3. Select background music and sound effect options
4. Preview the first few minutes to ensure quality
5. Generate full podcast (processing time varies by document length)
6. Download audio files in multiple formats (MP3, WAV, M4A)
7. Sync with your preferred podcast app or listen directly in-browser

---

### 🎓 Connecting with Mentors

1. Browse available mentors by subject, expertise level, or ratings
2. Read mentor profiles, specializations, and student reviews
3. Schedule sessions through the integrated calendar system
4. Join video calls at scheduled times with prepared questions
5. Access AI mentor chat for instant guidance between sessions
6. Review session notes, recommendations, and action items
7. Track your progress toward goals and celebrate achievements

---

## 🛠 Technology Stack

### Frontend

- **Framework**: Next.js 15 with App Router  
- **Styling**: Tailwind CSS with custom design system  
- **UI Components**: Headless UI and Radix UI primitives  
- **Animations**: Framer Motion for smooth interactions  
- **Forms**: React Hook Form with Zod validation  

---

### Backend

- **API Framework**: Express.js  
- **Database**: PostgreSQL with connection pooling  
- **ORM**: Drizzle ORM for type-safe database queries  
- **Authentication**: Clerk  
- **Serverless Functions**: Inngest for background jobs  

---

### AI & Machine Learning

- **Large Language Models**: OpenAI GPT-4, Google Gemini
- **Adaptive Learning**: Custom ML algorithms for personalization  



Thank you for exploring our next-generation learning platform. Whether you're conducting experiments, collaborating with peers, or personalizing your study journey, we’re here to empower your education every step of the way.

---
**Built by passionate educators, developers, and innovators — committed to shaping the future of learning. 🚀**
