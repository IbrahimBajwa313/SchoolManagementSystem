"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Bell, Send, Users } from "lucide-react"

export default function CommunicationPage() {
  const [selectedRecipient, setSelectedRecipient] = useState("")
  const [messageText, setMessageText] = useState("")
  const [announcementTitle, setAnnouncementTitle] = useState("")
  const [announcementContent, setAnnouncementContent] = useState("")

  const messages = [
    {
      id: 1,
      from: "John Smith (Parent)",
      subject: "Question about homework",
      preview: "I wanted to ask about the math homework...",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      from: "Sarah Johnson (Teacher)",
      subject: "Student progress update",
      preview: "Emma has shown great improvement...",
      time: "1 day ago",
      unread: false,
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "School Holiday Notice",
      content: "School will be closed on December 25th for Christmas holiday.",
      date: "2024-12-20",
      priority: "high",
      recipients: "All Students & Parents",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      content: "Annual parent-teacher meetings scheduled for next week.",
      date: "2024-12-18",
      priority: "medium",
      recipients: "All Parents",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
          <p className="text-gray-600">Manage messages, announcements, and notifications</p>
        </div>
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="compose" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Compose
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>View and respond to messages from parents and teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${message.unread ? "border-l-4 border-l-blue-500 bg-blue-50" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{message.from}</span>
                          {message.unread && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-gray-800 mb-1">{message.subject}</h4>
                        <p className="text-gray-600 text-sm">{message.preview}</p>
                      </div>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>School Announcements</CardTitle>
              <CardDescription>Manage and publish announcements to students and parents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={announcement.priority === "high" ? "destructive" : "secondary"}>
                          {announcement.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">{announcement.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{announcement.content}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{announcement.recipients}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>Send a direct message to parents or teachers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Recipient</label>
                  <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-parents">All Parents</SelectItem>
                      <SelectItem value="all-teachers">All Teachers</SelectItem>
                      <SelectItem value="class-5a-parents">Class 5A Parents</SelectItem>
                      <SelectItem value="math-teachers">Math Teachers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                  <Input placeholder="Enter message subject" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                  <Textarea
                    placeholder="Type your message here..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Announcement</CardTitle>
                <CardDescription>Publish announcements to the school community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Title</label>
                  <Input
                    placeholder="Announcement title"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Content</label>
                  <Textarea
                    placeholder="Announcement content..."
                    value={announcementContent}
                    onChange={(e) => setAnnouncementContent(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Recipients</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students & Parents</SelectItem>
                      <SelectItem value="parents">All Parents</SelectItem>
                      <SelectItem value="students">All Students</SelectItem>
                      <SelectItem value="teachers">All Teachers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  Publish Announcement
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
