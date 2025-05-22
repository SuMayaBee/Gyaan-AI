"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Home = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Function to handle auth-required actions
  const handleAuthRequiredAction = (destination) => {
    if (isLoaded && !user) {
      // Redirect to sign-in if not authenticated
      router.push("/sign-in");
    } else if (user) {
      // If authenticated, go to the requested destination
      router.push(destination);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header
        // Pass the auth handler to Header for "Dashboard" button
        onDashboardClick={() => handleAuthRequiredAction("/dashboard")}
      />
      <Hero
        // Pass the auth handler to Hero for "Get Started" button
        onGetStartedClick={() => handleAuthRequiredAction("/create-course")}
      />

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Course Creation",
                description:
                  "Generate complete course materials in minutes. Our AI analyzes your topic and creates structured lessons, quizzes, and assignments.",
              },
              {
                icon: "🎯",
                title: "Personalized Learning Paths",
                description:
                  "Customize learning experiences for different student needs. The AI adapts content difficulty and presentation style.",
              },
              {
                icon: "🔄",
                title: "Interactive Exercises",
                description:
                  "Engage students with automatically generated practice problems, case studies, and interactive scenarios.",
              },
              {
                icon: "📊",
                title: "Assessment Generation",
                description:
                  "Create comprehensive assessments instantly. From multiple-choice quizzes to essay prompts with balanced difficulty.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card hover-gradient"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute bottom-20 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Perfect For
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Our AI course generator serves educators and trainers across
              various domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "👩‍🏫",
                title: "Educators",
                description:
                  "Create supplementary materials for classroom teaching or develop complete online courses with minimal effort.",
              },
              {
                icon: "👔",
                title: "Corporate Trainers",
                description:
                  "Design professional development programs and onboarding materials customized to your company's needs.",
              },
              {
                icon: "🎓",
                title: "Online Course Creators",
                description:
                  "Rapidly develop and iterate on course content for platforms like Udemy, Coursera, or your own website.",
              },
              {
                icon: "🧠",
                title: "Subject Matter Experts",
                description:
                  "Transform your expertise into structured educational content without needing instructional design experience.",
              },
              {
                icon: "🏛️",
                title: "Educational Institutions",
                description:
                  "Support curriculum development and provide consistent learning materials across departments.",
              },
              {
                icon: "📚",
                title: "Self-Learners",
                description:
                  "Generate personalized study guides and practice materials tailored to your learning goals.",
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="feature-card hover-gradient"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute bottom-40 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
