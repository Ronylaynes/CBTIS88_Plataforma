// Format date to DD/MM/YYYY
export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

// Format datetime to DD/MM/YYYY HH:mm
export const formatDateTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const dateStr = formatDate(d)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${dateStr} ${hours}:${minutes}`
}

// Format phone number (9621234567 -> (962) 123-4567)
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length !== 10) return phone
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
}

// Format CURP to uppercase and remove spaces
export const formatCURP = (curp) => {
  if (!curp) return ''
  return curp.toUpperCase().replace(/\s/g, '')
}

// Format currency (1234.56 -> $1,234.56)
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '$0.00'
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount)
}

// Format file size (1024 -> 1 KB)
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Format percentage (0.85 -> 85%)
export const formatPercentage = (value, decimals = 0) => {
  if (!value && value !== 0) return '0%'
  return `${(value * 100).toFixed(decimals)}%`
}

// Format name (capitalize first letter of each word)
export const formatName = (name) => {
  if (!name) return ''
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Format FOLIO (123 -> CBTIS88-2024-0123)
export const formatFolio = (number, year = new Date().getFullYear()) => {
  if (!number) return ''
  const paddedNumber = String(number).padStart(4, '0')
  return `CBTIS88-${year}-${paddedNumber}`
}

// Format text to slug (Programación -> programacion)
export const formatSlug = (text) => {
  if (!text) return ''
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Format time ago (returns "hace X minutos/horas/días")
export const formatTimeAgo = (date) => {
  if (!date) return ''
  
  const now = new Date()
  const past = new Date(date)
  const diffMs = now - past
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Justo ahora'
  if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
  
  return formatDate(date)
}

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Format postal code (12345 -> 12345)
export const formatPostalCode = (code) => {
  if (!code) return ''
  return code.replace(/\D/g, '').slice(0, 5)
}

// Format GPA (8.5 -> 8.50)
export const formatGPA = (gpa) => {
  if (!gpa && gpa !== 0) return '0.00'
  return parseFloat(gpa).toFixed(2)
}