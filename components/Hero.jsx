"use client"

import { motion } from "framer-motion"
import { ChevronRight, Award, Zap, Sparkles } from "lucide-react"



export default function Hero({ handleAuthRequiredAction }) {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#4b5ae4]/10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-purple-400/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Create Courses with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b5ae4] to-[#8a94ff] block mt-2">
                AI-Powered Magic
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Generate complete, personalized course materials in minutes with our advanced AI technology designed for
              modern educators.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => handleAuthRequiredAction("/create-course")}
                className="inline-flex items-center justify-center h-14 px-8 py-4 bg-gradient-to-r from-[#4b5ae4] to-[#6a78ff] text-white rounded-xl font-medium text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border-2 border-white"
              >
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>

              <button
                onClick={() => handleAuthRequiredAction("/explore")}
                className="inline-flex items-center justify-center h-14 px-8 py-4 bg-white border-2 border-[#4b5ae4] text-[#4b5ae4] rounded-xl font-medium text-lg transition-all duration-200 hover:bg-[#4b5ae4]/10 hover:shadow-md active:scale-95 cursor-pointer"
              >
                Explore Platform
                <Sparkles className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-${i * 100} to-purple-${i * 100}`}
                  ></div>
                ))}
              </div>
              <p className="ml-4 text-sm text-gray-600">
                <span className="font-semibold">2,500+</span> educators trust us
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4b5ae4]/80 to-purple-600/80 mix-blend-multiply"></div>
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="AI Course Creation Platform"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">AI-Powered Learning Platform</h3>
                <p className="text-lg md:text-xl mb-6">Create courses, quizzes, and interactive content in minutes</p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg border border-white/40">
                    <p className="font-bold">Course Creation</p>
                    <p className="text-sm">Generate complete curriculum</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg border border-white/40">
                    <p className="font-bold">Quiz Generation</p>
                    <p className="text-sm">Auto-create assessments</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg border border-white/40">
                    <p className="font-bold">Interactive Content</p>
                    <p className="text-sm">Engage your students</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg border border-white/40">
                    <p className="font-bold">AI Assistance</p>
                    <p className="text-sm">Smart content suggestions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 border-2 border-green-100"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Course Generated</p>
                <p className="text-xs text-gray-500">Just now • 12 modules</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 border-2 border-blue-100"
            >
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-[#4b5ae4]" />
                <p className="text-sm font-medium text-gray-900">98% Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
