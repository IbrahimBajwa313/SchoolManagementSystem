// Authentication and authorization utilities
export interface User {
  _id: string
  email: string
  role: 'admin' | 'teacher' | 'parent' | 'student'
  firstName: string
  lastName: string
  employeeId?: string
  department?: string
}

export interface AuthContext {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isTeacher: boolean
  isParent: boolean
  isStudent: boolean
}

// Mock authentication - in real app, this would integrate with your auth system
export function getCurrentUser(): User | null {
  // This would typically get user from session/JWT token
  // For demo purposes, returning a mock teacher
  return {
    _id: "teacher123",
    email: "sarah.johnson@school.edu",
    role: "teacher",
    firstName: "Sarah",
    lastName: "Johnson",
    employeeId: "EMP001",
    department: "Mathematics"
  }
}

export function getAuthContext(): AuthContext {
  const user = getCurrentUser()
  
  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isParent: user?.role === 'parent',
    isStudent: user?.role === 'student'
  }
}

// Check if user has permission to access attendance for a specific class
export async function canAccessClassAttendance(userId: string, classId: string): Promise<boolean> {
  const user = getCurrentUser()
  
  if (!user) return false
  
  // Admins can access all classes
  if (user.role === 'admin') return true
  
  // Teachers can only access classes where they are the incharge
  if (user.role === 'teacher') {
    try {
      const response = await fetch(`/api/classes`)
      const data = await response.json()
      if (data.success) {
        const targetClass = data.data.find((cls: any) => cls._id === classId)
        return targetClass && targetClass.classIncharge === userId
      }
      return false
    } catch (error) {
      console.error('Error checking class access:', error)
      return false
    }
  }
  
  return false
}

// Middleware function to check authentication
export function requireAuth(handler: Function) {
  return async (req: any, res: any) => {
    const user = getCurrentUser()
    
    if (!user) {
      return Response.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }
    
    // Add user to request context
    req.user = user
    return handler(req, res)
  }
}

// Middleware function to check admin role
export function requireAdmin(handler: Function) {
  return async (req: any, res: any) => {
    const user = getCurrentUser()
    
    if (!user || user.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }
    
    req.user = user
    return handler(req, res)
  }
}

// Middleware function to check teacher role
export function requireTeacher(handler: Function) {
  return async (req: any, res: any) => {
    const user = getCurrentUser()
    
    if (!user || user.role !== 'teacher') {
      return Response.json(
        { success: false, message: 'Teacher access required' },
        { status: 403 }
      )
    }
    
    req.user = user
    return handler(req, res)
  }
}

// Get classes accessible by current user
export async function getAccessibleClasses(userId: string): Promise<string[]> {
  const user = getCurrentUser()
  
  if (!user) return []
  
  // Admins can access all classes
  if (user.role === 'admin') {
    try {
      const response = await fetch('/api/classes')
      const data = await response.json()
      return data.success ? data.data.map((cls: any) => cls._id) : []
    } catch (error) {
      console.error('Error fetching all classes:', error)
      return []
    }
  }
  
  // Teachers can only access classes where they are the incharge
  if (user.role === 'teacher') {
    try {
      const response = await fetch('/api/classes')
      const data = await response.json()
      if (data.success) {
        // Filter classes where this teacher is the incharge
        const teacherClasses = data.data.filter((cls: any) => cls.classIncharge === userId)
        return teacherClasses.map((cls: any) => cls._id)
      }
      return []
    } catch (error) {
      console.error('Error fetching teacher classes:', error)
      return []
    }
  }
  
  return []
}
