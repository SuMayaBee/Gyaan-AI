"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Menu, X, User } from "lucide-react"


export default function Header({ user, isLoaded, handleAuthRequiredAction }) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    console.log("user: ", user, isLoaded)
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-[#4b5ae4]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#4b5ae4] to-[#6a78ff] flex items-center justify-center mr-2 border-2 border-white shadow-md">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EduGenAI</span>
            </motion.div>
          </div>


          <nav className="hidden md:flex space-x-8">
            {["Features", "Platform", "Use Cases", "Testimonials"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-gray-700 hover:text-[#4b5ae4] font-medium transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </nav>

   
          <div className="flex items-center space-x-3">
            {isLoaded ? (
              user ? (
                <motion.div
                 
                  className="flex items-center space-x-3"
                >
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleAuthRequiredAction("/dashboard/profile")}
                  >
                    <div className="w-12 h-10 rounded-full bg-gradient-to-br from-[#4b5ae4] to-[#6a78ff] flex items-center justify-center text-white border-2 border-white shadow-md">
                      {user.imageUrl ? (
                        <img
                          src={user.imageUrl || "/placeholder.svg"}
                          alt={user.fullName}
                          className="w-12 h-10 rounded-full border-2 border-white"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
                      {user.fullName || user.username || "User"}
                    </span>
                  </div>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onClick={() => handleAuthRequiredAction("/dashboard")}
                    className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-to-r from-[#4b5ae4] to-[#6a78ff] text-white rounded-md font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border border-white"
                  >
                    Dashboard
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-3"
                >
                  <button
                    onClick={() => router.push("/sign-in")}
                    className="hidden sm:inline-flex items-center justify-center h-10 px-4 py-2 border-2 border-[#4b5ae4] text-[#4b5ae4] rounded-md font-medium transition-all duration-200 hover:bg-[#4b5ae4]/10 hover:shadow-md active:scale-95 cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push("/sign-up")}
                    className="inline-flex items-center justify-center h-10 px-4 py-2 bg-gradient-to-r from-[#4b5ae4] to-[#6a78ff] text-white rounded-md font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer border border-white"
                  >
                    Sign Up
                  </button>
                </motion.div>
              )
            ) : (
              // Loading state
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#4b5ae4] hover:bg-gray-100 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Features", "Platform", "Use Cases", "Testimonials"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4b5ae4] hover:bg-gray-50 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            {!user && isLoaded && (
              <a
                href="/sign-in"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#4b5ae4] hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false)
                  router.push("/sign-in")
                }}
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
