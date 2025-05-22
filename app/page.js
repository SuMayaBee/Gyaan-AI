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
    <div className="h-screen">
      <Header
        // Pass the auth handler to Header for "Dashboard" button
        onDashboardClick={() => handleAuthRequiredAction("/dashboard")}
      />
      <Hero
        // Pass the auth handler to Hero for "Get Started" button
        onGetStartedClick={() => handleAuthRequiredAction("/create-course")}
      />

      {/* Main Content Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "AI-Powered Course Creation",
                description:
                  "Generate complete course materials in minutes. Our AI analyzes your topic and creates structured lessons, quizzes, and assignments tailored to your educational goals.",
              },
              {
                title: "Personalized Learning Paths",
                description:
                  "Customize learning experiences for different student needs. The AI adapts content difficulty and presentation style based on learning preferences and skill levels.",
              },
              {
                title: "Interactive Exercises",
                description:
                  "Engage students with automatically generated practice problems, case studies, and interactive scenarios. Our AI creates varied exercise types to reinforce key concepts.",
              },
              {
                title: "Assessment Generation",
                description:
                  "Create comprehensive assessments instantly. From multiple-choice quizzes to essay prompts, the AI generates balanced assessments that accurately measure student understanding.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="px-8 py-6 border-gray-200 border hover:border-mainColor rounded-lg hover:bg-gray-50 transition duration-300"
              >
                <h2 className="text-lg sm:text-xl text-gray-900 font-semibold title-font mb-2">
                  {feature.title}
                </h2>
                <p className="leading-relaxed text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="text-gray-600 body-font bg-gray-50">
        <div className="container px-5 py-16 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect For
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              Our AI course generator serves educators and trainers across
              various domains
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Educators",
                description:
                  "Create supplementary materials for classroom teaching or develop complete online courses with minimal effort.",
              },
              {
                title: "Corporate Trainers",
                description:
                  "Design professional development programs and onboarding materials customized to your company's needs.",
              },
              {
                title: "Online Course Creators",
                description:
                  "Rapidly develop and iterate on course content for platforms like Udemy, Coursera, or your own website.",
              },
              {
                title: "Subject Matter Experts",
                description:
                  "Transform your expertise into structured educational content without needing instructional design experience.",
              },
              {
                title: "Educational Institutions",
                description:
                  "Support curriculum development and provide consistent learning materials across departments.",
              },
              {
                title: "Self-Learners",
                description:
                  "Generate personalized study guides and practice materials tailored to your learning goals.",
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-base text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
