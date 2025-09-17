"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Users,
  GraduationCap,
  DollarSign,
  Calendar,
  BookOpen,
  BarChart3,
  Bell,
  Settings,
  Home,
  Menu,
  ChevronLeft,
  UserCheck,
  Mail,
  FileText,
  School
} from "lucide-react"
import Image from "next/image"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    title: "Teachers",
    href: "/admin/teachers",
    icon: UserCheck,
  },
  {
    title: "Classes",
    href: "/admin/classes",
    icon: School,
  },
  {
    title: "Attendance",
    href: "/admin/attendance",
    icon: Calendar,
  },
  {
    title: "Fees",
    href: "/admin/fees",
    icon: DollarSign,
  },
  {
    title: "Academics",
    href: "/admin/academics",
    icon: BookOpen,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Communications",
    href: "/admin/communication",
    icon: Mail,
  },
  {
    title: "Emails",
    href: "/admin/emails",
    icon: Bell,
  },
]

interface AdminSidebarProps {
  className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              {/* <Image
                src="/logo.png"
                alt="School Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              /> */}
              {!collapsed && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Greenwood
                  </h2>
                  <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </Button>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-2",
                    pathname === item.href && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                  {!collapsed && item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MobileAdminSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex items-center space-x-2 p-4 border-b">
          <Image
            src="/logo.png"
            alt="School Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <div>
            <h2 className="text-lg font-semibold">Greenwood</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
        <ScrollArea className="h-full">
          <div className="space-y-1 p-4">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
