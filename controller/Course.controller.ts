// src/controllers/course.controller.ts
import { Request, Response, NextFunction } from "express";
import { CourseService } from "../service/course.service";

export const CourseController = {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try {
      const level = req.query.level as string;
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
      
      const result = CourseService.getAll(level, page, pageSize);
      res.status(200).json(result);
    } catch (error) { next(error); }
  },

  getById: (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = CourseService.getById(req.params.id as string);
      res.status(200).json(course);
    } catch (error) { next(error); }
  },

  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCourse = CourseService.create(req.body);
      res.status(201).json(newCourse); // 201 Created [cite: 220-224]
    } catch (error) { next(error); }
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedCourse = CourseService.update(req.params.id as string, req.body);
      res.status(200).json(updatedCourse);
    } catch (error) { next(error); }
  },

  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
     CourseService.delete(req.params.id as string);
      res.status(204).send(); // 204 No Content [cite: 225-229]
    } catch (error) { next(error); }
  }
};