"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Briefcase, GraduationCap, Monitor, User, Building, BookMarked } from "lucide-react"

export default function UseCases() {
  const useCasesRef = useRef(null);

  return (
    <section ref={useCasesRef} className="py-20 bg-gradient-to-b from-indigo-50 to-white" id="use-cases">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Perfect For Every Learning Environment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Our AI course generator serves educators and trainers across various domains
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <GraduationCap className="h-6 w-6 text-white" />,
              title: "Educators",
              description:
                "Create supplementary materials for classroom teaching or develop complete online courses with minimal effort.",
              color: "from-[#4b5ae4] to-[#6a78ff]",
            },
            {
              icon: <Briefcase className="h-6 w-6 text-white" />,
              title: "Corporate Trainers",
              description:
                "Design professional development programs and onboarding materials customized to your company's needs.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: <Monitor className="h-6 w-6 text-white" />,
              title: "Online Course Creators",
              description:
                "Rapidly develop and iterate on course content for platforms like Udemy, Coursera, or your own website.",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: <User className="h-6 w-6 text-white" />,
              title: "Subject Matter Experts",
              description:
                "Transform your expertise into structured educational content without needing instructional design experience.",
              color: "from-amber-500 to-orange-500",
            },
            {
              icon: <Building className="h-6 w-6 text-white" />,
              title: "Educational Institutions",
              description:
                "Support curriculum development and provide consistent learning materials across departments.",
              color: "from-green-500 to-teal-500",
            },
            {
              icon: <BookMarked className="h-6 w-6 text-white" />,
              title: "Self-Learners",
              description: "Generate personalized study guides and practice materials tailored to your learning goals.",
              color: "from-red-500 to-rose-500",
            },
          ].map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="use-case-item bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center mr-3`}
                >
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{useCase.title}</h3>
              </div>
              <p className="text-gray-600">{useCase.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a href="#" className="text-[#4b5ae4] font-medium flex items-center hover:underline cursor-pointer">
                  Learn more
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
