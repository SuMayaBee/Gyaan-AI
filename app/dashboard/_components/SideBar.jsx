"use client"

import { CourseCountContext } from "@/app/_Context/CourseCountContext"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LayoutDashboard, Shield, User, FlaskConical, Atom, Microscope, Beaker, ChevronDown, Video, MessageCircle, Mic, Menu, X } from 'lucide-react'
import Image from "next/image"
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
      lightColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    // Virtual Labs will be inserted here in the rendered list
    {
      name: "Collaboration",
      icon: Video,
      path: "/dashboard/collaboration",
      color: "from-purple-500 to-indigo-600",
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      name: "Course Chatbot",
      icon: MessageCircle,
      path: "/dashboard/chatbot",
      color: "from-green-500 to-teal-600",
      lightColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      name: "Video Summarization",
      icon: Video,
      path: "/dashboard/video-summarization",
      color: "from-orange-500 to-amber-600",
      lightColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      name: "PDF to Podcast",
      icon: Mic,
      path: "/dashboard/pdf-to-podcast",
      color: "from-pink-500 to-rose-600",
      lightColor: "bg-pink-100",
      textColor: "text-pink-600",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
      color: "from-amber-500 to-yellow-600",
      lightColor: "bg-amber-100",
      textColor: "text-amber-600",
    },
    {
      name: "Profile",
      icon: User,
      path: "/dashboard/profile",
      color: "from-cyan-500 to-blue-600",
      lightColor: "bg-cyan-100",
      textColor: "text-cyan-600",
    },
  ]

  const VirtualLabsList = [
    {
      name: "Physics Lab",
      icon: Atom,
      path: "/dashboard/labs/physics",
      color: "from-red-500 to-orange-600",
      lightColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      name: "Chemistry Lab",
      icon: FlaskConical,
      path: "/dashboard/labs/chemistry",
      color: "from-emerald-500 to-green-600",
      lightColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      name: "Biology Lab",
      icon: Microscope,
      path: "/dashboard/labs/biology",
      color: "from-violet-500 to-purple-600",
      lightColor: "bg-violet-100",
      textColor: "text-violet-600",
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
        className="md:hidden fixed top-4 left-4 z-50 bg-white/90 p-2 rounded-full shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="text-gray-800" /> : <Menu className="text-gray-800" />}
      </button>

      {/* Sidebar Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:sticky top-0 h-screen z-40 transition-all duration-300 ease-in-out",
          "bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
          "border-r border-gray-200 dark:border-gray-800 shadow-lg",
          "w-[280px] md:w-[280px] md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "flex flex-col overflow-hidden",
        )}
      >
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          {/* Logo */}
          <div className="flex items-center justify-center py-6 px-4 border-b border-gray-100 dark:border-gray-800">
            <div className="relative h-14 w-40">
              <Image src="/logo2.png" alt="logo" fill className="object-contain" priority />
            </div>
          </div>

          {/* Create Button */}
          <div className="px-4 mt-4 mb-6">
            <Link href="/create">
              <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-5 shadow-md hover:shadow-lg transition-all duration-300 border-0 cursor-pointer">
                Create New +
              </Button>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="px-3 space-y-1.5">
            {/* Dashboard (first item) */}
            <Link href="/dashboard">
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                  "hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:shadow-sm",
                  path === "/dashboard"
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-sm"
                    : "text-gray-700 dark:text-gray-300",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg shadow-sm transition-all duration-300",
                    path === "/dashboard"
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                      : "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white",
                  )}
                >
                  <LayoutDashboard size={20} />
                </div>
                <h2 className={cn("font-medium transition-all duration-300", path === "/dashboard" ? "text-blue-700 dark:text-blue-400" : "group-hover:text-blue-700 dark:group-hover:text-blue-400")}>
                  Dashboard
                </h2>
                {path === "/dashboard" && (
                  <div className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-lg" />
                )}
              </div>
            </Link>

            {/* Virtual Labs Section */}
            <div className="mt-1">
              <div
                onClick={() => setLabsExpanded(!labsExpanded)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300",
                  "hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:shadow-sm",
                  labsExpanded
                    ? "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 shadow-sm"
                    : "text-gray-700 dark:text-gray-300",
                  path.includes("/dashboard/labs") && "text-violet-700 dark:text-violet-400",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg shadow-sm transition-all duration-300",
                      labsExpanded || path.includes("/dashboard/labs")
                        ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
                        : "bg-violet-100 dark:bg-gray-800 text-violet-600 dark:text-violet-400 hover:bg-gradient-to-br hover:from-violet-500 hover:to-purple-600 hover:text-white",
                    )}
                  >
                    <Beaker size={20} />
                  </div>
                  <h2 className={cn("font-medium", labsExpanded || path.includes("/dashboard/labs") ? "text-violet-700 dark:text-violet-400" : "")}>
                    Virtual Labs
                  </h2>
                </div>
                <div
                  className={cn(
                    "w-7 h-7 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-700/80 shadow-sm",
                    "transition-transform duration-300",
                    labsExpanded ? "rotate-180" : "rotate-0",
                  )}
                >
                  <ChevronDown size={16} className={labsExpanded ? "text-violet-600 dark:text-violet-400" : "text-gray-600 dark:text-gray-400"} />
                </div>
              </div>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  "pl-12 pr-3 space-y-1.5",
                  labsExpanded ? "max-h-[500px] opacity-100 mt-1.5" : "max-h-0 opacity-0",
                )}
              >
                {VirtualLabsList.map((lab, index) => (
                  <Link href={lab.path} key={index}>
                    <div
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 relative",
                        "hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:shadow-sm hover:translate-x-1",
                        path === lab.path
                          ? `bg-gradient-to-r from-${lab.color.split('-')[1]}-50 to-${lab.color.split('-')[3]}-50 dark:from-${lab.color.split('-')[1]}-900/20 dark:to-${lab.color.split('-')[3]}-900/20 shadow-sm`
                          : "text-gray-700 dark:text-gray-300",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg shadow-sm transition-all duration-300",
                          path === lab.path
                            ? `bg-gradient-to-br ${lab.color} text-white`
                            : `${lab.lightColor} dark:bg-gray-800 ${lab.textColor} dark:text-${lab.color.split('-')[1]}-400 hover:bg-gradient-to-br hover:${lab.color} hover:text-white`,
                        )}
                      >
                        <lab.icon size={16} />
                      </div>
                      <h2 className={cn("text-sm font-medium transition-all duration-300", path === lab.path ? `${lab.textColor} dark:text-${lab.color.split('-')[1]}-400` : "")}>
                        {lab.name}
                      </h2>
                      {path === lab.path && (
                        <div className={cn("absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b", lab.color, "rounded-l-lg")} />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Remaining Menu Items */}
            {MenuList.slice(1).map((menu, index) => (
              <Link href={menu.path} key={index}>
                <div
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                    "hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:shadow-sm hover:translate-x-0.5",
                    path === menu.path
                      ? `bg-gradient-to-r from-${menu.color.split('-')[1]}-50 to-${menu.color.split('-')[3]}-50 dark:from-${menu.color.split('-')[1]}-900/20 dark:to-${menu.color.split('-')[3]}-900/20 shadow-sm`
                      : "text-gray-700 dark:text-gray-300",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg shadow-sm transition-all duration-300",
                      path === menu.path
                        ? `bg-gradient-to-br ${menu.color} text-white`
                        : `${menu.lightColor} dark:bg-gray-800 ${menu.textColor} dark:text-${menu.color.split('-')[1]}-400 group-hover:bg-gradient-to-br group-hover:${menu.color} group-hover:text-white`,
                    )}
                  >
                    <menu.icon size={20} />
                  </div>
                  <h2 className={cn("font-medium transition-all duration-300", path === menu.path ? `${menu.textColor} dark:text-${menu.color.split('-')[1]}-400` : "group-hover:text-gray-900 dark:group-hover:text-gray-100")}>
                    {menu.name}
                  </h2>
                  {path === menu.path && (
                    <div className={cn("absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b", menu.color, "rounded-l-lg")} />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Credits Card */}
          <div className="mt-auto p-4">
            <div
              className={cn(
                "rounded-xl p-4 shadow-md transition-all duration-300",
                isPremium
                  ? "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200/50 dark:border-amber-800/50"
                  : "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border border-gray-200/50 dark:border-gray-700/50",
              )}
            >
              {isPremium ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-md">
                      <Shield size={18} className="text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-amber-700 dark:text-amber-400">Premium Plan</h2>
                  </div>
                  <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Unlimited Course Credits</h2>
                  <Progress
                    value={100}
                    className="h-2.5 bg-amber-100 dark:bg-amber-900/30"
                    indicatorClassName="bg-gradient-to-r from-amber-400 to-yellow-500"
                  />
                  <p className="text-amber-700 dark:text-amber-400 text-sm mt-2 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Unlimited usage available
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Available Credits</h2>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {5 - totalCourse}{" "}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">of 5</span>
                    </h2>
                    <div className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-400 font-medium shadow-sm">
                      {totalCourse} used
                    </div>
                  </div>
                  <Progress
                    value={(totalCourse / 5) * 100}
                    className="h-2.5 bg-gray-200 dark:bg-gray-700"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                  <Link
                    href="/dashboard/upgrade"
                    className="mt-3 text-sm inline-block py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
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
