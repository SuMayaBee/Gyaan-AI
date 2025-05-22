"use client"

import { motion } from "framer-motion"
import {
  Cpu,
  Layers,
  BarChart,
  Clock,
  Sparkles,
  BookOpen,
  FileQuestion,
  MessageSquare,
  PieChart,
  Presentation,
} from "lucide-react"

export default function PlatformInfo() {
  return (
    <section id="platform" className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            All-in-One Learning Platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Everything you need to create, manage, and deliver exceptional learning experiences
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Cpu className="h-6 w-6 text-white" />,
              title: "AI-Driven Content",
              description:
                "Our advanced AI analyzes your topic and generates comprehensive, structured content tailored to your specific educational goals.",
              color: "from-[#4b5ae4] to-[#6a78ff]",
            },
            {
              icon: <BookOpen className="h-6 w-6 text-white" />,
              title: "Course Creation",
              description:
                "Generate complete courses with lessons, modules, readings, and resources in minutes instead of weeks.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: <FileQuestion className="h-6 w-6 text-white" />,
              title: "Quiz Generation",
              description:
                "Create assessments with multiple question types, automatic grading, and detailed analytics to track student progress.",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: <Presentation className="h-6 w-6 text-white" />,
              title: "Interactive Learning",
              description:
                "Build engaging interactive elements like simulations, case studies, and scenario-based learning activities.",
              color: "from-amber-500 to-orange-500",
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-white" />,
              title: "Discussion Tools",
              description:
                "Foster collaboration with AI-moderated discussion forums, group projects, and peer feedback systems.",
              color: "from-green-500 to-teal-500",
            },
            {
              icon: <PieChart className="h-6 w-6 text-white" />,
              title: "Analytics Dashboard",
              description:
                "Track student engagement, performance, and learning outcomes with comprehensive analytics and reporting.",
              color: "from-red-500 to-rose-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#4b5ae4]/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
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

        <div className="mt-16 bg-gradient-to-r from-[#4b5ae4]/10 to-purple-500/10 p-8 rounded-2xl border-2 border-[#4b5ae4]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Clock className="h-6 w-6 text-[#4b5ae4]" />,
                title: "Save 80% Time",
                description: "Create in minutes what used to take weeks",
              },
              {
                icon: <Sparkles className="h-6 w-6 text-[#4b5ae4]" />,
                title: "Higher Quality",
                description: "AI ensures comprehensive, error-free content",
              },
              {
                icon: <Layers className="h-6 w-6 text-[#4b5ae4]" />,
                title: "Customizable",
                description: "Easily adapt content to your specific needs",
              },
              {
                icon: <BarChart className="h-6 w-6 text-[#4b5ae4]" />,
                title: "Better Results",
                description: "Improved student engagement and outcomes",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-md border border-[#4b5ae4]/20"
              >
                <div className="w-12 h-12 rounded-full bg-[#4b5ae4]/10 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
