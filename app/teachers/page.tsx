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
  Phone
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
}
 

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

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
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Our world-class educators combine academic excellence with innovative teaching methods 
            to inspire and nurture the next generation of leaders, thinkers, and innovators.
          </p>
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

      {/* Teachers Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <Card key={teacher._id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden hover:border-green-200">
              {/* Header with gradient background */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20 border-4 border-white/20">
                      <AvatarImage src={teacher.photo || teacher.profileImage} alt={teacher.name || `${teacher.firstName} ${teacher.lastName}`} />
                      <AvatarFallback className="text-2xl bg-white/20 text-white">
                        {teacher.firstName[0]}{teacher.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{teacher.name || `${teacher.firstName} ${teacher.lastName}`}</h3>
                      <p className="text-green-100 font-semibold text-sm">{teacher.designation || "Teacher"}</p>
                      <p className="text-green-200 text-sm">{teacher.department || "Academic"} Department</p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Experience and Qualifications */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Clock className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <div className="font-bold text-green-900">{teacher.experienceYears || teacher.experience || 0} Years</div>
                    <div className="text-xs text-green-600">Experience</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
                    <div className="font-bold text-emerald-900">{(teacher.qualifications || []).length}</div>
                    <div className="text-xs text-emerald-600">Qualifications</div>
                  </div>
                </div>

                {/* Subjects */}
                <div>
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

                {/* Specializations */}
                {teacher.specializations && teacher.specializations.length > 0 && (
                  <div>
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

                {/* Top Skills */}
                {teacher.skills && teacher.skills.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Trophy className="h-4 w-4 text-green-600 mr-1" />
                      Key Skills
                    </h4>
                    <div className="space-y-2">
                      {teacher.skills.slice(0, 3).map((skill, index) => (
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
                  </div>
                )}

                {/* Achievements */}
                {teacher.achievements && teacher.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Award className="h-4 w-4 text-green-500 mr-1" />
                      Recent Achievements
                    </h4>
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

                {/* Teaching Philosophy */}
                {(teacher.philosophy || teacher.teachingPhilosophy) && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                    <Quote className="h-5 w-5 text-green-500 mb-2" />
                    <p className="text-gray-700 italic text-sm leading-relaxed">
                      "{teacher.philosophy || teacher.teachingPhilosophy}"
                    </p>
                  </div>
                )}

                {/* Testimonial */}
                {teacher.testimonials && teacher.testimonials.length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm text-gray-700 italic mb-2">
                      "{teacher.testimonials[0].feedback}"
                    </p>
                    <p className="text-xs text-green-600 font-medium mb-1">
                      - {teacher.testimonials[0].author}, {teacher.testimonials[0].relation}
                    </p>
                  </div>
                )}

                <Separator />

                {/* Contact Info */}
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    {teacher.email && (
                      <div className="flex items-center text-xs text-gray-600">
                        <Mail className="h-3 w-3 mr-1" />
                        {teacher.email}
                      </div>
                    )}
                    {teacher.phone && (
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone className="h-3 w-3 mr-1" />
                        {teacher.phone}
                      </div>
                    )}
                  </div>
                  <Link href={`/teachers/${teacher._id}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    <Footer />
    </div>
  );
}