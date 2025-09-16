"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"

export function Contact() {
  return (
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
  )
}