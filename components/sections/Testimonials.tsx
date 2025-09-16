"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

export function Testimonials() {
  return (
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
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
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

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
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

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
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
  )
}