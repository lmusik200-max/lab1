import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/User.service";

export const UserController = {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = UserService.getAll();
      res.status(200).json(result);
    } catch (error) { next(error); }
  },

  getById: (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = UserService.getById(req.params.id as string);
      res.status(200).json(user);
    } catch (error) { next(error); }
  },

  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = UserService.create(req.body);
      res.status(201).json(newUser); // 201 Created [cite: 220-224]
    } catch (error) { next(error); }
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = UserService.update(req.params.id as string, req.body);
      res.status(200).json(updatedUser);
    } catch (error) { next(error); }
  },

  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      UserService.delete(req.params.id as string);
      res.status(204).send(); // 204 No Content [cite: 225-229]
    } catch (error) { next(error); }
  }
};