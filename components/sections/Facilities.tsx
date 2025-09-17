"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Facilities() {
  return (
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
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/sciencelab.png"
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
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/library.png"
                alt="Digital Library"
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-semibold text-foreground"> Library</h3>
            <p className="text-muted-foreground text-sm">Extensive collection with digital resources</p>
          </div>

          <div className="group text-center space-y-4">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/sports.png"
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
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/comp.png"
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
  )
}