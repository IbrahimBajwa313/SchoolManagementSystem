"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Academics } from "@/components/sections/Academics"
import { Facilities } from "@/components/sections/Facilities"
import { Features } from "@/components/sections/Features"
import { Testimonials } from "@/components/sections/Testimonials"
import { Contact } from "@/components/sections/Contact"

export default function SchoolHomepage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Academics />
      <Facilities />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}