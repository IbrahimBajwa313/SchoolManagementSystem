"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Award, 
  Star, 
  BookOpen, 
  Users, 
  Clock,
  Trophy,
  Quote,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Globe,
  Briefcase,
  ChevronLeft,
  Share2,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

interface TeacherSkill {
  skillName: string;
  proficiency: number;
}

interface TeacherTestimonial {
  author: string;
  relation: string;
  feedback: string;
}

interface Teacher {
  _id: string;
  firstName: string;
  lastName: string;
  name?: string;
  designation?: string;
  department?: string;
  subjects: string[];
  subject?: string[];
  experienceYears?: number;
  experience?: number;
  qualifications?: string[];
  certifications?: string[];
  specializations?: string[];
  skills?: TeacherSkill[];
  achievements?: string[];
  publications?: string[];
  philosophy?: string;
  teachingPhilosophy?: string;
  testimonials?: TeacherTestimonial[];
  profileImage?: string;
  photo?: string;
  email?: string;
  phone?: string;
  location?: string;
  rating?: number;
  studentsCount?: number;
  bio?: string;
  education?: string[];
  languages?: string[];
  availability?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export default function TeacherProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (params.id) {
      fetchTeacher();
    }
  }, [params.id]);

  const fetchTeacher = async () => {
    try {
      const response = await fetch(`/api/teachers/${params.id}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setTeacher(data.data);
      } else {
        // If teacher not found in API, use sample data for demo
        const sampleTeacher = sampleTeachers.find(t => t._id === params.id);
        if (sampleTeacher) {
          setTeacher(sampleTeacher);
        } else {
          router.push("/teachers");
        }
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
      // Use sample data on error
      const sampleTeacher = sampleTeachers.find(t => t._id === params.id);
      if (sampleTeacher) {
        setTeacher(sampleTeacher);
      } else {
        router.push("/teachers");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Teacher Not Found</h1>
          <p className="text-gray-600 mb-8">The teacher you're looking for doesn't exist or has been removed.</p>
          <Link href="/teachers">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              Back to Teachers
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header />
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={teacher.photo || teacher.profileImage} alt={teacher.name || `${teacher.firstName} ${teacher.lastName}`} />
                <AvatarFallback className="text-3xl bg-white/20 text-white">
                  {teacher.firstName[0]}{teacher.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="md:w-3/4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{teacher.name || `${teacher.firstName} ${teacher.lastName}`}</h1>
                  <p className="text-xl text-green-100 font-medium">{teacher.designation || "Teacher"}</p>
                  <p className="text-green-200">{teacher.department || "Academic"} Department</p>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button className="bg-white text-green-600 hover:bg-green-50">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{teacher.rating || "4.5"}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{teacher.experienceYears || teacher.experience || 0} Years Experience</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{teacher.studentsCount || 0} Students</span>
                </div>
                {teacher.location && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{teacher.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/teachers">
          <Button variant="ghost" className="text-green-600 hover:text-green-800 hover:bg-green-50">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Teachers
          </Button>
        </Link>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            {/* Bio Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {teacher.bio || 
                  `${teacher.name || `${teacher.firstName} ${teacher.lastName}`} is a dedicated ${teacher.designation?.toLowerCase() || "teacher"} with ${teacher.experienceYears || teacher.experience || 0} years of experience in education. They specialize in ${(teacher.subjects || teacher.subject || []).join(", ")} and are passionate about creating engaging learning experiences for students.`}
                </p>
                
                {(teacher.philosophy || teacher.teachingPhilosophy) && (
                  <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500">
                    <Quote className="h-6 w-6 text-green-500 mb-2" />
                    <p className="text-gray-700 italic text-lg leading-relaxed">
                      "{teacher.philosophy || teacher.teachingPhilosophy}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Subjects & Specializations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                    Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(teacher.subjects || teacher.subject || []).map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-sm bg-green-50 text-green-700 border-green-200">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {teacher.specializations && teacher.specializations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 text-green-500 mr-2" />
                      Specializations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {teacher.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-sm bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Skills */}
            {teacher.skills && teacher.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-green-600 mr-2" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacher.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{skill.skillName}</span>
                          <span className="text-gray-600">{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} 
                          className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 text-green-500 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teacher.email && (
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Mail className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{teacher.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {teacher.phone && (
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{teacher.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {teacher.location && (
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{teacher.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {teacher.availability && (
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Availability</p>
                        <p className="font-medium">{teacher.availability}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {teacher.socialLinks && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Connect on social media:</p>
                    <div className="flex space-x-3">
                      {teacher.socialLinks.linkedin && (
                        <a href={teacher.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                            LinkedIn
                          </Button>
                        </a>
                      )}
                      {teacher.socialLinks.twitter && (
                        <a href={teacher.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="text-blue-400 border-blue-200 hover:bg-blue-50">
                            Twitter
                          </Button>
                        </a>
                      )}
                      {teacher.socialLinks.website && (
                        <a href={teacher.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                            <Globe className="h-4 w-4 mr-1" />
                            Website
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="qualifications" className="space-y-8">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-green-500 mr-2" />
                  Education & Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teacher.qualifications && teacher.qualifications.length > 0 ? (
                  <div className="space-y-4">
                    {teacher.qualifications.map((qual, index) => (
                      <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg">
                        <div className="bg-green-100 p-2 rounded-full mr-4">
                          <GraduationCap className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{qual}</h4>
                          <p className="text-sm text-gray-600 mt-1">Completed in {2010 + index * 2}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No qualification information available.</p>
                )}
              </CardContent>
            </Card>
            
            {/* Certifications */}
            {teacher.certifications && teacher.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 text-green-500 mr-2" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start p-4 bg-emerald-50 rounded-lg">
                        <div className="bg-emerald-100 p-2 rounded-full mr-4">
                          <Award className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{cert}</h4>
                          <p className="text-sm text-gray-600 mt-1">Issued in {2015 + index}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Languages */}
            {teacher.languages && teacher.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 text-green-500 mr-2" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {teacher.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-sm bg-green-50 text-green-700 border-green-200">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-8">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 text-green-500 mr-2" />
                  Achievements & Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teacher.achievements && teacher.achievements.length > 0 ? (
                  <div className="space-y-4">
                    {teacher.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg">
                        <div className="bg-green-100 p-2 rounded-full mr-4">
                          <Trophy className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{achievement}</h4>
                          <p className="text-sm text-gray-600 mt-1">Achieved in {2018 + index}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No achievement information available.</p>
                )}
              </CardContent>
            </Card>
            
            {/* Publications */}
            {teacher.publications && teacher.publications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                    Publications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.publications.map((pub, index) => (
                      <div key={index} className="p-4 bg-emerald-50 rounded-lg">
                        <h4 className="font-medium text-gray-900">{pub}</h4>
                        <p className="text-sm text-gray-600 mt-1">Published in {2019 + index}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 text-green-500 mr-2" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div className="h-full w-0.5 bg-green-200 mt-2"></div>
                    </div>
                    <div className="pb-6">
                      <h4 className="font-medium text-gray-900">{teacher.designation || "Teacher"}</h4>
                      <p className="text-green-600">{teacher.department || "Academic"} Department</p>
                      <p className="text-sm text-gray-600 mt-1">{2010 + (teacher.experienceYears || teacher.experience || 0)} - Present</p>
                      <p className="text-gray-700 mt-2">
                        Teaching {(teacher.subjects || teacher.subject || []).join(", ")} to students across different grade levels.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-green-700" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Previous Teaching Position</h4>
                      <p className="text-green-600">Education Department</p>
                      <p className="text-sm text-gray-600 mt-1">2008 - {2010 + (teacher.experienceYears || teacher.experience || 0)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="testimonials" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Quote className="h-5 w-5 text-green-500 mr-2" />
                  Testimonials
                </CardTitle>
                <CardDescription>What students and colleagues say about {teacher.name || `${teacher.firstName} ${teacher.lastName}`}</CardDescription>
              </CardHeader>
              <CardContent>
                {teacher.testimonials && teacher.testimonials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teacher.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                        <Quote className="h-6 w-6 text-green-500 mb-4" />
                        <p className="text-gray-700 italic mb-4">"{testimonial.feedback}"</p>
                        <div>
                          <p className="font-medium text-gray-900">{testimonial.author}</p>
                          <p className="text-sm text-green-600">{testimonial.relation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Quote className="h-12 w-12 text-green-300 mx-auto mb-4" />
                    <p className="text-gray-600">No testimonials available yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}

// Sample data for demonstration
const sampleTeachers: Teacher[] = [
  {
    _id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    designation: "Senior Mathematics Teacher",
    department: "Mathematics",
    subjects: ["Algebra", "Calculus", "Geometry"],
    experienceYears: 12,
    qualifications: ["MSc in Mathematics", "BEd in Education"],
    specializations: ["Advanced Calculus", "Statistics", "Mathematical Modeling"],
    skills: [
      { skillName: "Curriculum Development", proficiency: 95 },
      { skillName: "Student Assessment", proficiency: 90 },
      { skillName: "Educational Technology", proficiency: 85 }
    ],
    achievements: ["National Teaching Excellence Award 2020", "Published 3 research papers"],
    philosophy: "Mathematics is not about numbers, equations, or algorithms: it is about understanding.",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    studentsCount: 142,
    location: "Campus A, Building B",
    bio: "Sarah Johnson is a dedicated mathematics educator with over 12 years of experience in teaching algebra, calculus, and geometry. She is passionate about making mathematics accessible and enjoyable for all students.",
    languages: ["English", "Spanish"],
    availability: "Monday to Friday, 9:00 AM - 4:00 PM",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      website: "https://sarahjohnson.edu"
    },
    testimonials: [
      {
        author: "Michael Chen",
        relation: "Colleague",
        feedback: "Sarah is an exceptional mathematics teacher who brings creativity and enthusiasm to her classroom. Her students consistently achieve outstanding results."
      },
      {
        author: "Emily Rodriguez",
        relation: "Parent",
        feedback: "My daughter struggled with math until she had Sarah as her teacher. Now she excels and actually enjoys the subject!"
      }
    ],
    publications: ["Innovative Approaches to Teaching Calculus", "Mathematical Modeling in High School Education"]
  },
  {
    _id: "2",
    firstName: "Michael",
    lastName: "Chen",
    designation: "Science Department Head",
    department: "Science",
    subjects: ["Physics", "Chemistry", "Biology"],
    experienceYears: 15,
    qualifications: ["PhD in Physics", "MSc in Education"],
    specializations: ["Quantum Physics", "Organic Chemistry", "Molecular Biology"],
    skills: [
      { skillName: "Laboratory Management", proficiency: 98 },
      { skillName: "Research Methodology", proficiency: 92 },
      { skillName: "STEM Education", proficiency: 90 }
    ],
    achievements: ["Innovative Science Educator Award 2019", "Developed school science curriculum"],
    philosophy: "Science is a way of thinking much more than it is a body of knowledge.",
    email: "michael.chen@school.edu",
    phone: "+1 (555) 987-6543",
    rating: 4.9,
    studentsCount: 178,
    location: "Campus A, Building C",
    bio: "Dr. Michael Chen is a distinguished science educator with 15 years of experience in teaching physics, chemistry, and biology. He leads the Science Department and is passionate about inspiring the next generation of scientists.",
    languages: ["English", "Mandarin"],
    availability: "Monday to Friday, 8:00 AM - 5:00 PM",
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelchen",
      website: "https://michaelchen.science"
    },
    testimonials: [
      {
        author: "Sarah Johnson",
        relation: "Colleague",
        feedback: "Michael's leadership in the Science Department has transformed our science curriculum. His expertise and passion for science education are truly inspiring."
      },
      {
        author: "David Wilson",
        relation: "Student",
        feedback: "Dr. Chen makes complex scientific concepts easy to understand. His classes are always engaging and thought-provoking."
      }
    ],
    publications: ["Quantum Physics for High School Students", "Innovative Approaches to Science Education"]
  },
  {
    _id: "3",
    firstName: "Emily",
    lastName: "Rodriguez",
    designation: "English Literature Teacher",
    department: "Languages",
    subjects: ["English Literature", "Creative Writing", "Poetry"],
    experienceYears: 8,
    qualifications: ["MA in English Literature", "BA in Creative Writing"],
    specializations: ["Shakespearean Studies", "Modern Poetry", "Creative Writing"],
    skills: [
      { skillName: "Literary Analysis", proficiency: 95 },
      { skillName: "Writing Instruction", proficiency: 90 },
      { skillName: "Public Speaking", proficiency: 85 }
    ],
    achievements: ["Published Author of 2 Novels", "Poetry Competition Judge"],
    philosophy: "Literature is the art of discovering something extraordinary about ordinary people.",
    email: "emily.rodriguez@school.edu",
    phone: "+1 (555) 456-7890",
    rating: 4.7,
    studentsCount: 120,
    location: "Campus B, Building A",
    bio: "Emily Rodriguez is a passionate English literature teacher with 8 years of experience. She specializes in Shakespearean studies, modern poetry, and creative writing. Emily is also a published author of two novels.",
    languages: ["English", "French", "Spanish"],
    availability: "Monday to Friday, 9:00 AM - 3:00 PM",
    socialLinks: {
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      twitter: "https://twitter.com/emilyrodriguez",
      website: "https://emilyrodriguez.com"
    },
    testimonials: [
      {
        author: "Michael Chen",
        relation: "Colleague",
        feedback: "Emily brings literature to life in her classroom. Her passion for the subject is contagious, and her students develop a deep appreciation for literature."
      },
      {
        author: "Sophia Martinez",
        relation: "Student",
        feedback: "Ms. Rodriguez is the best English teacher I've ever had. She helped me discover my love for creative writing and poetry."
      }
    ],
    publications: ["The Art of Storytelling", "Modern Poetry: A Critical Analysis"]
  },
  {
    _id: "68c999adcc4ab189bf46242b",
    firstName: "David",
    lastName: "Wilson",
    designation: "History Teacher",
    department: "Humanities",
    subjects: ["World History", "American History", "Political Science"],
    experienceYears: 10,
    qualifications: ["MA in History", "BEd in Education"],
    specializations: ["Modern History", "Political Systems", "Historical Research"],
    skills: [
      { skillName: "Historical Analysis", proficiency: 95 },
      { skillName: "Curriculum Development", proficiency: 90 },
      { skillName: "Debate Coaching", proficiency: 85 }
    ],
    achievements: ["History Teacher of the Year 2021", "Published Historical Research"],
    philosophy: "History is not just about the past; it's about understanding our present and shaping our future.",
    email: "david.wilson@school.edu",
    phone: "+1 (555) 345-6789",
    rating: 4.6,
    studentsCount: 95,
    location: "Campus B, Building C",
    bio: "David Wilson is a passionate history teacher with 10 years of experience. He specializes in modern history, political systems, and historical research. David is dedicated to making history relevant and engaging for his students.",
    languages: ["English", "German"],
    availability: "Monday to Friday, 8:30 AM - 3:30 PM",
    socialLinks: {
      linkedin: "https://linkedin.com/in/davidwilson",
      website: "https://davidwilson.history"
    },
    testimonials: [
      {
        author: "Emily Rodriguez",
        relation: "Colleague",
        feedback: "David brings history to life in his classroom. His students are always engaged and develop a deep understanding of historical events and their significance."
      },
      {
        author: "James Taylor",
        relation: "Student",
        feedback: "Mr. Wilson makes history fascinating. I never thought I would enjoy learning about the past, but his classes have changed my perspective completely."
      }
    ],
    publications: ["Modern Political Systems: A Historical Perspective", "Teaching History in the Digital Age"]
  }
];