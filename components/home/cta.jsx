"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#4b5ae4] via-[#5d6cff] to-[#6a78ff] text-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Course Creation?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators who are saving time and creating better learning experiences with AI.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "AI-powered course generation",
                "Interactive quiz creation",
                "Personalized learning paths",
                "Student analytics dashboard",
                "Unlimited course modules",
                "24/7 AI assistance",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-300 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center h-14 px-8 py-4 bg-white text-[#4b5ae4] rounded-xl font-medium text-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border-2 border-white">
              Start Creating for Free
            </button>
            <button className="inline-flex items-center justify-center h-14 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-medium text-lg transition-all duration-200 hover:bg-white/10 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer">
              Schedule a Demo
            </button>
          </div>
          <p className="mt-6 text-blue-100 text-sm">No credit card required • Free plan available</p>
        </motion.div>
      </div>
    </section>
  )
}
