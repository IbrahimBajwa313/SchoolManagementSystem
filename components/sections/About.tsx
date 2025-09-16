"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle, Globe, Heart, Target, Trophy, ChevronRight } from "lucide-react"
import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
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
              <Card className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group border-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-full p-2 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">CBSE Curriculum</span>
                </div>
                <p className="text-sm text-muted-foreground">Comprehensive academic program</p>
              </Card>
              
              <Card className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-emerald-400/5 to-transparent hover:from-emerald-400/10 hover:to-emerald-400/5 transition-all duration-300 group border-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-400/10 rounded-full p-2 group-hover:bg-emerald-400/20 transition-colors">
                    <Globe className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="font-semibold text-foreground">Global Perspective</span>
                </div>
                <p className="text-sm text-muted-foreground">International exposure & exchange</p>
              </Card>
              
              <Card className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-400/5 to-transparent hover:from-blue-400/10 hover:to-blue-400/5 transition-all duration-300 group border-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-400/10 rounded-full p-2 group-hover:bg-blue-400/20 transition-colors">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-foreground">Holistic Development</span>
                </div>
                <p className="text-sm text-muted-foreground">Academic, social & emotional growth</p>
              </Card>
              
              <Card className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-purple-400/5 to-transparent hover:from-purple-400/10 hover:to-purple-400/5 transition-all duration-300 group border-0">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-400/10 rounded-full p-2 group-hover:bg-purple-400/20 transition-colors">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="font-semibold text-foreground">Individual Attention</span>
                </div>
                <p className="text-sm text-muted-foreground">Personalized learning approach</p>
              </Card>
            </div>

            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
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
  )
}