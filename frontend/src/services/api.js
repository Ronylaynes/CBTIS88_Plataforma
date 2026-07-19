// frontend/src/services/api.js
import axios from 'axios'

// En desarrollo usa el proxy de Vite (/api → localhost:5000)
// En producción usa la variable de entorno
const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// ── Interceptor de peticiones — agrega el token JWT ──────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Interceptor de respuestas — manejo de errores ────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expirado o inválido — limpiar sesión
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = '/login'
          break
        case 403:
          console.error('Sin permisos para esta acción')
          break
        case 404:
          console.error('Recurso no encontrado')
          break
        case 500:
          console.error('Error interno del servidor')
          break
        default:
          console.error('Error de API:', error.response.data)
      }
    } else if (error.request) {
      console.error('Sin respuesta del servidor — ¿está corriendo Flask?')
    } else {
      console.error('Error de configuración:', error.message)
    }
    return Promise.reject(error)
  }
)

// ── Métodos de la API ────────────────────────────────────────
export const apiService = {
  get:    (url, config = {})       => api.get(url, config),
  post:   (url, data, config = {}) => api.post(url, data, config),
  put:    (url, data, config = {}) => api.put(url, data, config),
  patch:  (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {})       => api.delete(url, config),

  // Subir archivos/imágenes (multipart/form-data)
  upload: (url, formData, config = {}) =>
    api.post(url, formData, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Descargar archivos (Excel, PDF)
  download: (url, params = {}) =>
    api.get(url, { params, responseType: 'blob' }),
}

export default api