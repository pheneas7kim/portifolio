"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"
import {
  Terminal,
  Shield,
  Code,
  Smartphone,
  Globe,
  Brain,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Compass,
  Award,
  Heart,
  Star,
  Send,
  Calendar,
  Clock,
  Quote,
  Users,
  BookOpen,
  Video,
  Mail,
  MapPin,
  ChevronDown,
  Flower2,
  Leaf,
  Sun,
  Target,
  Zap,
  ExternalLink,
  MessageCircle,
  ThumbsUp,
  Share2,
  Edit2,
  Trash2,
  Plus,
  Image as ImageIcon,
  Lock,
  Unlock,
  Settings
} from "lucide-react"
import Link from "next/link"

type Resource = {
  id: string
  name: string
  type: "pdf" | "video" | "guide" | "tool"
  url: string
  size?: string
}

type TrainingModule = {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  duration: string
  modules: number
  labs: number
  resources: Resource[]
  icon: React.ReactNode
  color: string
  completed?: boolean
  progress?: number
  image: string
  imageFile?: File | null
}

type VideoItem = {
  id: string
  title: string
  views: string
  duration: string
  thumbnail: string
  thumbnailFile?: File | null
  url?: string
}

export default function PheneasCyberAcademy() {
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null)
  const [showAddResource, setShowAddResource] = useState(false)
  const [newResource, setNewResource] = useState({ name: "", type: "pdf" as const, url: "" })
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Welcome to Pheneas Cyber Academy Terminal v2.0",
    "Type 'help' to see available commands",
    "----------------------------------------",
    ""
  ])
  const [emailSubscribed, setEmailSubscribed] = useState(false)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // ADMIN AUTHENTICATION STATE
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [adminError, setAdminError] = useState("")
  
  // Admin password - CHANGE THIS TO YOUR OWN PASSWORD!
  const ADMIN_PASSWORD = "PheneasAdmin2024!" // Change this to a strong password

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminPassword("")
      setAdminError("")
    } else {
      setAdminError("Invalid password")
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
  }

  // Video state with image upload capability
  const [videos, setVideos] = useState<VideoItem[]>([
    { 
      id: "1", 
      title: "SQL Injection Tutorial", 
      views: "12.5K", 
      duration: "15:23", 
      thumbnail: "/images/image1.webp",
      thumbnailFile: null
    },
    { 
      id: "2", 
      title: "Mobile Forensics Deep Dive", 
      views: "8.2K", 
      duration: "22:45", 
      thumbnail: "/images/image2.jpg",
      thumbnailFile: null
    },
    { 
      id: "3", 
      title: "Kali Linux for Hackers", 
      views: "15.7K", 
      duration: "18:30", 
      thumbnail: "/images/linux.png",
      thumbnailFile: null
    }
  ])

  // Training Modules WITH IMAGES
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([
    {
      id: "1",
      title: "Python for Cybersecurity",
      description: "Master Python scripting for automation, tool development, and security analysis",
      level: "Intermediate",
      duration: "8 weeks",
      modules: 14,
      labs: 28,
      icon: <Code className="w-6 h-6" />,
      color: "emerald",
      completed: false,
      progress: 30,
      image: "/images/metasploit.jpg",
      imageFile: null,
      resources: [{ id: "r1", name: "Python Security Handbook.pdf", type: "pdf", url: "/resources/python-security.pdf", size: "4.2 MB" }]
    },
    {
      id: "2",
      title: "Ethical Hacking",
      description: "Learn penetration testing, vulnerability assessment, and red team operations",
      level: "Advanced",
      duration: "12 weeks",
      modules: 18,
      labs: 42,
      icon: <Shield className="w-6 h-6" />,
      color: "red",
      completed: false,
      progress: 0,
      image: "/images/frs.webp",
      imageFile: null,
      resources: [{ id: "r3", name: "Penetration Testing Guide.pdf", type: "pdf", url: "/resources/pen-testing.pdf", size: "6.7 MB" }]
    },
    {
      id: "3",
      title: "Mobile Forensics",
      description: "Extract and analyze data from iOS and Android devices",
      level: "Intermediate",
      duration: "6 weeks",
      modules: 10,
      labs: 20,
      icon: <Smartphone className="w-6 h-6" />,
      color: "blue",
      completed: true,
      progress: 100,
      image: "/images/mobile.webp",
      imageFile: null,
      resources: [{ id: "r5", name: "Mobile Forensics Guide.pdf", type: "pdf", url: "/resources/mobile-forensics.pdf", size: "5.3 MB" }]
    },
    {
      id: "4",
      title: "Web Security",
      description: "Master SQL injection, XSS, CSRF, and modern web attacks",
      level: "Advanced",
      duration: "10 weeks",
      modules: 15,
      labs: 35,
      icon: <Globe className="w-6 h-6" />,
      color: "purple",
      completed: false,
      progress: 15,
      image: "/images/web.webp",
      imageFile: null,
      resources: [{ id: "r6", name: "Web Hacking Handbook.pdf", type: "pdf", url: "/resources/web-hacking.pdf", size: "8.1 MB" }]
    },
    {
      id: "5",
      title: "Full-Stack Web Development",
      description: "Master Next.js, React, Node.js, and modern web technologies",
      level: "Beginner",
      duration: "12 weeks",
      modules: 25,
      labs: 45,
      icon: <Code className="w-6 h-6" />,
      color: "yellow",
      completed: false,
      progress: 0,
      image: "/images/wedev.jpeg",
      imageFile: null,
      resources: [{ id: "r13", name: "Next.js Mastery.pdf", type: "pdf", url: "/resources/nextjs.pdf", size: "15.2 MB" }]
    },
    {
      id: "6",
      title: "AI & Machine Learning",
      description: "Build intelligent applications with TensorFlow, PyTorch, and OpenAI APIs",
      level: "Intermediate",
      duration: "14 weeks",
      modules: 22,
      labs: 38,
      icon: <Brain className="w-6 h-6" />,
      color: "violet",
      completed: false,
      progress: 0,
      image: "/images/AI.jpeg",
      imageFile: null,
      resources: [{ id: "r17", name: "Machine Learning Basics.pdf", type: "pdf", url: "/resources/ml-basics.pdf", size: "18.3 MB" }]
    }
  ])

  // Function to update module image (ADMIN ONLY)
  const updateModuleImage = (moduleId: string, file: File) => {
    if (!isAdmin) {
      alert("Admin access required to upload images")
      return
    }
    const imageUrl = URL.createObjectURL(file)
    setTrainingModules(modules => 
      modules.map(module => 
        module.id === moduleId 
          ? { ...module, image: imageUrl, imageFile: file }
          : module
      )
    )
  }

  // Function to update module title (ADMIN ONLY)
  const updateModuleTitle = (moduleId: string, newTitle: string) => {
    if (!isAdmin) return
    setTrainingModules(modules => 
      modules.map(module => 
        module.id === moduleId ? { ...module, title: newTitle } : module
      )
    )
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule({ ...selectedModule, title: newTitle })
    }
  }

  // Function to update module description (ADMIN ONLY)
  const updateModuleDescription = (moduleId: string, newDescription: string) => {
    if (!isAdmin) return
    setTrainingModules(modules => 
      modules.map(module => 
        module.id === moduleId ? { ...module, description: newDescription } : module
      )
    )
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule({ ...selectedModule, description: newDescription })
    }
  }

  // Function to update module level (ADMIN ONLY)
  const updateModuleLevel = (moduleId: string, newLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert") => {
    if (!isAdmin) return
    setTrainingModules(modules => 
      modules.map(module => 
        module.id === moduleId ? { ...module, level: newLevel } : module
      )
    )
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule({ ...selectedModule, level: newLevel })
    }
  }

  // Function to update module duration (ADMIN ONLY)
  const updateModuleDuration = (moduleId: string, newDuration: string) => {
    if (!isAdmin) return
    setTrainingModules(modules => 
      modules.map(module => 
        module.id === moduleId ? { ...module, duration: newDuration } : module
      )
    )
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule({ ...selectedModule, duration: newDuration })
    }
  }

  // Function to update module progress (ADMIN ONLY)
  const updateModuleProgress = (moduleId: string, newProgress: number) => {
    if (!isAdmin) return
    setTrainingModules(modules => 
      modules.map(module => 
        module.id === moduleId ? { ...module, progress: Math.min(100, Math.max(0, newProgress)) } : module
      )
    )
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule({ ...selectedModule, progress: Math.min(100, Math.max(0, newProgress)) })
    }
  }

  // Testimonials state
  const [testimonials, setTestimonials] = useState([
    { 
      name: "Aircorridor", 
      role: "Security Analyst, hacker arise", 
      text: "The hands-on labs transformed my career. I got promoted within 3 months!", 
      rating: 5, 
      image: "/images/image1.webp",
      imageFile: null as File | null
    },
    { 
      name: "OTW", 
      role: "Penetration Tester", 
      text: "Best cybersecurity training platform in Africa. Practical and up-to-date content.", 
      rating: 5, 
      image: "/images/image1.webp",
      imageFile: null as File | null
    },
    { 
      name: "David BOmbal", 
      role: "IT Director", 
      text: "Comprehensive curriculum with real-world applications. Highly recommended!", 
      rating: 5, 
      image: "/images/image1.webp",
      imageFile: null as File | null
    }
  ])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [terminalOutput])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Video Functions (ADMIN ONLY)
  const handleVideoImageUpload = (id: string, file: File) => {
    if (!isAdmin) {
      alert("Admin access required to upload images")
      return
    }
    const imageUrl = URL.createObjectURL(file)
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, thumbnail: imageUrl, thumbnailFile: file }
        : video
    ))
  }

  const updateVideoTitle = (id: string, newTitle: string) => {
    if (!isAdmin) return
    setVideos(videos.map(video => 
      video.id === id ? { ...video, title: newTitle } : video
    ))
  }

  const updateVideoViews = (id: string, newViews: string) => {
    if (!isAdmin) return
    setVideos(videos.map(video => 
      video.id === id ? { ...video, views: newViews } : video
    ))
  }

  const updateVideoDuration = (id: string, newDuration: string) => {
    if (!isAdmin) return
    setVideos(videos.map(video => 
      video.id === id ? { ...video, duration: newDuration } : video
    ))
  }

  const addNewVideo = () => {
    if (!isAdmin) {
      alert("Admin access required to add videos")
      return
    }
    const newVideo: VideoItem = {
      id: Date.now().toString(),
      title: "New Tutorial",
      views: "0",
      duration: "00:00",
      thumbnail: "/images/default-video.jpg",
      thumbnailFile: null
    }
    setVideos([...videos, newVideo])
  }

  const deleteVideo = (id: string) => {
    if (!isAdmin) {
      alert("Admin access required to delete videos")
      return
    }
    setVideos(videos.filter(video => video.id !== id))
  }

  // Testimonial Functions (ADMIN ONLY)
  const handleTestimonialImageUpload = (index: number, file: File) => {
    if (!isAdmin) {
      alert("Admin access required to upload images")
      return
    }
    const imageUrl = URL.createObjectURL(file)
    const updatedTestimonials = [...testimonials]
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      image: imageUrl,
      imageFile: file
    }
    setTestimonials(updatedTestimonials)
  }

  const updateTestimonialText = (index: number, newText: string) => {
    if (!isAdmin) return
    const updatedTestimonials = [...testimonials]
    updatedTestimonials[index] = { ...updatedTestimonials[index], text: newText }
    setTestimonials(updatedTestimonials)
  }

  const updateTestimonialName = (index: number, newName: string) => {
    if (!isAdmin) return
    const updatedTestimonials = [...testimonials]
    updatedTestimonials[index] = { ...updatedTestimonials[index], name: newName }
    setTestimonials(updatedTestimonials)
  }

  const updateTestimonialRole = (index: number, newRole: string) => {
    if (!isAdmin) return
    const updatedTestimonials = [...testimonials]
    updatedTestimonials[index] = { ...updatedTestimonials[index], role: newRole }
    setTestimonials(updatedTestimonials)
  }

  const updateTestimonialRating = (index: number, newRating: number) => {
    if (!isAdmin) return
    const updatedTestimonials = [...testimonials]
    updatedTestimonials[index] = { ...updatedTestimonials[index], rating: Math.min(5, Math.max(1, newRating)) }
    setTestimonials(updatedTestimonials)
  }

  const addNewTestimonial = () => {
    if (!isAdmin) {
      alert("Admin access required to add testimonials")
      return
    }
    const newTestimonial = {
      name: "New User",
      role: "Student",
      text: "Write your testimonial here...",
      rating: 5,
      image: "/images/default-avatar.png",
      imageFile: null
    }
    setTestimonials([...testimonials, newTestimonial])
  }

  const deleteTestimonial = (index: number) => {
    if (!isAdmin) {
      alert("Admin access required to delete testimonials")
      return
    }
    setTestimonials(testimonials.filter((_, i) => i !== index))
  }

  const commands: Record<string, () => string> = {
    help: () => `Available commands:
  help      - Show this message
  clear     - Clear terminal
  ls        - List available labs
  whoami    - Show user info
  status    - Show system status
  practice  - Start practice session
  mobile    - Mobile dev tools
  webdev    - Web dev tools
  ai        - AI/ML tools
  scan      - Network scan simulation`,
    clear: () => "",
    ls: () => `labs/
  ├── web_security/
  ├── mobile_pentesting/
  ├── ai_security/
  ├── network_pentest/
  ├── cloud_security/
  └── blockchain_security/`,
    whoami: () => `student@pheneas-academy
Role: Cybersecurity Trainee
Level: Intermediate
XP: 450
Streak: 5 days`,
    status: () => `✅ Terminal: Online
✅ Cyber Ranges: 6/6 Active
✅ Practice Labs: 24 Available
📊 Active Users: 2,847
🔗 Connection: Secure (TLS 1.3)`,
    practice: () => `Starting practice session...
Available labs:
1. SQL Injection Lab
2. XSS Challenge
3. Password Cracking
4. Buffer Overflow
Type 'lab [number]' to start`,
    mobile: () => `📱 Mobile Development Tools:
- adb devices
- react-native run-android
- flutter build apk`,
    webdev: () => `🌐 Web Development Tools:
- npm run dev
- next build
- yarn start`,
    ai: () => `🤖 AI/ML Tools:
- tensorflow train
- pytorch predict
- keras fit`,
    scan: () => `🔍 Scanning network...
Hosts found: 4
Open ports: 22, 80, 443, 3306`
  }

  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      const input = terminalInput.trim()
      const [cmd] = input.split(' ')
      
      setTerminalOutput(prev => [...prev, `$ ${input}`, ""])
      
      if (commands[cmd]) {
        const output = commands[cmd]()
        if (output) {
          setTerminalOutput(prev => [...prev, output, ""])
        } else if (cmd === 'clear') {
          setTerminalOutput([])
        }
      } else {
        setTerminalOutput(prev => [...prev, `Unknown command: ${cmd}. Type 'help'`, ""])
      }
      
      setTerminalInput("")
    }
  }

  const addResource = () => {
    if (!selectedModule || !newResource.name || !newResource.url) return
    const resource: Resource = {
      id: `r${Date.now()}`,
      name: newResource.name,
      type: newResource.type,
      url: newResource.url,
      size: "~1 MB"
    }
    setSelectedModule({ ...selectedModule, resources: [...selectedModule.resources, resource] })
    setNewResource({ name: "", type: "pdf", url: "" })
    setShowAddResource(false)
  }

  const deleteResource = (resourceId: string) => {
    if (selectedModule) {
      setSelectedModule({
        ...selectedModule,
        resources: selectedModule.resources.filter(r => r.id !== resourceId)
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 selection:bg-primary/10 transition-colors duration-300 relative overflow-x-hidden">
      
      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="text-center mb-4">
              <Lock className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h2>
              <p className="text-gray-500 text-sm mt-1">Enter password to edit content</p>
            </div>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              placeholder="Enter admin password"
              className="w-full border rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            {adminError && <p className="text-red-500 text-sm mb-3">{adminError}</p>}
            <div className="flex gap-3">
              <Button onClick={handleAdminLogin} className="flex-1 bg-indigo-600 hover:bg-indigo-700">Login</Button>
              <Button onClick={() => setShowAdminLogin(false)} variant="outline" className="flex-1">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-5 opacity-20 animate-float-slow">
          <Shield className="w-24 h-24 text-indigo-500/40" strokeWidth={1.5} />
        </div>
        <div className="absolute top-32 left-20 opacity-15 animate-float-delayed">
          <Code className="w-16 h-16 text-blue-600/30" strokeWidth={1.5} />
        </div>
        <div className="absolute top-20 right-10 opacity-25 animate-spin-slow">
          <Brain className="w-20 h-20 text-purple-400/30" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-32 left-8 opacity-20 animate-pulse-slow">
          <Terminal className="w-28 h-28 text-emerald-400/30" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-20 right-5 opacity-15 animate-bounce-slow">
          <Globe className="w-20 h-20 text-cyan-500/30" strokeWidth={1.5} />
        </div>
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-indigo-300/20 dark:bg-indigo-400/10 animate-twinkle" style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }} />
        ))}
      </div>

      {/* Admin Control Bar */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isAdmin ? (
          <button
            onClick={() => setShowAdminLogin(true)}
            className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            title="Admin Login"
          >
            <Lock className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex gap-2">
            <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-lg">
              <Unlock className="w-4 h-4" /> Admin Mode
            </div>
            <button
              onClick={handleAdminLogout}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              title="Logout"
            >
              <Lock className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Social Media Bar */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl animate-bounce-slow">
          <FaGithub className="w-5 h-5" />
        </a>
        <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl animate-bounce-slow" style={{ animationDelay: "0.2s" }}>
          <FaTwitter className="w-5 h-5" />
        </a>
        <a href="#" className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl animate-bounce-slow" style={{ animationDelay: "0.4s" }}>
          <FaLinkedin className="w-5 h-5" />
        </a>
        <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl animate-bounce-slow" style={{ animationDelay: "0.6s" }}>
          <FaInstagram className="w-5 h-5" />
        </a>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-8 right-20 z-50 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-glow">
          <ChevronDown className="w-6 h-6 rotate-180" />
        </button>
      )}

      {/* Navigation Bar - Add Admin Indicator */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'border-b border-indigo-200/30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg' : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm'}`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-500 animate-pulse-slow" />
            <span className="text-xl font-serif font-bold tracking-tighter bg-gradient-to-r from-indigo-800 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Pheneas Cyber Academy
            </span>
            {isAdmin && (
              <Badge className="bg-green-500 text-white text-xs ml-2">Admin Mode</Badge>
            )}
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => setIsDrawerOpen(true)} className="hover:text-indigo-600 transition-colors relative group">
              Training
            </button>
            <button onClick={() => setIsTerminalOpen(true)} className="hover:text-indigo-600 transition-colors relative group">
              Terminal
            </button>
            <a href="#courses" className="hover:text-indigo-600 transition-colors relative group">
              Courses
            </a>
            <a href="#testimonials" className="hover:text-indigo-600 transition-colors relative group">
              Testimonials
            </a>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="rounded-full shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none transition-all duration-300 transform hover:scale-105">
              Access Dashboard <Sparkles className="ml-2 w-3 h-3" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Same as before */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 animate-slideLeft">
            <Badge variant="outline" className="px-4 py-1 border-indigo-400/40 bg-indigo-100/60 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full backdrop-blur-sm">
              🚀 10,000+ Students Trained
            </Badge>
            <Badge variant="outline" className="px-4 py-1 border-purple-400/40 bg-purple-100/60 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full backdrop-blur-sm">
              🌍 Global Community
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 leading-tight animate-scaleIn">
            Master{' '}
            <span className="bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent italic font-normal">
              Cybersecurity
            </span>
            <br />
            & Modern Development
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-slideRight">
            Learn ethical hacking, mobile development, web development, and AI from industry experts.
            Practice with our interactive terminal and cyber ranges.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-scaleIn">
            <Button onClick={() => setIsDrawerOpen(true)} size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Start Learning Free <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
            <Button onClick={() => setIsTerminalOpen(true)} size="lg" variant="outline" className="rounded-full px-8 h-12 text-base bg-white/80 dark:bg-transparent border-2 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-300">
              Launch Terminal <Terminal className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span>10K+ Active Students</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div><span>50+ Expert Instructors</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div><span>200+ Hands-on Labs</span></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-indigo-100/50 dark:fill-indigo-900/20"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900/5 to-purple-900/5 dark:from-indigo-900/10 dark:to-purple-900/10 my-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Students", icon: Users },
              { value: "50+", label: "Expert Instructors", icon: Award },
              { value: "200+", label: "Hands-on Labs", icon: Target },
              { value: "100%", label: "Job Placement", icon: Zap }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-indigo-500" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section - WITH ADMIN-ONLY EDIT CONTROLS */}
      <section id="courses" className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">Featured Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Courses We Offer</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">6 specialized tracks to advance your career</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingModules.map((module) => (
              <Card key={module.id} className="group border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative hover-lift cursor-pointer" 
                onClick={() => { setIsDrawerOpen(true); setSelectedModule(module) }}>
                
                {/* Edit Controls - ONLY VISIBLE TO ADMIN */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full cursor-pointer transition" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            updateModuleImage(module.id, e.target.files[0])
                          }
                        }}
                      />
                      <ImageIcon className="w-4 h-4" />
                    </label>
                  </div>
                )}

                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={module.image} 
                    alt={module.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {isAdmin && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <label className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              updateModuleImage(module.id, e.target.files[0])
                            }
                          }}
                        />
                        <ImageIcon className="w-4 h-4" /> Change Image
                      </label>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge className={`bg-${module.color}-500/90 text-white border-none`}>
                      {module.level}
                    </Badge>
                  </div>
                  {module.progress > 0 && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <div className="text-white text-xs mb-1">Progress: {module.progress}%</div>
                        <div className="w-full bg-white/30 rounded-full h-1.5">
                          <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${module.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg`}>
                      {module.icon}
                    </div>
                    {isAdmin ? (
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xl font-bold bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded px-2 w-3/4 text-right"
                      />
                    ) : (
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{module.title}</h3>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2">
                  {isAdmin ? (
                    <textarea
                      value={module.description}
                      onChange={(e) => updateModuleDescription(module.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-600 dark:text-gray-300 text-sm w-full bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded p-1 mb-3"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{module.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {isAdmin ? (
                      <input
                        type="text"
                        value={module.duration}
                        onChange={(e) => updateModuleDuration(module.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-950/50 rounded-full w-24 text-center focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      />
                    ) : (
                      <Badge variant="secondary" className="bg-purple-50 dark:bg-purple-950/50">{module.duration}</Badge>
                    )}
                    <Badge variant="secondary" className="bg-indigo-50 dark:bg-indigo-950/50">{module.modules} modules</Badge>
                    <Badge variant="secondary" className="bg-indigo-50 dark:bg-indigo-950/50">{module.labs} labs</Badge>
                  </div>
                  
                  {isAdmin && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <input
                          type="number"
                          value={module.progress}
                          onChange={(e) => updateModuleProgress(module.id, parseInt(e.target.value) || 0)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-12 text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded"
                          min="0"
                          max="100"
                        />%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-indigo-600 h-1.5 rounded-full transition-all" style={{ width: `${module.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {isAdmin && (
            <div className="text-center text-xs text-indigo-600 dark:text-indigo-400 mt-8">
              🔐 Admin Mode Active - Hover over cards to edit images, click text to edit
            </div>
          )}
        </div>
      </section>

      {/* Rest of your sections (Drawer, Terminal, Video, Testimonials, Newsletter, Footer) remain the same but with isAdmin checks on edit controls */}

      {/* TRAINING DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h2 className="text-xl font-bold text-indigo-600">Cyber Training Hub</h2>
                <p className="text-sm text-gray-500">Hands-on cybersecurity learning modules</p>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500 hover:text-black text-xl">✕</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">🔐 Beginner Training</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-xl hover:shadow-md transition">
                    <h4 className="font-bold">Basics of Computer</h4>
                    <p className="text-sm text-gray-500">Understand how computer works.</p>
                  </div>
                  <div className="p-4 border rounded-xl hover:shadow-md transition">
                    <h4 className="font-bold">Introduction to Cybersecurity</h4>
                    <p className="text-sm text-gray-500">Learn basic concepts: threats, attacks, defense systems.</p>
                  </div>
                  <div className="p-4 border rounded-xl hover:shadow-md transition">
                    <h4 className="font-bold">Networking Basics</h4>
                    <p className="text-sm text-gray-500">IP addresses, ports, protocols, and traffic flow.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">🛡️ Practical Labs</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-xl hover:shadow-md transition bg-gray-50">
                    <h4 className="font-bold">SQL Injection Lab</h4>
                    <p className="text-sm text-gray-500">Practice bypassing login systems safely in a sandbox.</p>
                    <button className="mt-2 text-indigo-600 text-sm font-medium">Start Lab →</button>
                  </div>
                  <div className="p-4 border rounded-xl hover:shadow-md transition bg-gray-50">
                    <h4 className="font-bold">XSS Simulation</h4>
                    <p className="text-sm text-gray-500">Learn how cross-site scripting attacks work.</p>
                    <button className="mt-2 text-indigo-600 text-sm font-medium">Start Lab →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setIsTerminalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl bg-gray-900 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="bg-gray-800 px-4 py-3 flex justify-between items-center">
              <span className="text-gray-300 text-sm">terminal@pheneas:~</span>
              <button onClick={() => setIsTerminalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-4 h-80 overflow-y-auto font-mono text-sm">
              {terminalOutput.map((line, i) => (
                <div key={i} className={line.startsWith("$") ? "text-green-400" : "text-gray-300 whitespace-pre-wrap"}>
                  {line}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-400">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalCommand}
                  className="flex-1 bg-transparent text-gray-300 outline-none font-mono text-sm"
                  placeholder="Type 'help' to start..."
                  autoFocus
                />
              </div>
              <div ref={terminalEndRef} />
            </div>
          </div>
        </>
      )}

      {/* Training Drawer for Selected Module */}
      {isDrawerOpen && selectedModule && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => { setIsDrawerOpen(false); setSelectedModule(null); setShowAddResource(false) }} />
          <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedModule.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Course Resources & Materials</p>
              </div>
              <button onClick={() => { setIsDrawerOpen(false); setSelectedModule(null); setShowAddResource(false) }} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <div className="p-6">
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-gray-600 dark:text-gray-300">{selectedModule.description}</p>
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  <span>{selectedModule.duration}</span>
                  <span>{selectedModule.modules} modules</span>
                  <span>{selectedModule.labs} labs</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">📚 Resources</h4>
                  {isAdmin && (
                    <button onClick={() => setShowAddResource(true)} className="text-sm bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-lg">+ Add Resource</button>
                  )}
                </div>
                
                {showAddResource && isAdmin && (
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <input type="text" placeholder="Resource name" value={newResource.name} onChange={(e) => setNewResource({...newResource, name: e.target.value})} className="w-full border rounded-lg px-3 py-2 mb-2 dark:bg-gray-700" />
                    <select value={newResource.type} onChange={(e) => setNewResource({...newResource, type: e.target.value as any})} className="w-full border rounded-lg px-3 py-2 mb-2 dark:bg-gray-700">
                      <option value="pdf">PDF</option>
                      <option value="guide">Guide</option>
                      <option value="video">Video</option>
                      <option value="tool">Tool</option>
                    </select>
                    <input type="text" placeholder="URL" value={newResource.url} onChange={(e) => setNewResource({...newResource, url: e.target.value})} className="w-full border rounded-lg px-3 py-2 mb-3 dark:bg-gray-700" />
                    <div className="flex gap-2">
                      <button onClick={addResource} className="bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
                      <button onClick={() => setShowAddResource(false)} className="border px-3 py-1 rounded">Cancel</button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {selectedModule.resources.map((resource) => (
                    <div key={resource.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{resource.type === "pdf" ? "📄" : resource.type === "video" ? "🎥" : "🔧"}</span>
                        <span className="text-gray-900 dark:text-white">{resource.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={resource.url} className="text-indigo-600">📥</Link>
                        {isAdmin && (
                          <button onClick={() => deleteResource(resource.id)} className="text-red-500">🗑️</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold">Enroll Now →</Button>
            </div>
          </div>
        </>
      )}

      {/* VIDEO CONTENT SECTION - With Admin Controls */}
      <section className="py-20 bg-gradient-to-r from-indigo-600/5 to-purple-600/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">Video Content</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Watch Latest Tutorials</h2>
            <p className="text-muted-foreground mt-2">Weekly cybersecurity and development tutorials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="group overflow-hidden cursor-pointer hover-lift relative">
                {isAdmin && (
                  <div className="absolute top-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full cursor-pointer transition">
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files && e.target.files[0]) handleVideoImageUpload(video.id, e.target.files[0]) }} />
                      <ImageIcon className="w-4 h-4" />
                    </label>
                    <button onClick={() => deleteVideo(video.id)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )}
                
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <label className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files && e.target.files[0]) handleVideoImageUpload(video.id, e.target.files[0]) }} />
                        <ImageIcon className="w-8 h-8 text-white" />
                      </label>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {isAdmin ? (
                      <input type="text" value={video.duration} onChange={(e) => updateVideoDuration(video.id, e.target.value)} className="bg-transparent w-14 text-center focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded" placeholder="00:00" />
                    ) : (
                      <span>{video.duration}</span>
                    )}
                  </div>
                </div>
                
                <CardHeader>
                  {isAdmin ? (
                    <input type="text" value={video.title} onChange={(e) => updateVideoTitle(video.id, e.target.value)} className="text-lg font-bold bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded px-1 w-full" />
                  ) : (
                    <h3 className="text-lg font-bold">{video.title}</h3>
                  )}
                  <CardDescription className="flex items-center gap-2">
                    {isAdmin ? (
                      <input type="text" value={video.views} onChange={(e) => updateVideoViews(video.id, e.target.value)} className="bg-transparent w-20 focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded px-1" />
                    ) : (
                      <span>{video.views}</span>
                    )} views
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          {isAdmin && (
            <div className="text-center mt-8">
              <Button onClick={addNewVideo} className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"><Plus className="w-4 h-4 mr-2" /> Add New Video</Button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section - With Admin Controls */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">What Experts Say</h2>
            <p className="text-muted-foreground mt-2">Trusted by professionals worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover-lift relative group">
                {isAdmin && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-full text-xs transition">
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files && e.target.files[0]) handleTestimonialImageUpload(idx, e.target.files[0]) }} />
                      📷
                    </label>
                    <button onClick={() => deleteTestimonial(idx)} className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full text-xs">🗑️</button>
                  </div>
                )}
                
                <Quote className="w-8 h-8 text-indigo-400 mb-4" />
                
                {isAdmin ? (
                  <textarea value={testimonial.text} onChange={(e) => updateTestimonialText(idx, e.target.value)} className="text-muted-foreground mb-4 italic w-full bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded p-1" rows={3} />
                ) : (
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                )}
                
                <div className="flex items-center gap-3">
                  <div className="relative group/image">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition" />
                    {isAdmin && (
                      <label className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1 cursor-pointer opacity-0 group-hover/image:opacity-100 transition">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files && e.target.files[0]) handleTestimonialImageUpload(idx, e.target.files[0]) }} />
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </label>
                    )}
                  </div>
                  <div className="flex-1">
                    {isAdmin ? (
                      <input type="text" value={testimonial.name} onChange={(e) => updateTestimonialName(idx, e.target.value)} className="font-bold bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded px-1 w-full" />
                    ) : (
                      <p className="font-bold">{testimonial.name}</p>
                    )}
                    {isAdmin ? (
                      <input type="text" value={testimonial.role} onChange={(e) => updateTestimonialRole(idx, e.target.value)} className="text-sm text-muted-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-400 rounded px-1 w-full" />
                    ) : (
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => isAdmin && updateTestimonialRating(idx, star)} className="focus:outline-none" disabled={!isAdmin}>
                      <Star className={`w-4 h-4 transition ${star <= testimonial.rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          
          {isAdmin && (
            <div className="text-center mt-8">
              <Button onClick={addNewTestimonial} className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"><Plus className="w-4 h-4 mr-2" /> Add Testimonial</Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm shadow-lg mb-6 animate-bounce-slow">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Stay Updated</h2>
          <p className="text-white/90 mb-8 text-lg">Get weekly cybersecurity tips, course updates, and industry news.</p>
          
          {!emailSubscribed ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input type="email" placeholder="Your email address" className="px-6 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent w-full sm:w-96 text-white placeholder-white/70" />
              <Button onClick={() => setEmailSubscribed(true)} className="rounded-full bg-white text-indigo-600 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-all duration-300">Subscribe <Send className="ml-2 w-4 h-4" /></Button>
            </div>
          ) : (
            <div className="animate-scaleIn">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 inline-flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-white font-medium">Thanks for subscribing! Check your inbox.</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-black dark:to-slate-950 text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-indigo-400" />
                <h3 className="font-serif font-bold text-3xl tracking-tighter bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Pheneas CyberAcademy</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">Empowering the next generation of cybersecurity professionals with hands-on training and real-world scenarios.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-12 sm:gap-16">
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-indigo-400">Programs</h4>
                <ul className="space-y-2 text-slate-300">
                  <li><button onClick={() => setIsDrawerOpen(true)} className="hover:text-indigo-400 transition-colors">Training</button></li>
                  <li><button onClick={() => setIsTerminalOpen(true)} className="hover:text-indigo-400 transition-colors">Terminal</button></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Certification</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-indigo-400">Resources</h4>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Support</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-indigo-400">Connect</h4>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"><FaGithub className="w-6 h-6" /></a>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"><FaTwitter className="w-6 h-6" /></a>
            <a href="#" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"><FaLinkedin className="w-6 h-6" /></a>
            <a href="#" className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"><FaInstagram className="w-6 h-6" /></a>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 italic">
            <p>© 2024 Pheneas Cyber Academy. All rights reserved.</p>
            <p className="flex items-center gap-1">Built with <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" /> for cybersecurity education</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float-slow { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
        @keyframes float-delayed { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(15px) rotate(-10deg); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-slow { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.05); } }
        @keyframes bounce-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes twinkle { 0%,100% { opacity: 0; } 50% { opacity: 0.5; } }
        @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 5px rgba(99,102,241,0.3); } 50% { box-shadow: 0 0 20px rgba(99,102,241,0.6); } }
        @keyframes slideInLeft { from { transform: translateX(-100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 4s ease-in-out infinite; }
        .animate-glow { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-slideLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideRight { animation: slideInRight 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
        .hover-lift { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .hover-lift:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  )
}