import { Router } from "express";
import { CourseController } from "../controller/course.controller";

const router = Router();

router.get("/", CourseController.getAll);
router.get("/:id", CourseController.getById);
router.post("/", CourseController.create);
router.put("/:id", CourseController.update);
router.delete("/:id", CourseController.delete);

export default router;