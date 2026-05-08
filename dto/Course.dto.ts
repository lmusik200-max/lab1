// src/dtos/course.dto.ts

export interface CreateCourseRequestDto {
  title: string;
  description?: string; // Необов'язкове поле
  durationHours: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface UpdateCourseRequestDto {
  title?: string;
  description?: string;
  durationHours?: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
}

export interface CourseResponseDto {
  id: string;
  title: string;
  description?: string;
  durationHours: number;
  level: string;
  createdAt: string;
}