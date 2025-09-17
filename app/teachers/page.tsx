"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
  Search,
  Filter,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    filterTeachers();
  }, [teachers, searchTerm, departmentFilter, subjectFilter]);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("/api/teachers");
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setTeachers(data.data);
      } else {
        // Use sample data if no teachers found
        setTeachers(sampleTeachers);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      // Use sample data on error
      setTeachers(sampleTeachers);
    } finally {
      setLoading(false);
    }
  };

  const filterTeachers = () => {
    let result = teachers;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(teacher => 
        (teacher.name || `${teacher.firstName} ${teacher.lastName}`).toLowerCase().includes(term) ||
        teacher.designation?.toLowerCase().includes(term) ||
        teacher.department?.toLowerCase().includes(term) ||
        teacher.subjects?.some(subj => subj.toLowerCase().includes(term)) ||
        teacher.subject?.some(subj => subj.toLowerCase().includes(term))
      );
    }
    
    // Apply department filter
    if (departmentFilter !== "All") {
      result = result.filter(teacher => teacher.department === departmentFilter);
    }
    
    // Apply subject filter
    if (subjectFilter !== "All") {
      result = result.filter(teacher => 
        teacher.subjects?.includes(subjectFilter) || 
        teacher.subject?.includes(subjectFilter)
      );
    }
    
    setFilteredTeachers(result);
  };

  // Get unique departments and subjects for filters
  const departments = [...new Set(teachers.map(t => t.department).filter(Boolean))];
  const allSubjects = [...new Set(teachers.flatMap(t => [...(t.subjects || []), ...(t.subject || [])]))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <Header />
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Meet Our Exceptional Faculty
          </h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-8">
            Our world-class educators combine academic excellence with innovative teaching methods 
            to inspire and nurture the next generation of leaders, thinkers, and innovators.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{teachers.length}</div>
              <div className="text-green-200">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {teachers.reduce((sum, t) => sum + (t.experienceYears || t.experience || 0), 0)}+
              </div>
              <div className="text-green-200">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">98%</div>
              <div className="text-green-200">Subjects Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search teachers by name, department, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Subjects</SelectItem>
                {allSubjects.map(subj => (
                  <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Teachers Horizontal List */}
        <div className="space-y-4">
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">No teachers found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredTeachers.map((teacher) => (
              <Card key={teacher._id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Left Section - Teacher Info */}
                    <div className="md:w-1/4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col items-center text-center">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-md mb-4">
                        <AvatarImage src={teacher.photo || teacher.profileImage} alt={teacher.name || `${teacher.firstName} ${teacher.lastName}`} />
                        <AvatarFallback className="text-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          {teacher.firstName[0]}{teacher.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h3 className="text-xl font-bold text-gray-900">{teacher.name || `${teacher.firstName} ${teacher.lastName}`}</h3>
                      <p className="text-green-600 font-medium">{teacher.designation || "Teacher"}</p>
                      <p className="text-gray-600 text-sm mt-1">{teacher.department || "Academic"} Department</p>
                      
                      {teacher.rating && (
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{teacher.rating}</span>
                        </div>
                      )}
                      
                      <div className="mt-4 flex flex-col space-y-2 w-full">
                        <div className="flex items-center justify-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {teacher.experienceYears || teacher.experience || 0} Years Experience
                        </div>
                        
                        {teacher.studentsCount && (
                          <div className="flex items-center justify-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-1" />
                            {teacher.studentsCount} Students
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Middle Section - Details */}
                    <div className="md:w-1/2 p-6">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <BookOpen className="h-4 w-4 text-green-500 mr-1" />
                          Subjects
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(teacher.subjects || teacher.subject || []).map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {teacher.specializations && teacher.specializations.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <Award className="h-4 w-4 text-green-500 mr-1" />
                            Specializations
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {teacher.specializations.map((spec, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {teacher.skills && teacher.skills.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <Trophy className="h-4 w-4 text-green-600 mr-1" />
                            Key Skills
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {teacher.skills.slice(0, 4).map((skill, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                <span className="text-sm">{skill.skillName}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {(teacher.philosophy || teacher.teachingPhilosophy) && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-l-4 border-green-500">
                          <Quote className="h-4 w-4 text-green-500 mb-1" />
                          <p className="text-gray-700 italic text-sm line-clamp-2">
                            "{teacher.philosophy || teacher.teachingPhilosophy}"
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Right Section - Actions */}
                    <div className="md:w-1/4 p-6 bg-gradient-to-b from-green-50 to-white flex flex-col justify-between">
                      <div>
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                          {teacher.email && (
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <Mail className="h-3 w-3 mr-2" />
                              {teacher.email}
                            </div>
                          )}
                          {teacher.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-3 w-3 mr-2" />
                              {teacher.phone}
                            </div>
                          )}
                          {teacher.location && (
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="h-3 w-3 mr-2" />
                              {teacher.location}
                            </div>
                          )}
                        </div>
                        
                        {teacher.achievements && teacher.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                            <ul className="space-y-1">
                              {teacher.achievements.slice(0, 2).map((achievement, index) => (
                                <li key={index} className="text-sm text-gray-700 flex items-start">
                                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <Link href={`/teachers/${teacher._id}`}>
                        <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                          View Full Profile
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
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
    location: "Campus A, Building B"
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
    location: "Campus A, Building C"
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
    location: "Campus B, Building A"
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
    location: "Campus B, Building C"
  }
];