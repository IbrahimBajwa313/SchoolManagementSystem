"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, Sparkles, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Name */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent truncate">
                Greenwood International
              </h1>
              <p className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1 truncate">
                <Sparkles className="h-3 w-3 flex-shrink-0" />
                Excellence in Education
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {["About", "Academics", "Facilities", "Admissions", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            )}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link href="/parent/login">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-md text-xs lg:text-sm"
              >
                Parent Portal
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:shadow-md text-xs lg:text-sm"
              >
                Admin Login
              </Button>
            </Link>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs lg:text-sm"
            >
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-4 border-t border-border animate-slideDown">
            <nav className="flex flex-col space-y-3 pt-4">
              {["About", "Academics", "Facilities", "Admissions", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
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
  )
}
