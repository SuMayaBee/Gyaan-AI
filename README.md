# Brightly AI - Next-Gen AI-Powered Learning Platform

Brightly AI is a comprehensive, AI-driven educational platform that revolutionizes the way students learn and collaborate. Our platform combines cutting-edge artificial intelligence with modern web technologies to create an immersive, interactive, and personalized learning experience.

## ✨ Features

### 🔬 Virtual Labs
Experience hands-on learning through our AI-powered virtual laboratory environments. Students can conduct experiments, simulations, and practical exercises in a safe, controlled digital environment without the need for physical equipment.

**Key Capabilities:**
- Interactive 3D simulations for physics, chemistry, and biology experiments
- Real-time data collection and analysis tools
- Safe environment to test hypotheses and learn from mistakes
- Customizable lab scenarios for different skill levels
- Progress tracking and performance analytics

### 👥 Collaboration Hub
Connect with peers and educators through our integrated video collaboration platform. Foster teamwork and enhance learning through real-time communication and shared workspaces.

**Key Capabilities:**
- HD video calls with screen sharing capabilities
- Virtual whiteboards for collaborative problem-solving
- Breakout rooms for group discussions and projects
- Recording functionality for session playback
- Integrated chat and file sharing
- Cross-platform compatibility (desktop, tablet, mobile)

### 🤖 Course Chatbot
Our intelligent AI chatbot serves as your personal learning assistant, available 24/7 to answer questions, provide explanations, and guide you through complex topics.

**Key Capabilities:**
- Context-aware responses based on your current course material
- Multi-language support for global accessibility
- Adaptive learning recommendations
- Instant answers to frequently asked questions
- Integration with course content and assignments
- Natural language processing for conversational interactions

### 📹 Video Summarization
Transform lengthy educational videos into concise, digestible summaries using advanced AI algorithms. Never miss important concepts while saving valuable study time.

**Key Capabilities:**
- Automatic extraction of key concepts and timestamps
- Customizable summary length and detail level
- Visual highlights and important moment markers
- Searchable transcripts with keyword highlighting
- Multi-format export (text, audio, visual notes)
- Integration with popular video platforms

### 🎧 PDF to Podcast
Convert static PDF documents into engaging audio content. Perfect for auditory learners and on-the-go studying.

**Key Capabilities:**
- Natural-sounding AI voice synthesis
- Multiple voice options and speaking speeds
- Chapter-based audio segmentation
- Background music and sound effects options
- Offline listening capabilities
- Automatic bookmark creation for easy navigation

### 👨‍🏫 Talk to Mentor
Connect with AI-powered mentors and real human experts for personalized guidance and career advice. Get the support you need to achieve your learning goals.

**Key Capabilities:**
- AI mentors specialized in different subjects and industries
- Real-time advice and study plan recommendations
- Career pathway guidance and skill assessment
- Goal setting and progress tracking
- Scheduling system for human mentor sessions
- Personalized feedback on assignments and projects

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- Git

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
```bash
DATABASE_URL=your_database_connection_string

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
```