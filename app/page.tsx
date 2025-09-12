import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Star,
  Trophy,
  Target,
  Heart,
  Globe,
  Microscope,
  ChevronRight,
  Play,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SchoolHomepage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary rounded-full p-2">
                  <GraduationCap className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Greenwood International School</h1>
                  <p className="text-sm text-muted-foreground">Excellence in Education Since 1985</p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#academics" className="text-foreground hover:text-primary transition-colors">
                Academics
              </a>
              <a href="#facilities" className="text-foreground hover:text-primary transition-colors">
                Facilities
              </a>
              <a href="#admissions" className="text-foreground hover:text-primary transition-colors">
                Admissions
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/parent/login">
                <Button variant="outline" size="sm">
                  Parent Portal
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/modern-school-aerial.png')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  🏆 Ranked #1 School in the Region
                </Badge>
                <h1 className="text-6xl font-bold text-foreground leading-tight text-balance">
                  Inspiring Excellence in
                  <span className="text-primary"> Education</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg text-pretty">
                  At Greenwood International School, we nurture young minds through innovative teaching, world-class
                  facilities, and a commitment to holistic development that prepares students for global success.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 group">
                  Schedule Campus Tour
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 group bg-transparent">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Virtual Tour
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2500+</div>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <p className="text-sm text-muted-foreground">Faculty</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/modern-school-students-in-classroom-with-technolog.jpg"
                  alt="Students in modern classroom"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Award Winning</div>
                    <div className="text-sm text-muted-foreground">Excellence in Education 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary">
                  About Our School
                </Badge>
                <h2 className="text-4xl font-bold text-foreground text-balance">
                  Nurturing Tomorrow's Leaders Since 1985
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  For nearly four decades, Greenwood International School has been at the forefront of educational
                  excellence, combining traditional values with innovative teaching methodologies to create an
                  environment where every student can thrive.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-semibold">CBSE Curriculum</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Comprehensive academic program</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Global Perspective</span>
                  </div>
                  <p className="text-sm text-muted-foreground">International exposure & exchange</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Holistic Development</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Academic, social & emotional growth</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Individual Attention</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Personalized learning approach</p>
                </div>
              </div>

              <Button className="bg-primary hover:bg-primary/90">
                Learn More About Us
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/school-principal-with-students-in-library.jpg"
                alt="School community"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="academics" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-primary border-primary mb-4">
              Academic Programs
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">
              Comprehensive Education for Every Stage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              From foundational learning to advanced academics, our curriculum is designed to challenge, inspire, and
              prepare students for success in higher education and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-8 w-8 text-primary mx-auto" />
                </div>
                <CardTitle className="text-xl">Primary School</CardTitle>
                <CardDescription>Classes I - V</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Foundation years focusing on core subjects, creativity, and social skills development.
                </p>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>English, Mathematics, Science</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Art, Music, Physical Education</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Life Skills & Values Education</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Microscope className="h-8 w-8 text-primary mx-auto" />
                </div>
                <CardTitle className="text-xl">Middle School</CardTitle>
                <CardDescription>Classes VI - VIII</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Transitional years with specialized subjects and skill-building activities.
                </p>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Advanced Mathematics & Science</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Social Studies & Languages</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Computer Science & Robotics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-8 w-8 text-primary mx-auto" />
                </div>
                <CardTitle className="text-xl">High School</CardTitle>
                <CardDescription>Classes IX - XII</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">Board preparation with stream selection and career guidance.</p>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Science, Commerce, Humanities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Competitive Exam Preparation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Career Counseling & Guidance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="facilities" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-primary border-primary mb-4">
              World-Class Facilities
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">State-of-the-Art Infrastructure</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Our campus features modern facilities designed to enhance learning, creativity, and overall development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/modern-science-laboratory-with-equipment.jpg"
                  alt="Science Labs"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Science Labs</h3>
              <p className="text-muted-foreground text-sm">Advanced physics, chemistry, and biology laboratories</p>
            </div>

            <div className="group text-center space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/modern-library-with-students-reading.jpg"
                  alt="Digital Library"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Digital Library</h3>
              <p className="text-muted-foreground text-sm">Extensive collection with digital resources</p>
            </div>

            <div className="group text-center space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/school-sports-complex-with-swimming-pool.jpg"
                  alt="Sports Complex"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sports Complex</h3>
              <p className="text-muted-foreground text-sm">Multi-sport facilities and swimming pool</p>
            </div>

            <div className="group text-center space-y-4">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/modern-computer-lab-students.png"
                  alt="Tech Center"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Tech Center</h3>
              <p className="text-muted-foreground text-sm">Computer labs and robotics workshop</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Greenwood?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive educational experience that goes beyond textbooks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
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

            <Card className="text-center">
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

            <Card className="text-center">
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

            <Card className="text-center">
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

            <Card className="text-center">
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

            <Card className="text-center">
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

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-primary border-primary mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">What Our Community Says</h2>
            <p className="text-xl text-muted-foreground">Hear from parents, students, and alumni</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg">
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

            <Card className="bg-white border-0 shadow-lg">
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

            <Card className="bg-white border-0 shadow-lg">
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

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary">
                  Get in Touch
                </Badge>
                <h2 className="text-4xl font-bold text-foreground text-balance">Ready to Join Our School Family?</h2>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  Contact us today to learn more about admissions, schedule a campus visit, or get answers to your
                  questions about our programs.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Visit Our Campus</h3>
                    <p className="text-muted-foreground">123 Education Street, Knowledge City, State 560001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-sm text-muted-foreground">Mon - Fri: 8:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground">admissions@greenwoodschool.edu</p>
                    <p className="text-muted-foreground">info@greenwoodschool.edu</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Admission Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <span className="text-muted-foreground">Submit online application</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <span className="text-muted-foreground">Schedule campus visit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <span className="text-muted-foreground">Attend interaction session</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      4
                    </div>
                    <span className="text-muted-foreground">Complete enrollment</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Quick Inquiry</CardTitle>
                <CardDescription>Send us a message and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name *</label>
                    <input
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name *</label>
                    <input
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <input
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <input
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Grade of Interest</label>
                  <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                    <option>Select Grade</option>
                    <option>Nursery - KG</option>
                    <option>Class I - V</option>
                    <option>Class VI - VIII</option>
                    <option>Class IX - X</option>
                    <option>Class XI - XII</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    className="w-full px-4 py-3 border border-border rounded-lg h-32 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your inquiry or any specific questions you have..."
                  ></textarea>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 py-3 text-lg">
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary rounded-full p-2">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Greenwood International</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Committed to providing quality education and nurturing young minds for a brighter future since 1985.
              </p>
              <div className="flex space-x-4">
                <div className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors cursor-pointer">
                  <Phone className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#academics" className="hover:text-white transition-colors">
                    Academic Programs
                  </a>
                </li>
                <li>
                  <a href="#facilities" className="hover:text-white transition-colors">
                    Facilities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Faculty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    News & Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Admissions</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Application Process
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fee Structure
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Scholarships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Campus Tour
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-1 text-primary" />
                  <span>
                    123 Education Street
                    <br />
                    Knowledge City, State 560001
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@greenwoodschool.edu</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">
              &copy; 2024 Greenwood International School. All rights reserved. |
              <a href="#" className="hover:text-white transition-colors ml-1">
                Privacy Policy
              </a>{" "}
              |
              <a href="#" className="hover:text-white transition-colors ml-1">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
