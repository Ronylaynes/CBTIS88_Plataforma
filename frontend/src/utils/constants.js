// Application Constants

export const APP_NAME = 'CBTIS No. 88'
export const APP_DESCRIPTION = 'Centro de Bachillerato Tecnológico Industrial y de Servicios No. 88'

// API
export const API_TIMEOUT = 10000

// Specialties
export const ESPECIALIDADES = [
  { id: 1, value: 'programacion', label: 'Programación' },
  { id: 2, value: 'electronica', label: 'Electrónica' },
  { id: 3, value: 'administracion', label: 'Administración de Recursos Humanos' },
  { id: 4, value: 'contabilidad', label: 'Contabilidad' },
  { id: 5, value: 'mecatronica', label: 'Mecatrónica' }
]

// Status
export const PREFICHA_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

export const PAYMENT_METHODS = {
  TRANSFER: 'transferencia',
  CASH: 'ventanilla'
}

// Validation
export const VALIDATION_RULES = {
  CURP: {
    pattern: /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/,
    length: 18
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PHONE: {
    pattern: /^[0-9]{10}$/,
    length: 10
  },
  POSTAL_CODE: {
    pattern: /^[0-9]{5}$/,
    length: 5
  }
}

// Date formats
export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language'
}

// Routes
export const ROUTES = {
  HOME: '/',
  IDENTITY: '/identidad',
  EDUCATION_OFFER: '/oferta-educativa',
  LINKAGE: '/vinculacion',
  PROJECTS: '/proyectos',
  TEACHERS: '/maestros',
  SCHOOL_SERVICES: '/servicios-escolares',
  SERVICES: '/servicios',
  TRANSPARENCY: '/transparencia',
  PREFICHA: '/preficha',
  LOGIN: '/login',
  REGISTER: '/register'
}

// Messages
export const MESSAGES = {
  SUCCESS: {
    PREFICHA_CREATED: 'Preficha creada exitosamente',
    PROFILE_UPDATED: 'Perfil actualizado correctamente',
    PASSWORD_CHANGED: 'Contraseña cambiada exitosamente'
  },
  ERROR: {
    NETWORK: 'Error de conexión. Verifica tu internet.',
    GENERIC: 'Ocurrió un error. Intenta nuevamente.',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
    NOT_FOUND: 'Recurso no encontrado.'
  }
}

// Contact Info
export const CONTACT_INFO = {
  EMAIL: 'contacto@cbtis88.edu.mx',
  PHONE: '(962) 123-4567',
  ADDRESS: 'Calle Principal #123, Tapachula, Chiapas, México',
  POSTAL_CODE: '30700',
  OFFICE_HOURS: 'Lunes a Viernes: 8:00 AM - 3:00 PM'
}

// Social Media
export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/cbtis88',
  TWITTER: 'https://twitter.com/cbtis88',
  INSTAGRAM: 'https://instagram.com/cbtis88',
  YOUTUBE: 'https://youtube.com/cbtis88'
}

// Bank Info
export const BANK_INFO = {
  BANK_NAME: 'Bancomer',
  ACCOUNT_NUMBER: '0123456789',
  CLABE: '012345678901234567',
  BENEFICIARY: 'CBTIS No. 88'
}

// Semesters
export const SEMESTERS = [1, 2, 3, 4, 5, 6]

// Academic Periods
export const ACADEMIC_PERIODS = {
  FALL: 'Agosto - Diciembre',
  SPRING: 'Enero - Junio'
}