"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Star,
  Trophy,
  Target,
  Heart,
  Globe,
  Microscope,
  ChevronRight,
  Play,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  TrendingUp,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Footer } from "@/components/Footer"

export default function SchoolHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    {
      src: "/modern-school-students-in-classroom-with-technolog.jpg",
      alt: "Students in modern classroom with technology"
    },
    {
      src: "/modern-library-with-students-reading.jpg", 
      alt: "Students reading in modern library"
    },
    {
      src: "/modern-computer-lab-students.png",
      alt: "Students in computer lab"
    },
    {
      src: "/school-principal-with-students-in-library.jpg",
      alt: "Principal with students in library"
    }
  ]

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [heroImages.length])
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent truncate">
                    Greenwood International School
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">Excellence in Education Since 1985</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#about" className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#academics" className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105 relative group">
                Academics
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#facilities" className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105 relative group">
                Facilities
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#admissions" className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105 relative group">
                Admissions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Link href="/parent/login">
                <Button variant="outline" size="sm" className="hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-md text-xs lg:text-sm">
                  Parent Portal
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="sm" className="hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-md text-xs lg:text-sm">
                  Admin Login
                </Button>
              </Link>
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs lg:text-sm">
                Apply Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border">
              <nav className="flex flex-col space-y-4 pt-4">
                <a
                  href="#about"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#academics"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Academics
                </a>
                <a
                  href="#facilities"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Facilities
                </a>
                <a
                  href="#admissions"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admissions
                </a>
                <a
                  href="#contact"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                  <Link href="/parent/login">
                    <Button variant="outline" size="sm" className="w-full justify-center">
                      Parent Portal
                    </Button>
                  </Link>
                  <Link href="/admin/login">
                    <Button variant="outline" size="sm" className="w-full justify-center">
                      Admin Login
                    </Button>
                  </Link>
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-primary/80">
                    Apply Now
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/modern-school-aerial.png')] bg-cover bg-center opacity-5"></div>
        {/* Floating Elements - Hidden on mobile for better performance */}
        <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="hidden sm:block absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-emerald-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="hidden sm:block absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-blue-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <Badge className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-sm">
                  {/* <Trophy className="h-3 text-white w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> */}
                  🏆 <span className="text-white">Ranked #1 School in the Region</span> 
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  Inspiring Excellence in
                  <span className="bg-gradient-to-r from-primary via-emerald-600 to-blue-600 bg-clip-text text-transparent"> Education</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                  At Greenwood International School, we nurture young minds through innovative teaching, world-class
                  facilities, and a commitment to holistic development that prepares students for global success.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Schedule Campus Tour
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 group bg-white/50 backdrop-blur-sm hover:bg-white/70 border-2 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Watch Virtual Tour
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 sm:pt-6">
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">2500+</div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Students</p>
                </div>
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">150+</div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Faculty</p>
                </div>
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">98%</div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Success Rate</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in delay-300 order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                {/* Carousel Container */}
                <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                  {heroImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                  
                  {/* Carousel Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-full p-1.5 sm:p-2">
                    <Trophy className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Award Winning</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Excellence in Education 2024</div>
                  </div>
                </div>
              </div>
              {/* Additional floating badge */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-gradient-to-r from-emerald-500 to-primary text-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg text-xs sm:text-sm font-semibold animate-bounce">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                New Admission Open
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/30 to-white relative overflow-hidden">
        {/* Background decorative elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="hidden sm:block absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-400/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all duration-300 shadow-sm text-xs sm:text-sm">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  About Our School
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
                  Nurturing Tomorrow's 
                  <span className="bg-gradient-to-r from-primary via-emerald-600 to-blue-600 bg-clip-text text-transparent"> Leaders</span>
                  <br />Since 1985
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                  For nearly four decades, Greenwood International School has been at the forefront of educational
                  excellence, combining traditional values with innovative teaching methodologies to create an
                  environment where every student can thrive.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-primary/10 rounded-full p-1 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground text-sm sm:text-base">CBSE Curriculum</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Comprehensive academic program</p>
                </div>
                <div className="space-y-3 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-emerald-400/5 to-transparent hover:from-emerald-400/10 hover:to-emerald-400/5 transition-all duration-300 group">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-emerald-400/10 rounded-full p-1 group-hover:bg-emerald-400/20 transition-colors">
                      <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                    </div>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Global Perspective</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">International exposure & exchange</p>
                </div>
                <div className="space-y-3 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-blue-400/5 to-transparent hover:from-blue-400/10 hover:to-blue-400/5 transition-all duration-300 group">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-blue-400/10 rounded-full p-1 group-hover:bg-blue-400/20 transition-colors">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Holistic Development</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Academic, social & emotional growth</p>
                </div>
                <div className="space-y-3 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-purple-400/5 to-transparent hover:from-purple-400/10 hover:to-purple-400/5 transition-all duration-300 group">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-purple-400/10 rounded-full p-1 group-hover:bg-purple-400/20 transition-colors">
                      <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    </div>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Individual Attention</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Personalized learning approach</p>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-sm sm:text-base">
                Learn More About Us
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <Image
                  src="/school-principal-with-students-in-library.jpg"
                  alt="School community"
                  width={600}
                  height={500}
                  className="rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/10 transition-all duration-500"></div>
              </div>
              {/* Floating stats */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-xl border border-white/20">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">39</div>
                  <div className="text-xs text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="academics" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
        {/* Background decorative elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="hidden sm:block absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all duration-300 shadow-sm mb-4 sm:mb-6 text-xs sm:text-sm">
              <Microscope className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Academic Programs
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight">
              Comprehensive Education for 
              <span className="bg-gradient-to-r from-primary via-emerald-600 to-blue-600 bg-clip-text text-transparent"> Every Stage</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              From foundational learning to advanced academics, our curriculum is designed to challenge, inspire, and
              prepare students for success in higher education and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                  <BookOpen className="h-8 w-8 text-primary mx-auto" />
                </div>
                <CardTitle className="text-xl font-bold">Primary School</CardTitle>
                <CardDescription className="text-primary font-semibold">Classes I - V</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4 relative z-10">
                <p className="text-muted-foreground leading-relaxed">
                  Foundation years focusing on core subjects, creativity, and social skills development.
                </p>
                <ul className="text-sm space-y-3 text-left">
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
                    <span>English, Mathematics, Science</span>
                  </li>
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
                    <span>Art, Music, Physical Education</span>
                  </li>
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
                    <span>Life Skills & Values Education</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="bg-gradient-to-br from-emerald-400/10 to-emerald-400/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:from-emerald-400/20 group-hover:to-emerald-400/10 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                  <Microscope className="h-8 w-8 text-emerald-600 mx-auto" />
                </div>
                <CardTitle className="text-xl font-bold">Middle School</CardTitle>
                <CardDescription className="text-emerald-600 font-semibold">Classes VI - VIII</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4 relative z-10">
                <p className="text-muted-foreground leading-relaxed">
                  Transitional years with specialized subjects and skill-building activities.
                </p>
                <ul className="text-sm space-y-3 text-left">
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-400/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
                    <span>Advanced Mathematics & Science</span>
                  </li>
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-400/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
                    <span>Social Studies & Languages</span>
                  </li>
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-400/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
                    <span>Computer Science & Robotics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="bg-gradient-to-br from-blue-400/10 to-blue-400/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:from-blue-400/20 group-hover:to-blue-400/10 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                  <Trophy className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <CardTitle className="text-xl font-bold">High School</CardTitle>
                <CardDescription className="text-blue-600 font-semibold">Classes IX - XII</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4 relative z-10">
                <p className="text-muted-foreground leading-relaxed">Board preparation with stream selection and career guidance.</p>
                <ul className="text-sm space-y-3 text-left">
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-400/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span>Science, Commerce, Humanities</span>
                  </li>
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-400/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span>Competitive Exam Preparation</span>
                  </li>
                  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-400/5 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span>Career Counseling & Guidance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="facilities" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="text-primary border-primary mb-4 text-xs sm:text-sm">
              World-Class Facilities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 text-balance">State-of-the-Art Infrastructure</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our campus features modern facilities designed to enhance learning, creativity, and overall development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="group text-center space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/modern-science-laboratory-with-equipment.jpg"
                  alt="Science Labs"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Science Labs</h3>
              <p className="text-muted-foreground text-sm">Advanced physics, chemistry, and biology laboratories</p>
            </div>

            <div className="group text-center space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/modern-library-with-students-reading.jpg"
                  alt="Digital Library"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Digital Library</h3>
              <p className="text-muted-foreground text-sm">Extensive collection with digital resources</p>
            </div>

            <div className="group text-center space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/school-sports-complex-with-swimming-pool.jpg"
                  alt="Sports Complex"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sports Complex</h3>
              <p className="text-muted-foreground text-sm">Multi-sport facilities and swimming pool</p>
            </div>

            <div className="group text-center space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/modern-computer-lab-students.png"
                  alt="Tech Center"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Tech Center</h3>
              <p className="text-muted-foreground text-sm">Computer labs and robotics workshop</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose Greenwood?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive educational experience that goes beyond textbooks
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  CBSE curriculum with innovative teaching methods and personalized attention for every student.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Highly qualified teachers with years of experience and passion for education.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Modern Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  State-of-the-art classrooms, laboratories, library, and sports facilities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Sports & Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive sports programs and extracurricular activities for holistic development.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Career Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional counseling and career guidance to help students choose the right path.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Values & Ethics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Strong emphasis on moral values, ethics, and character building for responsible citizens.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="text-primary border-primary mb-4 text-xs sm:text-sm">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">What Our Community Says</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Hear from parents, students, and alumni</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src="/professional-woman-parent.jpg"
                    alt="Parent"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-foreground">Mrs. Priya Sharma</div>
                    <div className="text-sm text-muted-foreground">Parent of Class 8 Student</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "Greenwood has transformed my daughter's learning experience. The teachers are incredibly supportive,
                  the facilities are world-class, and the focus on holistic development is remarkable."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src="/professional-man-parent.jpg"
                    alt="Parent"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-foreground">Mr. Rajesh Kumar</div>
                    <div className="text-sm text-muted-foreground">Parent of Class 10 Student</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "The holistic approach to education here is remarkable. My son has excelled not just academically but
                  also in sports and arts. The career guidance program is exceptional."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src="/young-student-graduate.jpg"
                    alt="Alumni"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-foreground">Ananya Patel</div>
                    <div className="text-sm text-muted-foreground">Alumni - IIT Delhi</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "Greenwood gave me the foundation I needed to succeed. The teachers believed in me, the curriculum was
                  challenging, and the values I learned here guide me every day."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary text-xs sm:text-sm">
                  Get in Touch
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Ready to Join Our School Family?</h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                  Contact us today to learn more about admissions, schedule a campus visit, or get answers to your
                  questions about our programs.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 rounded-full p-2 sm:p-3 flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Visit Our Campus</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">123 Education Street, Knowledge City, State 560001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 rounded-full p-2 sm:p-3 flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Call Us</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">+91 98765 43210</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Mon - Fri: 8:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 rounded-full p-2 sm:p-3 flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Email Us</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">admissions@greenwoodschool.edu</p>
                    <p className="text-muted-foreground text-sm sm:text-base">info@greenwoodschool.edu</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-4 sm:p-6">
                <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Admission Process</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                      1
                    </div>
                    <span className="text-muted-foreground text-sm sm:text-base">Submit online application</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                      2
                    </div>
                    <span className="text-muted-foreground text-sm sm:text-base">Schedule campus visit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                      3
                    </div>
                    <span className="text-muted-foreground text-sm sm:text-base">Attend interaction session</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                      4
                    </div>
                    <span className="text-muted-foreground text-sm sm:text-base">Complete enrollment</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Quick Inquiry</CardTitle>
                <CardDescription className="text-sm sm:text-base">Send us a message and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name *</label>
                    <input
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name *</label>
                    <input
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <input
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <input
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Grade of Interest</label>
                  <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base">
                    <option>Select Grade</option>
                    <option>Nursery - KG</option>
                    <option>Class I - V</option>
                    <option>Class VI - VIII</option>
                    <option>Class XI - XII</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-lg h-24 sm:h-32 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none text-sm sm:text-base"
                    placeholder="Tell us about your inquiry or any specific questions you have..."
                  ></textarea>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 py-2 sm:py-3 text-sm sm:text-base lg:text-lg">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
