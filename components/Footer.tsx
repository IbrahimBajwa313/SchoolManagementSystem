"use client"

import Link from "next/link"
import { useState } from "react"
import { Facebook, Instagram, Mail, Phone, MapPin, Code2, Twitter, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubscribe = async () => {
    if (!email) return

    setIsLoading(true)
    setSuccess(false)

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSuccess(true)
        setEmail("")
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to subscribe.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="pt-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="relative z-0 w-11/12 sm:w-5/6 mx-auto px-4 pt-10 pb-2 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo & Social */}
          <div className="lg:col-span-2 flex flex-col gap-4 pb-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-black dark:text-white bg-clip-text transition-all duration-300 tracking-wide">
                Greenwood School
              </h2>
            </Link>

            <p className="text-sm text-primary dark:text-primary/80">
              Excellence in Education Since 1985.
            </p>
            <div className="border-l-4 border-secondary pl-4 mt-2 text-sm italic text-muted-foreground">
              <p>
                "We're passionate about nurturing young minds and providing quality education to help students succeed in life."
              </p>
              <p className="mt-1 font-semibold not-italic text-primary dark:text-primary/80">
                — Greenwood School
              </p>
            </div>
            <div className="flex space-x-0 mt-4">
              <Link href="#" target="_blank">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 dark:hover:bg-primary/20">
                  <Facebook className="w-5 h-5 text-primary dark:text-primary/80" />
                </Button>
              </Link>
              <Link href="#" target="_blank">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 dark:hover:bg-primary/20">
                  <Instagram className="w-5 h-5 text-primary dark:text-primary/80" />
                </Button>
              </Link>
              <Link href="#" target="_blank">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 dark:hover:bg-primary/20">
                  <Twitter className="w-5 h-5 text-primary dark:text-primary/80" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Academics */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary dark:text-primary/80">Academics</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/academics/primary" className="hover:text-primary hover:underline transition-colors">Primary School</Link></li>
              <li><Link href="/academics/middle" className="hover:text-primary hover:underline transition-colors">Middle School</Link></li>
              <li><Link href="/academics/high" className="hover:text-primary hover:underline transition-colors">High School</Link></li>
              <li><Link href="/academics/curriculum" className="hover:text-primary hover:underline transition-colors">Curriculum</Link></li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary dark:text-primary/80">Admissions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/admissions/process" className="hover:text-primary hover:underline transition-colors">Admission Process</Link></li>
              <li><Link href="/admissions/requirements" className="hover:text-primary hover:underline transition-colors">Requirements</Link></li>
              <li><Link href="/admissions/fees" className="hover:text-primary hover:underline transition-colors">Fee Structure</Link></li>
              <li><Link href="/admissions/apply" className="hover:text-primary hover:underline transition-colors">Apply Online</Link></li>
            </ul>
          </div>

          {/* School Life */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary dark:text-primary/80">School Life</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/facilities" className="hover:text-primary hover:underline transition-colors">Facilities</Link></li>
              <li><Link href="/activities" className="hover:text-primary hover:underline transition-colors">Activities</Link></li>
              <li><Link href="/events" className="hover:text-primary hover:underline transition-colors">Events</Link></li>
              <li><Link href="/gallery" className="hover:text-primary hover:underline transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary dark:text-primary/80">Contact Details</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>info@greenwoodschool.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>123 Education Street, City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-6 text-xs text-muted-foreground border-t border-border pt-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              <span>© 2025 Greenwood International School. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>•</span>
              <span>Developed by <Link href="https://techcognify.com" target="_blank" className="text-primary hover:text-secondary transition-colors font-medium">TechCognify.com</Link></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
