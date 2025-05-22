"use client"

import { CourseCountContext } from "@/app/_Context/CourseCountContext"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  LayoutDashboard,
  Shield,
  User,
  FlaskRoundIcon as Flask,
  Atom,
  Microscope,
  Beaker,
  ChevronDown,
  ChevronUp,
  Video,
  MessageCircle,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const Sidebar = () => {
  const { totalCourse, isPremium } = useContext(CourseCountContext)
  const [labsExpanded, setLabsExpanded] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Profile",
      icon: User,
      path: "/dashboard/profile",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Collaboration",
      icon: Video,
      path: "/dashboard/collaboration",
      color: "from-orange-400 to-amber-500",
    },
    {
      name: "Course Chatbot",
      icon: MessageCircle,
      path: "/dashboard/chatbot",
      color: "from-cyan-500 to-blue-500",
    },
  ]

  const VirtualLabsList = [
    {
      name: "Physics Lab",
      icon: Atom,
      path: "/dashboard/labs/physics",
      color: "from-red-500 to-orange-500",
    },
    {
      name: "Chemistry Lab",
      icon: Flask,
      path: "/dashboard/labs/chemistry",
      color: "from-teal-500 to-green-500",
    },
    {
      name: "Biology Lab",
      icon: Microscope,
      path: "/dashboard/labs/biology",
      color: "from-violet-500 to-purple-500",
    },
  ]

  const path = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg"
      >
        {isMobileOpen ? <X className="text-gray-800" /> : <Menu className="text-gray-800" />}
      </button>

      {/* Sidebar Backdrop */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:sticky top-0 h-screen z-40 transition-all duration-300 ease-in-out",
          "bg-gradient-to-b from-violet-900 via-indigo-800 to-blue-900 text-white shadow-xl",
          "w-[280px] md:w-[280px] md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "flex flex-col overflow-hidden",
        )}
      >
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 py-6 px-4">
            <div className="w-fit h-full bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <img src="/logo2.png" alt="brightly-logo" className="w-full h-full object-contain max-h-10" />
            </div>
          </div>

          {/* Create Button */}
          <div className="px-4 mt-2 mb-6">
            <Link href="/create">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-0 font-medium py-5">
                Create New +
              </Button>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="px-3 space-y-1">
            {MenuList.map((menu, index) => (
              <Link href={menu.path} key={index}>
                <div
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                    "hover:bg-white/10 backdrop-blur-sm group relative overflow-hidden",
                    path === menu.path ? "bg-white/20 shadow-lg" : "hover:translate-x-1",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br",
                      menu.color,
                      "shadow-md",
                    )}
                  >
                    <menu.icon size={18} className="text-white" />
                  </div>
                  <h2 className="font-medium">{menu.name}</h2>
                  {path === menu.path && <div className="absolute right-0 top-0 h-full w-1 bg-white rounded-l-lg" />}
                </div>
              </Link>
            ))}

            {/* Virtual Labs Section */}
            <div className="mt-4">
              <div
                onClick={() => setLabsExpanded(!labsExpanded)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg cursor-pointer",
                  "hover:bg-white/10 backdrop-blur-sm transition-all duration-200",
                  labsExpanded && "bg-white/10",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md">
                    <Beaker size={18} className="text-white" />
                  </div>
                  <h2 className="font-medium">Virtual Labs</h2>
                </div>
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                  {labsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {labsExpanded && (
                <div className="pl-12 pr-3 space-y-1 mt-1 overflow-hidden animate-slideDown">
                  {VirtualLabsList.map((lab, index) => (
                    <Link href={lab.path} key={index}>
                      <div
                        className={cn(
                          "flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200",
                          "hover:bg-white/10 backdrop-blur-sm group relative",
                          path === lab.path ? "bg-white/20 shadow-lg" : "hover:translate-x-1",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br",
                            lab.color,
                            "shadow-md",
                          )}
                        >
                          <lab.icon size={14} className="text-white" />
                        </div>
                        <h2 className="text-sm font-medium">{lab.name}</h2>
                        {path === lab.path && (
                          <div className="absolute right-0 top-0 h-full w-1 bg-white rounded-l-lg" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Credits Card */}
          <div className="mt-auto p-4">
            <div
              className={cn(
                "rounded-xl p-4 backdrop-blur-md shadow-lg",
                isPremium
                  ? "bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/30"
                  : "bg-white/10 border border-white/20",
              )}
            >
              {isPremium ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                      <Shield size={16} className="text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-amber-300">Premium Plan</h2>
                  </div>
                  <h2 className="text-white/90 font-medium mb-2">Unlimited Course Credits</h2>
                  <Progress
                    value={100}
                    className="h-2 bg-amber-900/30"
                    indicatorClassName="bg-gradient-to-r from-yellow-400 to-amber-500"
                  />
                  <p className="text-amber-300 text-sm mt-2 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
                    Unlimited usage available
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-medium text-white/90 mb-1">Available Credits</h2>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold">
                      {5 - totalCourse} <span className="text-sm font-normal text-white/70">of 5</span>
                    </h2>
                    <div className="text-xs px-2 py-1 rounded-full bg-white/20">{totalCourse} used</div>
                  </div>
                  <Progress
                    value={(totalCourse / 5) * 100}
                    className="h-2 bg-white/10"
                    indicatorClassName="bg-gradient-to-r from-blue-400 to-indigo-500"
                  />
                  <Link
                    href="/dashboard/upgrade"
                    className="mt-3 text-sm inline-block py-1.5 px-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    Upgrade to Premium
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
