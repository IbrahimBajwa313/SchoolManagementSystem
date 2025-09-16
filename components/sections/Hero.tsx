"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Play, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Text */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-6">
              <Badge className="bg-emerald-500 text-white border-0 shadow-md text-sm px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Excellence in Education Since 1985
              </Badge>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Inspiring{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent block mt-2">
                Excellence in Education
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10">
              Where curiosity meets innovation, and every student discovers
              their potential to become tomorrow's leaders.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md transition-all duration-300 hover:scale-105 group"
              >
                <Calendar className="mr-3 h-5 w-5" />
                Schedule Campus Tour
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-white hover:bg-gray-50 border-2 border-emerald-500 text-emerald-600 shadow-sm transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-3 h-5 w-5" />
                Watch Virtual Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600">
                  2500+
                </div>
                <p className="text-sm text-gray-500 font-medium">Students</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600">
                  150+
                </div>
                <p className="text-sm text-gray-500 font-medium">Faculty</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600">
                  98%
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  Success Rate
                </p>
              </div>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="relative w-full h-[400px] lg:h-[500px]">
            <Image
              src="hero2.png"
              alt="Modern school building with students"
              fill
              className="object-cover rounded-2xl shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
