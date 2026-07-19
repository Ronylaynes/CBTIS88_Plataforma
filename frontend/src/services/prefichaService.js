import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor — agrega token JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor — manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ── Prefichas ──────────────────────────────────────────────
export const prefichaService = {
  createPreficha: async (payload) => {
    const { data } = await api.post('/api/prefichas', payload)
    return data
  },
}

// ── Reporte genérico ───────────────────────────────────────
export const obtenerReportePrefichas = async () => {
  const { data } = await api.get('/api/prefichas/reporte')
  return data
}

export const descargarReporte = async (formato) => {
  const mimeTypes = {
    excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf:   'application/pdf',
    csv:   'text/csv',
  }
  const response = await api.get(`/api/prefichas/reporte/${formato}`, {
    responseType: 'blob',
  })
  const url  = window.URL.createObjectURL(
    new Blob([response.data], { type: mimeTypes[formato] })
  )
  const link = document.createElement('a')
  link.href  = url
  link.setAttribute('download',
    `reporte_prefichas.${formato === 'excel' ? 'xlsx' : formato}`)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

// ── Foto ───────────────────────────────────────────────────
export const guardarFoto = async (prefichaId, fotoBase64) => {
  const { data } = await api.post(`/api/prefichas/${prefichaId}/foto`, {
    foto_base64: fotoBase64,
  })
  return data
}

export const obtenerFoto = async (prefichaId) => {
  const { data } = await api.get(`/api/prefichas/${prefichaId}/foto`)
  return data.foto_base64
}

// ════════════════════════════════════════════════════════════
//  NUEVO — Descargar relación de aspirantes en Excel
//  Solo admin y servicios_escolares
// ════════════════════════════════════════════════════════════
export const descargarExcelAspirantes = async () => {
  const response = await api.get('/api/prefichas/reporte/excel', {
    responseType: 'blob',
  })

  const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const url   = window.URL.createObjectURL(
    new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
  )
  const link  = document.createElement('a')
  link.href   = url
  link.setAttribute('download', `relacion_aspirantes_${fecha}.xlsx`)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
