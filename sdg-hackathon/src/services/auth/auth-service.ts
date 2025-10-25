import { findUserByEmail, findUserById } from '@/data/users';
import { User } from '@/types/user';

/**
 * Authentication service for handling user login, registration, and session management
 */
export const AuthService = {
  /**
   * Authenticate a user with email and password
   * @param email User's email
   * @param password User's password (plain text for demo purposes)
   * @returns Object containing success status and user data if successful
   */
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> => {
    try {
      // In a real app, this would make an API call to a backend service
      const user = findUserByEmail(email);
      
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      
      if (user.password !== password) {
        return { success: false, message: 'Invalid password' };
      }
      
      // Remove password from user object before returning
      const { password: _, ...userWithoutPassword } = user;
      
      return { 
        success: true, 
        user: userWithoutPassword as User 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'An error occurred during login' 
      };
    }
  },
  
  /**
   * Get user data by ID
   * @param userId User's ID
   * @returns User data if found
   */
  getUserById: async (userId: string): Promise<User | null> => {
    try {
      // In a real app, this would make an API call to a backend service
      const user = findUserById(userId);
      
      if (!user) {
        return null;
      }
      
      // Remove password from user object before returning
      const { password: _, ...userWithoutPassword } = user;
      
      return userWithoutPassword as User;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }
};
