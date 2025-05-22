"use client"



import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Home, Search, ArrowLeft, Lightbulb, BookX } from "lucide-react"

export default function NotFound() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Animation for floating elements
  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(".animate-float")
      elements.forEach((el) => {
        el.classList.toggle("translate-y-2")
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      router.push(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      {/* Decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-pink-200/30 to-purple-300/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-200/20 to-cyan-300/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-tr from-yellow-200/20 to-orange-300/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-md border-b-2 border-[#4b5ae4]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 md:h-20">
            <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#4b5ae4] to-[#6a78ff] flex items-center justify-center mr-2 border-2 border-white shadow-md">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EduGenAI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 py-12 px-4">
        <div className="max-w-6xl w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#4b5ae4]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Illustration */}
              <div className="bg-gradient-to-br from-[#4b5ae4] to-[#6a78ff] p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">Oops! Page Not Found</h2>
                  <p className="text-blue-100 mb-6">
                    The page you're looking for seems to be missing from our curriculum.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-blue-100">
                        Don't worry! Even the best learners take wrong turns sometimes.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <Home className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-blue-100">
                        Head back to our homepage to find what you're looking for.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4 w-64 h-64 rounded-full bg-white/10"></div>
                <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-white/10"></div>

                {/* Floating elements */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute top-1/4 right-1/4 w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center"
                >
                  <BookX className="h-6 w-6 text-white" />
                </motion.div>

                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-1/4 left-1/4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center"
                >
                  <span className="text-2xl font-bold">404</span>
                </motion.div>
              </div>

              {/* Right Column - Content */}
              <div className="p-8 lg:p-12">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-[#4b5ae4]/10 flex items-center justify-center border-2 border-[#4b5ae4]/30">
                    <span className="text-4xl font-bold text-[#4b5ae4]">404</span>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">Page Not Found</h1>

                <p className="text-gray-600 text-center mb-8">
                  The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="space-y-6">
                  <form onSubmit={handleSearch} className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Search for content..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#4b5ae4] focus:outline-none focus:ring-2 focus:ring-[#4b5ae4]/20 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#4b5ae4] transition-colors cursor-pointer"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </form>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => router.push("/")}
                      className="flex-1 inline-flex items-center justify-center h-12 px-6 py-3 bg-gradient-to-r from-[#4b5ae4] to-[#6a78ff] text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border border-white"
                    >
                      <Home className="mr-2 h-5 w-5" />
                      Go to Homepage
                    </button>

                    <button
                      onClick={() => router.back()}
                      className="flex-1 inline-flex items-center justify-center h-12 px-6 py-3 bg-white border-2 border-[#4b5ae4] text-[#4b5ae4] rounded-xl font-medium transition-all duration-200 hover:bg-[#4b5ae4]/10 hover:shadow-md active:scale-95 cursor-pointer"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Go Back
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Destinations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: "Course Creation", path: "/create-course" },
                      { name: "Quiz Generator", path: "/quiz-generator" },
                      { name: "Learning Resources", path: "/resources" },
                      { name: "Help Center", path: "/help" },
                    ].map((link, index) => (
                      <button
                        key={index}
                        onClick={() => router.push(link.path)}
                        className="px-4 py-2 bg-[#4b5ae4]/10 text-[#4b5ae4] rounded-lg hover:bg-[#4b5ae4]/20 transition-colors text-sm font-medium text-left cursor-pointer"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional help */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Need help?{" "}
              <a href="/contact" className="text-[#4b5ae4] font-medium hover:underline cursor-pointer">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-md border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 EduGenAI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
