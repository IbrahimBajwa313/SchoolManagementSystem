"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, Clock, CheckCircle, XCircle, Users } from "lucide-react"
import { toast } from "sonner"

interface EmailLog {
  _id: string
  type: string
  studentId: string
  recipients: string[]
  subject: string
  sentAt: string
  status: "sent" | "failed"
  error?: string
}

interface EmailStats {
  sent: number
  failed: number
}

export default function EmailsPage() {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([])
  const [emailStats, setEmailStats] = useState<EmailStats>({ sent: 0, failed: 0 })
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchEmailLogs()
  }, [])

  const fetchEmailLogs = async () => {
    try {
      const response = await fetch("/api/emails/send-fee-reminders")
      const data = await response.json()

      if (data.success) {
        setEmailLogs(data.logs || [])
        setEmailStats(data.stats || { sent: 0, failed: 0 })
      }
    } catch (error) {
      console.error("Failed to fetch email logs:", error)
      toast.error("Failed to load email logs")
    } finally {
      setLoading(false)
    }
  }

  const sendFeeReminders = async () => {
    setSending(true)
    try {
      const response = await fetch("/api/cron/monthly-fee-emails", {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        toast.success(`Fee reminder emails sent successfully! ${data.result.emailsSent} emails sent.`)
        fetchEmailLogs() // Refresh logs
      } else {
        toast.error(data.message || "Failed to send fee reminders")
      }
    } catch (error) {
      console.error("Failed to send fee reminders:", error)
      toast.error("Failed to send fee reminders")
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Management</h1>
          <p className="text-muted-foreground">Manage automated fee reminder emails and communication</p>
        </div>
        <Button onClick={sendFeeReminders} disabled={sending} className="gap-2">
          <Send className="h-4 w-4" />
          {sending ? "Sending..." : "Send Fee Reminders"}
        </Button>
      </div>

      {/* Email Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailStats.sent || 0}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Emails</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{emailStats.failed || 0}</div>
            <p className="text-xs text-muted-foreground">Delivery failed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {emailStats.sent + emailStats.failed > 0
                ? Math.round((emailStats.sent / (emailStats.sent + emailStats.failed)) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Delivery success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Email Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Email Activity Log</CardTitle>
          <CardDescription>Recent fee reminder email activities and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {emailLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No email activities found</p>
              <p className="text-sm">Fee reminder emails will appear here once sent</p>
            </div>
          ) : (
            <div className="space-y-4">
              {emailLogs.map((log) => (
                <div key={log._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={log.status === "sent" ? "default" : "destructive"}>
                        {log.status === "sent" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {log.status}
                      </Badge>
                      <span className="font-medium">{log.subject}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Student ID: {log.studentId}</p>
                      <p className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {log.recipients?.length || 0} recipients: {log.recipients?.join(", ")}
                      </p>
                      {log.error && <p className="text-red-600 mt-1">Error: {log.error}</p>}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(log.sentAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Automation Info */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Email Schedule</CardTitle>
          <CardDescription>Fee reminder emails are automatically sent on the 1st of every month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Schedule:</strong> 1st of every month at 9:00 AM
            </p>
            <p>
              <strong>Recipients:</strong> All active students and their parents/guardians
            </p>
            <p>
              <strong>Content:</strong> Monthly fee reminder with pending amounts
            </p>
            <p>
              <strong>Next Run:</strong>{" "}
              {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
