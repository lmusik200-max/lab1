import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repository/User.repository";
import { CreateUserRequestDto, UpdateUserRequestDto } from "../dto/User.dto";
import { ApiError } from "../utils/ApiError";

export const UserService = {
  getAll: () => {
    
    const result = UserRepository.findAll();
    return {
      items: result,
      total: result.length
    };
  },

  getById: (id: string) => {
    const user = UserRepository.findById(id);
    if (!user) throw new ApiError(404, "NOT_FOUND", "User not found");
    return user;
  },

  create: (dto: CreateUserRequestDto) => {
    
    if (!dto.name || dto.name.length < 2) {
      throw new ApiError(400, "VALIDATION_ERROR", "Name is required and must be >= 2 chars");
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError(400, "VALIDATION_ERROR", "A valid email is required");
    }

    const newUser = {
      id: uuidv4(),
      name: dto.name,
      email: dto.email,
      createdAt: new Date().toISOString()
    };
    
    return UserRepository.create(newUser);
  },

  update: (id: string, dto: UpdateUserRequestDto) => {
    const user = UserRepository.findById(id);
    if (!user) throw new ApiError(404, "NOT_FOUND", "User not found");

    if (dto.email && !dto.email.includes("@")) {
        throw new ApiError(400, "VALIDATION_ERROR", "A valid email is required");
    }

    return UserRepository.update(id, dto);
  },

  delete: (id: string) => {
    const deleted = UserRepository.delete(id);
    if (!deleted) throw new ApiError(404, "NOT_FOUND", "User not found");
  }
};