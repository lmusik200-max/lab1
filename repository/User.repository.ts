import { UserResponseDto } from "../dto/User.dto";

let users: UserResponseDto[] = [];

export const UserRepository = {
  findAll: () => users,
  
  findById: (id: string) => users.find(u => u.id === id),
  
  create: (user: UserResponseDto) => {
    users.push(user);
    return user;
  },
  
  update: (id: string, updatedData: Partial<UserResponseDto>) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updatedData };
    return users[index];
  },
  
  delete: (id: string) => {
    const initialLength = users.length;
    users = users.filter(u => u.id !== id);
    return users.length < initialLength;
  }
};