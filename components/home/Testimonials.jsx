"use client"

import { motion } from "framer-motion"

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Loved by Educators Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            See what our users are saying about their experience
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              quote:
                "This platform has revolutionized how I create course materials. What used to take weeks now takes minutes, and the quality is outstanding.",
              name: "Dr. Sarah Johnson",
              role: "University Professor",
              avatar: "/placeholder.svg?height=80&width=80",
              color: "bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200",
            },
            {
              quote:
                "As a corporate trainer, I need to create customized training programs quickly. This AI tool has become indispensable for my workflow.",
              name: "Michael Chen",
              role: "Corporate Learning Director",
              avatar: "/placeholder.svg?height=80&width=80",
              color: "bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200",
            },
            {
              quote:
                "The personalized learning paths have made a huge difference for my students. I can now cater to different learning styles effortlessly.",
              name: "Emma Rodriguez",
              role: "High School Teacher",
              avatar: "/placeholder.svg?height=80&width=80",
              color: "bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`rounded-xl p-6 border ${testimonial.color} shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
