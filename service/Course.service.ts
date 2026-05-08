import { v4 as uuidv4 } from "uuid";
import { CourseRepository } from "../repository/Course.repository";
import { CreateCourseRequestDto, UpdateCourseRequestDto } from "../dto/Course.dto";
import { ApiError } from "../utils/ApiError";

export const CourseService = {
  getAll: (level?: string, page: number = 1, pageSize: number = 10) => {
    let result = CourseRepository.findAll();
    
    // Фільтр
    if (level) {
      result = result.filter(c => c.level === level);
    }
    
    // Пагінація
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = result.slice(startIndex, startIndex + pageSize);
    
    return {
      items: paginatedItems,
      total: result.length,
      page,
      pageSize
    };
  },

  getById: (id: string) => {
    const course = CourseRepository.findById(id);
    if (!course) throw new ApiError(404, "NOT_FOUND", "Course not found");
    return course;
  },

  create: (dto: CreateCourseRequestDto) => {
    if (!dto.title || dto.title.length < 3) {
      throw new ApiError(400, "VALIDATION_ERROR", "Title is required and must be >= 3 chars");
    }
    if (dto.durationHours <= 0) {
      throw new ApiError(400, "VALIDATION_ERROR", "Duration must be greater than 0");
    }
    const allowedLevels = ["Beginner", "Intermediate", "Advanced"];
    if (!allowedLevels.includes(dto.level)) {
      throw new ApiError(400, "VALIDATION_ERROR", "Level must be Beginner, Intermediate, or Advanced");
    }

    const newCourse = {
      id: uuidv4(),
      title: dto.title,
      description: dto.description,
      durationHours: dto.durationHours,
      level: dto.level,
      createdAt: new Date().toISOString()
    };
    
    return CourseRepository.create(newCourse);
  },

  update: (id: string, dto: UpdateCourseRequestDto) => {
    const course = CourseRepository.findById(id);
    if (!course) throw new ApiError(404, "NOT_FOUND", "Course not found");

    return CourseRepository.update(id, dto);
  },

  delete: (id: string) => {
    const deleted = CourseRepository.delete(id);
    if (!deleted) throw new ApiError(404, "NOT_FOUND", "Course not found");
  }
};