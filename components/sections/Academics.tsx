"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Microscope, Trophy } from "lucide-react"

export function Academics() {
  return (
    <section id="academics" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
  )
}