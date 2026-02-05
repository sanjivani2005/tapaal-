import { apiService } from './api-service.js';

class UserService {
  // Get all users
  async getUsers() {
    return apiService.getUsers();
  }

  // Get single user by ID
  async getUser(id) {
    return apiService.getUser(id);
  }

  // Create new user
  async createUser(userData) {
    return apiService.createUser(userData);
  }

  // Update user
  async updateUser(id, userData) {
    return apiService.updateUser(id, userData);
  }

  // Delete user
  async deleteUser(id) {
    return apiService.deleteUser(id);
  }
}

export const userService = new UserService();
