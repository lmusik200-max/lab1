import express from "express";
import courseRoutes from "./routes/Course.routes";
import userRoutes from "./routes/User.routes";
import { errorHandler } from "./middleware/error.middleware";
import { logger } from "./middleware/logger.middleware";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ 
    error: { 
      code: "NOT_FOUND", 
      message: "Маршрут не знайдено. Перевірте URL та метод запиту." 
    } 
  });
});

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(` Сервер запущено на http://localhost:${PORT}`);
  console.log(` Ресурс Курси: http://localhost:${PORT}/api/courses`);
  console.log(` Ресурс Користувачі: http://localhost:${PORT}/api/users`);
  console.log(`==========================================`);
});