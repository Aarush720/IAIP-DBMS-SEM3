import { User, Course, Assessment, AttendanceSummary, Student, Faculty, AttendanceRecord, MarkSheet } from '../types';
import * as mockData from './mockData';

const FAKE_DELAY = 300; // ms

// Helper function to simulate network delay
const mockRequest = <T>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Deep copy to prevent state mutation issues if components modify data
            resolve(JSON.parse(JSON.stringify(data))); 
        }, FAKE_DELAY);
    });
};

const mockRequestFail = (message: string) => {
    return new Promise<never>((_, reject) => {
        setTimeout(() => {
            reject(new Error(message));
        }, FAKE_DELAY);
    });
};

export const login = (email: string, password: string): Promise<{ token: string, user: User }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (user && password === 'password') {
                const token = `mock-token-for-${user.id}-${Date.now()}`;
                sessionStorage.setItem('mockUserEmail', user.email); // Store email for getMe mock
                
                let augmentedUser: User = { ...user };
                if (user.role === 'Student') {
                    // FIX: Changed mockData.students to mockData.getStudents()
                    const student = mockData.getStudents().find(s => s.name === user.name);
                    if (student) augmentedUser.studentId = student.id;
                } else if (user.role === 'Faculty') {
                    const faculty = mockData.faculty.find(f => f.name === user.name);
                    if (faculty) augmentedUser.facultyId = faculty.id;
                }

                console.log("Mock login successful for:", user.name);
                resolve({ token, user: augmentedUser });
            } else {
                console.error("Mock login failed for email:", email);
                reject(new Error('Invalid credentials'));
            }
        }, FAKE_DELAY + 200); // login takes a bit longer
    });
};

export const logout = (): Promise<{ message: string }> => {
    console.log("Mock logout");
    sessionStorage.removeItem('mockUserEmail');
    return mockRequest({ message: 'Logged out successfully' });
};

export const getMe = (): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const email = sessionStorage.getItem('mockUserEmail');
            if (email) {
                const user = mockData.users.find(u => u.email === email);
                if (user) {
                    let augmentedUser: User = { ...user };
                    if (user.role === 'Student') {
                        // FIX: Changed mockData.students to mockData.getStudents()
                        const student = mockData.getStudents().find(s => s.name === user.name);
                        if (student) augmentedUser.studentId = student.id;
                    } else if (user.role === 'Faculty') {
                        const faculty = mockData.faculty.find(f => f.name === user.name);
                        if (faculty) augmentedUser.facultyId = faculty.id;
                    }
                    console.log("Mock getMe success for:", user.name);
                    resolve(augmentedUser);
                    return;
                }
            }
            console.log("Mock getMe failed: no session found");
            reject(new Error("No active session"));
        }, FAKE_DELAY);
    });
};

// FIX: Changed mockData.students to mockData.getStudents()
export const getStudents = (): Promise<Student[]> => mockRequest(mockData.getStudents());

export const getStudentsByCourse = (courseId: string): Promise<Student[]> => mockRequest(mockData.getStudentsByCourse(courseId));

export const getFaculty = (): Promise<Faculty[]> => mockRequest(mockData.faculty);

export const getCourses = (): Promise<Course[]> => mockRequest(mockData.courses);

export const getCoursesForStudent = (studentId: string): Promise<Course[]> => {
    return mockRequest(mockData.getCoursesForStudent(studentId));
};

export const getCoursesForFaculty = (facultyId: number): Promise<Course[]> => {
    return mockRequest(mockData.getCoursesForFaculty(facultyId));
};

export const getCoursesByDepartment = (department: string): Promise<Course[]> => mockRequest(mockData.getCoursesByDepartment(department));

export const getDashboardKpis = () => mockRequest(mockData.getDashboardKpis());

export const getAdminUsers = (): Promise<User[]> => mockRequest(mockData.users);

export const getAnalyticsData = () => mockRequest(mockData.getAnalyticsData());

export const getAssessments = (courseId: string): Promise<Assessment[]> => {
    console.log(`Fetching mock assessments for course ${courseId}`);
    return mockRequest(mockData.getAssessmentsByCourse(courseId));
};

export const updateAssessmentScore = (data: { studentId: string; assessmentId: number; score: number | null }): Promise<{success: boolean}> => {
    console.log("Mock updating assessment score:", data);
    return mockRequest({ success: true });
};

export const getAttendanceSummary = (courseId: string): Promise<AttendanceSummary[]> => {
    console.log(`Fetching mock attendance for course ${courseId}`);
    return mockRequest(mockData.getAttendanceSummaryByCourse(courseId));
};

export const getDailyAttendance = (courseId: string, studentId: string): Promise<AttendanceRecord[]> => {
    console.log(`Fetching mock daily attendance for student ${studentId} in course ${courseId}`);
    return mockRequest(mockData.getDailyAttendance(courseId, studentId));
};

export const getDailyAttendanceForCourse = (courseId: string, year: number, month: number) => {
    console.log(`Fetching mock daily attendance for course ${courseId}`);
    return mockRequest(mockData.getDailyAttendanceForCourse(courseId, year, month));
}

export const updateAttendance = (courseId: string, studentId: string, date: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    console.log(`Mock updating attendance for ${studentId} on ${date} to ${status}`);
    return mockRequest(mockData.updateAttendance(courseId, studentId, date, status));
}


export const addCourse = (courseData: Omit<Course, 'id'>): Promise<Course> => {
    console.log("Mock adding course:", courseData);
    try {
        const newCourse = mockData.addCourse(courseData);
        return mockRequest(newCourse);
    } catch(e) {
        return mockRequestFail((e as Error).message);
    }
}

export const addAssessment = (courseId: string, assessmentData: { title: string, type: string, maxScore: number }): Promise<Assessment> => {
    console.log("Mock adding assessment:", assessmentData);
    try {
      const newAssessment = mockData.addAssessment(courseId, assessmentData);
      return mockRequest(newAssessment);
    } catch (e) {
      return mockRequestFail((e as Error).message);
    }
}

export const removeCourse = (courseId: string): Promise<{ success: boolean }> => {
    console.log(`Mock removing course ${courseId}`);
    try {
        const result = mockData.removeCourse(courseId);
        return mockRequest(result);
    } catch (e) {
        return mockRequestFail((e as Error).message);
    }
};

export const addFaculty = (facultyData: Omit<Faculty, 'id' | 'avatar'>): Promise<Faculty> => {
    console.log("Mock adding faculty:", facultyData);
    try {
        const newFaculty = mockData.addFaculty(facultyData);
        return mockRequest(newFaculty);
    } catch (e) {
        return mockRequestFail((e as Error).message);
    }
};

export const removeFaculty = (facultyId: number): Promise<{ success: boolean }> => {
    console.log(`Mock removing faculty ${facultyId}`);
    try {
        const result = mockData.removeFaculty(facultyId);
        return mockRequest(result);
    } catch (e) {
        return mockRequestFail((e as Error).message);
    }
};

export const getSemestersForStudent = (studentId: string): Promise<string[]> => {
    return mockRequest(mockData.getSemestersForStudent(studentId));
};

export const getMarkSheet = (studentId: string, semester: string): Promise<MarkSheet> => {
    try {
        const data = mockData.generateMarkSheetData(studentId, semester);
        return mockRequest(data);
    } catch (e) {
        return mockRequestFail((e as Error).message);
    }
};
