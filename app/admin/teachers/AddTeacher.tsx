"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";

interface TeacherSkill {
  skillName: string;
  proficiency: number;
}

interface TeacherTestimonial {
  author: string;
  relation: string;
  feedback: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  subjects: string[];
  classes: string[];
  qualifications: string[];
  certifications: string[];
  specializations: string[];
  experienceYears: number;
  salary: number;
  joiningDate: string;
  status: string;
  philosophy: string;
  publications: string[];
  achievements: string[];
  skills: TeacherSkill[];
  testimonials: TeacherTestimonial[];
  profileImage: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

interface AddTeacherProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTeacher({ isOpen, onClose, onSuccess }: AddTeacherProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    subjects: [""],
    classes: [""],
    qualifications: [""],
    certifications: [""],
    specializations: [""],
    experienceYears: 0,
    salary: 0,
    joiningDate: new Date().toISOString().split('T')[0],
    status: "Active",
    philosophy: "",
    publications: [""],
    achievements: [""],
    skills: [{ skillName: "", proficiency: 50 }],
    testimonials: [{ author: "", feedback: "", relation: "" }],
    profileImage: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    emergencyContact: {
      name: "",
      phone: "",
      relation: ""
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      designation: "",
      department: "",
      subjects: [""],
      classes: [""],
      qualifications: [""],
      certifications: [""],
      specializations: [""],
      experienceYears: 0,
      salary: 0,
      joiningDate: new Date().toISOString().split('T')[0],
      status: "Active",
      philosophy: "",
      publications: [""],
      achievements: [""],
      skills: [{ skillName: "", proficiency: 50 }],
      testimonials: [{ author: "", feedback: "", relation: "" }],
      profileImage: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
      },
      emergencyContact: {
        name: "",
        phone: "",
        relation: ""
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (data.success) {
        onSuccess();
        onClose();
        resetForm();
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { skillName: "", proficiency: 50 }]
    }));
  };

  const updateSkill = (index: number, field: string, value: string | number) => {
    setFormData(prev => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      return { ...prev, skills: updatedSkills };
    });
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { author: "", relation: "", feedback: "" }]
    }));
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedTestimonials = [...prev.testimonials];
      updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
      return { ...prev, testimonials: updatedTestimonials };
    });
  };

  const removeTestimonial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""]
    }));
  };

  const updateArrayItem = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const updatedArray = [...(prev[field as keyof typeof prev] as string[])];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-700">Add New Teacher</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  placeholder="e.g., Senior Mathematics Teacher"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Languages">Languages</SelectItem>
                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Physical Education">Physical Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Experience (Years) *</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: Number(e.target.value) }))}
                  placeholder="Years of experience"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary *</Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData(prev => ({ ...prev, salary: Number(e.target.value) }))}
                  placeholder="Monthly salary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date *</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, joiningDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Academic Information</h3>
            
            {/* Subjects */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <Label>Subjects</Label>
                <Button type="button" size="sm" onClick={() => addArrayItem('subjects')}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {formData.subjects.map((subject, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={subject}
                    onChange={(e) => updateArrayItem('subjects', index, e.target.value)}
                    placeholder="e.g., Mathematics"
                    className="flex-1"
                  />
                  <Button type="button" size="sm" variant="outline" onClick={() => removeArrayItem('subjects', index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Qualifications */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <Label>Qualifications</Label>
                <Button type="button" size="sm" onClick={() => addArrayItem('qualifications')}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {formData.qualifications.map((qualification, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={qualification}
                    onChange={(e) => updateArrayItem('qualifications', index, e.target.value)}
                    placeholder="e.g., MSc Mathematics"
                    className="flex-1"
                  />
                  <Button type="button" size="sm" variant="outline" onClick={() => removeArrayItem('qualifications', index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <Label>Certifications</Label>
                <Button type="button" size="sm" onClick={() => addArrayItem('certifications')}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {formData.certifications.map((certification, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={certification}
                    onChange={(e) => updateArrayItem('certifications', index, e.target.value)}
                    placeholder="e.g., Cambridge Certified Educator"
                    className="flex-1"
                  />
                  <Button type="button" size="sm" variant="outline" onClick={() => removeArrayItem('certifications', index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Specializations */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Specializations</Label>
                <Button type="button" size="sm" onClick={() => addArrayItem('specializations')}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {formData.specializations.map((specialization, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={specialization}
                    onChange={(e) => updateArrayItem('specializations', index, e.target.value)}
                    placeholder="e.g., O/A Level Mathematics"
                    className="flex-1"
                  />
                  <Button type="button" size="sm" variant="outline" onClick={() => removeArrayItem('specializations', index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-900">Skills & Proficiency</h3>
              <Button type="button" size="sm" onClick={addSkill}>
                <Plus className="h-4 w-4 mr-1" /> Add Skill
              </Button>
            </div>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <Input
                  value={skill.skillName}
                  onChange={(e) => updateSkill(index, 'skillName', e.target.value)}
                  placeholder="Skill name"
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.proficiency}
                  onChange={(e) => updateSkill(index, 'proficiency', Number(e.target.value))}
                  placeholder="Proficiency %"
                />
                <Button type="button" size="sm" variant="outline" onClick={() => removeSkill(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Achievements</Label>
              <Button type="button" size="sm" onClick={() => addArrayItem('achievements')}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={achievement}
                  onChange={(e) => updateArrayItem('achievements', index, e.target.value)}
                  placeholder="e.g., Best Teacher Award 2022"
                  className="flex-1"
                />
                <Button type="button" size="sm" variant="outline" onClick={() => removeArrayItem('achievements', index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Teaching Philosophy */}
          <div className="space-y-2">
            <Label htmlFor="philosophy">Teaching Philosophy</Label>
            <textarea
              id="philosophy"
              value={formData.philosophy}
              onChange={(e) => setFormData(prev => ({ ...prev, philosophy: e.target.value }))}
              placeholder="Share your teaching philosophy..."
              className="w-full p-3 border rounded-md resize-none"
              rows={3}
            />
          </div>

          {/* Testimonials */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-yellow-900">Testimonials</h3>
              <Button type="button" size="sm" onClick={addTestimonial}>
                <Plus className="h-4 w-4 mr-1" /> Add Testimonial
              </Button>
            </div>
            {formData.testimonials.map((testimonial, index) => (
              <div key={index} className="space-y-2 mb-4 p-3 bg-white rounded border">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={testimonial.author}
                    onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                    placeholder="Author name"
                  />
                  <Select value={testimonial.relation} onValueChange={(value) => updateTestimonial(index, 'relation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Colleague">Colleague</SelectItem>
                      <SelectItem value="Principal">Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <textarea
                  value={testimonial.feedback}
                  onChange={(e) => updateTestimonial(index, 'feedback', e.target.value)}
                  placeholder="Testimonial feedback..."
                  className="w-full p-2 border rounded-md resize-none"
                  rows={2}
                />
                <Button type="button" size="sm" variant="outline" onClick={() => removeTestimonial(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
            {isSubmitting ? "Adding..." : "Add Teacher"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
