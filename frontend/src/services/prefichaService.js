import { apiService } from './api'

export const prefichaService = {
  // Create preficha
  createPreficha: async (prefichaData) => {
    try {
      const response = await apiService.post('/prefichas', prefichaData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear preficha')
    }
  },

  // Get preficha by ID
  getPrefichaById: async (id) => {
    try {
      const response = await apiService.get(`/prefichas/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener preficha')
    }
  },

  // Get preficha by folio
  getPrefichaByFolio: async (folio) => {
    try {
      const response = await apiService.get(`/prefichas/folio/${folio}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Preficha no encontrada')
    }
  },

  // Get all prefichas (admin)
  getAllPrefichas: async (filters = {}) => {
    try {
      const response = await apiService.get('/prefichas', { params: filters })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener prefichas')
    }
  },

  // Update preficha
  updatePreficha: async (id, prefichaData) => {
    try {
      const response = await apiService.put(`/prefichas/${id}`, prefichaData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar preficha')
    }
  },

  // Delete preficha
  deletePreficha: async (id) => {
    try {
      const response = await apiService.delete(`/prefichas/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar preficha')
    }
  },

  // Update payment status
  updatePaymentStatus: async (id, paymentData) => {
    try {
      const response = await apiService.patch(`/prefichas/${id}/payment`, paymentData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar pago')
    }
  },

  // Upload payment proof
  uploadPaymentProof: async (id, file) => {
    try {
      const formData = new FormData()
      formData.append('paymentProof', file)
      
      const response = await apiService.post(`/prefichas/${id}/payment-proof`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al subir comprobante')
    }
  },

  // Get statistics
  getStatistics: async () => {
    try {
      const response = await apiService.get('/prefichas/statistics')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener estadísticas')
    }
  },

  // Validate CURP
  validateCURP: async (curp) => {
    try {
      const response = await apiService.post('/prefichas/validate-curp', { curp })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'CURP inválido')
    }
  }
}