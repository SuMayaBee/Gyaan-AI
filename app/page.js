"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import CTA from "@/components/home/cta"
import Features from "@/components/home/Features"
import PlatformInfo from "@/components/home/PlatformInfo"
import Testimonials from "@/components/home/Testimonials"
import UseCases from "@/components/home/Use-cases"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"


export default function Home() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  // Function to handle auth-required actions
  const handleAuthRequiredAction = (destination) => {
    if (isLoaded && !user) {
      // Redirect to sign-in if not authenticated
      router.push("/sign-in")
    } else if (user) {
      // If authenticated, go to the requested destination
      router.push(destination)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      {/* Decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-pink-200/30 to-purple-300/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-200/20 to-cyan-300/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-tr from-yellow-200/20 to-orange-300/10 rounded-full blur-3xl"></div>
      </div>

      <Header user={user} isLoaded={isLoaded} handleAuthRequiredAction={handleAuthRequiredAction} />
      <Hero handleAuthRequiredAction={handleAuthRequiredAction} />
      
      <PlatformInfo />
      <Features />
      <UseCases />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
