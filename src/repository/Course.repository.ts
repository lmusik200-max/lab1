import { CourseResponseDto } from "../dto/Course.dto";

let courses: CourseResponseDto[] = [];

export const CourseRepository = {
  findAll: () => courses,
  
  findById: (id: string) => courses.find(c => c.id === id),
  
  create: (course: CourseResponseDto) => {
    courses.push(course);
    return course;
  },
  
  update: (id: string, updatedData: Partial<CourseResponseDto>) => {
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    courses[index] = { ...courses[index], ...updatedData };
    return courses[index];
  },
  
  delete: (id: string) => {
    const initialLength = courses.length;
    courses = courses.filter(c => c.id !== id);
    return courses.length < initialLength;
  }
};