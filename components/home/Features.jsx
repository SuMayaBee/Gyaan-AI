"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { BookOpen, Users, PenTool, FileText, ChevronRight, Brain, Target, Gauge } from "lucide-react"

export default function Features() {
  const featuresRef = useRef(null)

  return (
    <section ref={featuresRef} className="py-20 bg-gradient-to-b from-purple-50 to-indigo-50" id="features">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            AI-Powered Features That Transform Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Our platform combines cutting-edge AI with educational expertise to deliver exceptional learning experiences
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <BookOpen className="h-6 w-6 text-white" />,
              title: "AI-Powered Course Creation",
              description:
                "Generate complete course materials in minutes. Our AI analyzes your topic and creates structured lessons, quizzes, and assignments tailored to your educational goals.",
              color: "from-[#4b5ae4] to-[#6a78ff]",
            },
            {
              icon: <Users className="h-6 w-6 text-white" />,
              title: "Personalized Learning Paths",
              description:
                "Customize learning experiences for different student needs. The AI adapts content difficulty and presentation style based on learning preferences and skill levels.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: <PenTool className="h-6 w-6 text-white" />,
              title: "Interactive Exercises",
              description:
                "Engage students with automatically generated practice problems, case studies, and interactive scenarios. Our AI creates varied exercise types to reinforce key concepts.",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: <FileText className="h-6 w-6 text-white" />,
              title: "Assessment Generation",
              description:
                "Create comprehensive assessments instantly. From multiple-choice quizzes to essay prompts, the AI generates balanced assessments that accurately measure student understanding.",
              color: "from-amber-500 to-orange-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="feature-item bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#4b5ae4]/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-lg mb-5 flex items-center justify-center bg-gradient-to-br ${feature.color}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#4b5ae4]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 bg-gradient-to-br from-[#4b5ae4] to-[#6a78ff] text-white">
                <h3 className="text-2xl font-bold mb-4">Powered by Advanced AI</h3>
                <p className="text-lg mb-6">
                  Our platform leverages state-of-the-art artificial intelligence to transform how educational content
                  is created and delivered.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Brain className="h-5 w-5" />,
                      title: "Natural Language Processing",
                      description: "Understands context and generates human-like educational content",
                    },
                    {
                      icon: <Target className="h-5 w-5" />,
                      title: "Adaptive Learning",
                      description: "Personalizes content based on learning objectives and student needs",
                    },
                    {
                      icon: <Gauge className="h-5 w-5" />,
                      title: "Real-time Optimization",
                      description: "Continuously improves content based on performance data",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-blue-100">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
                <div className="space-y-6">
                  {[
                    {
                      number: "01",
                      title: "Input Your Topic",
                      description: "Enter your subject area and specific learning objectives",
                    },
                    {
                      number: "02",
                      title: "AI Content Generation",
                      description: "Our AI creates comprehensive course materials tailored to your needs",
                    },
                    {
                      number: "03",
                      title: "Review & Customize",
                      description: "Edit and refine the generated content to match your teaching style",
                    },
                    {
                      number: "04",
                      title: "Publish & Share",
                      description: "Deploy your course to students with just one click",
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex">
                      <div className="w-12 h-12 rounded-full bg-[#4b5ae4]/10 flex items-center justify-center mr-4 flex-shrink-0 border border-[#4b5ae4]/30">
                        <span className="text-[#4b5ae4] font-bold">{step.number}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center h-12 px-6 py-3 bg-white border-2 border-[#4b5ae4] text-[#4b5ae4] rounded-xl font-medium transition-all duration-200 hover:bg-[#4b5ae4]/10 hover:shadow-md active:scale-95 cursor-pointer">
            Explore All Features
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
