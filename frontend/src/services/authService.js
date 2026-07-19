import { apiService } from './api'

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await apiService.post('/auth/login', credentials)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión')
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await apiService.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario')
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      const response = await apiService.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      throw new Error('Token inválido')
    }
  },

  // Logout
  logout: async () => {
    try {
      await apiService.post('/auth/logout')
      localStorage.removeItem('token')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await apiService.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al enviar correo')
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiService.post('/auth/reset-password', {
        token,
        password: newPassword
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al restablecer contraseña')
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiService.post('/auth/change-password', {
        currentPassword,
        newPassword
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al cambiar contraseña')
    }
  },

  // Update profile
  updateProfile: async (userData) => {
    try {
      const response = await apiService.put('/auth/profile', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar perfil')
    }
  }
}
