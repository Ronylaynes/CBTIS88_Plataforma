import { apiService } from './api'

export const projectsService = {
  // Get all projects
  getAllProjects: async (filters = {}) => {
    try {
      const response = await apiService.get('/projects', { params: filters })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener proyectos')
    }
  },

  // Get project by ID
  getProjectById: async (id) => {
    try {
      const response = await apiService.get(`/projects/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Proyecto no encontrado')
    }
  },

  // Create project
  createProject: async (projectData) => {
    try {
      const response = await apiService.post('/projects', projectData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear proyecto')
    }
  },

  // Update project
  updateProject: async (id, projectData) => {
    try {
      const response = await apiService.put(`/projects/${id}`, projectData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar proyecto')
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      const response = await apiService.delete(`/projects/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar proyecto')
    }
  },

  // Upload project image
  uploadProjectImage: async (id, file) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await apiService.post(`/projects/${id}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al subir imagen')
    }
  },

  // Get projects by category
  getProjectsByCategory: async (category) => {
    try {
      const response = await apiService.get(`/projects/category/${category}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener proyectos')
    }
  },

  // Get featured projects
  getFeaturedProjects: async () => {
    try {
      const response = await apiService.get('/projects/featured')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener proyectos destacados')
    }
  },

  // Add team member
  addTeamMember: async (projectId, memberData) => {
    try {
      const response = await apiService.post(`/projects/${projectId}/team`, memberData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al agregar miembro')
    }
  },

  // Remove team member
  removeTeamMember: async (projectId, memberId) => {
    try {
      const response = await apiService.delete(`/projects/${projectId}/team/${memberId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar miembro')
    }
  }
}