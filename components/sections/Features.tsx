"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, Heart, Target, Trophy, Users } from "lucide-react"

export function Features() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose Greenwood?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive educational experience that goes beyond textbooks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
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

          <Card className="text-center hover:shadow-lg transition-shadow">
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

          <Card className="text-center hover:shadow-lg transition-shadow">
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

          <Card className="text-center hover:shadow-lg transition-shadow">
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

          <Card className="text-center hover:shadow-lg transition-shadow">
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

          <Card className="text-center hover:shadow-lg transition-shadow">
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
  )
}