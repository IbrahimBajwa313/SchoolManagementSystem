"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, DollarSign, Calendar, Download, FileText } from "lucide-react"

export default function ReportsPage() {
  // Sample data for charts
  const studentPerformanceData = [
    { subject: "Math", average: 85, passRate: 92 },
    { subject: "English", average: 78, passRate: 88 },
    { subject: "Science", average: 82, passRate: 90 },
    { subject: "History", average: 75, passRate: 85 },
    { subject: "Geography", average: 80, passRate: 87 },
  ]

  const feeCollectionData = [
    { month: "Jan", collected: 450000, pending: 50000 },
    { month: "Feb", collected: 480000, pending: 45000 },
    { month: "Mar", collected: 470000, pending: 55000 },
    { month: "Apr", collected: 490000, pending: 40000 },
    { month: "May", collected: 500000, pending: 35000 },
    { month: "Jun", collected: 485000, pending: 48000 },
  ]

  const attendanceData = [
    { month: "Jan", attendance: 95.2 },
    { month: "Feb", attendance: 94.8 },
    { month: "Mar", attendance: 96.1 },
    { month: "Apr", attendance: 93.5 },
    { month: "May", attendance: 95.8 },
    { month: "Jun", attendance: 94.3 },
  ]

  const enrollmentData = [
    { grade: "Grade 1", students: 120 },
    { grade: "Grade 2", students: 115 },
    { grade: "Grade 3", students: 110 },
    { grade: "Grade 4", students: 105 },
    { grade: "Grade 5", students: 100 },
    { grade: "Grade 6", students: 95 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  const keyMetrics = [
    {
      title: "Total Students",
      value: "1,245",
      change: "+5.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Fee Collection Rate",
      value: "92.5%",
      change: "+2.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Average Attendance",
      value: "95.1%",
      change: "-0.8%",
      trend: "down",
      icon: Calendar,
    },
    {
      title: "Academic Performance",
      value: "84.2%",
      change: "+3.5%",
      trend: "up",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="current-year">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-year">Current Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="mr-1">
                  {metric.change}
                </Badge>
                from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="academic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Analytics</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>Average scores and pass rates by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={studentPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="average" fill="#8884d8" name="Average Score" />
                    <Bar dataKey="passRate" fill="#82ca9d" name="Pass Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Student distribution across grades</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={enrollmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ grade, students }) => `${grade}: ${students}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="students"
                    >
                      {enrollmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
              <CardDescription>Students with highest academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Emma Johnson", grade: "5A", average: 96.5, rank: 1 },
                  { name: "Michael Chen", grade: "6B", average: 94.8, rank: 2 },
                  { name: "Sarah Williams", grade: "5B", average: 93.2, rank: 3 },
                  { name: "David Brown", grade: "6A", average: 92.7, rank: 4 },
                  { name: "Lisa Davis", grade: "5A", average: 91.9, rank: 5 },
                ].map((student) => (
                  <div key={student.rank} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">#{student.rank}</Badge>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">Grade {student.grade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{student.average}%</p>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Trends</CardTitle>
              <CardDescription>Monthly fee collection vs pending amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={feeCollectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, ""]} />
                  <Legend />
                  <Bar dataKey="collected" fill="#22c55e" name="Collected Amount" />
                  <Bar dataKey="pending" fill="#ef4444" name="Pending Amount" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">₹29,05,000</div>
                <p className="text-sm text-gray-600">Current academic year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">₹2,73,000</div>
                <p className="text-sm text-gray-600">Outstanding amount</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">91.4%</div>
                <p className="text-sm text-gray-600">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Trends</CardTitle>
              <CardDescription>School-wide attendance percentage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Attendance"]} />
                  <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Class-wise Attendance</CardTitle>
                <CardDescription>Current month attendance by class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { class: "Grade 1A", attendance: 96.2 },
                    { class: "Grade 2A", attendance: 94.8 },
                    { class: "Grade 3A", attendance: 95.5 },
                    { class: "Grade 4A", attendance: 93.1 },
                    { class: "Grade 5A", attendance: 97.3 },
                  ].map((item) => (
                    <div key={item.class} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.class}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.attendance}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold">{item.attendance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Alerts</CardTitle>
                <CardDescription>Students with low attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "John Smith", class: "5A", attendance: 78.5 },
                    { name: "Alice Brown", class: "4B", attendance: 82.1 },
                    { name: "Robert Wilson", class: "6A", attendance: 79.8 },
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">Class {student.class}</p>
                      </div>
                      <Badge variant="destructive">{student.attendance}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment by Grade</CardTitle>
              <CardDescription>Current student distribution across grades</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Students:</span>
                    <span className="font-semibold">1,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Admissions (This Year):</span>
                    <span className="font-semibold text-green-600">187</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students Left:</span>
                    <span className="font-semibold text-red-600">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Growth:</span>
                    <span className="font-semibold text-blue-600">+164</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Academic Report
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Fee Collection Report
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Attendance Summary Report
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Student Enrollment Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
