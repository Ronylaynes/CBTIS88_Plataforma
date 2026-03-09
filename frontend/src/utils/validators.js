import { VALIDATION_RULES } from './constants'

// Email validation
export const validateEmail = (email) => {
  if (!email) return 'El correo electrónico es requerido'
  if (!VALIDATION_RULES.EMAIL.pattern.test(email)) {
    return 'Correo electrónico inválido'
  }
  return null
}

// CURP validation
export const validateCURP = (curp) => {
  if (!curp) return 'El CURP es requerido'
  if (curp.length !== VALIDATION_RULES.CURP.length) {
    return 'El CURP debe tener 18 caracteres'
  }
  if (!VALIDATION_RULES.CURP.pattern.test(curp)) {
    return 'Formato de CURP inválido'
  }
  return null
}

// Phone validation
export const validatePhone = (phone) => {
  if (!phone) return 'El teléfono es requerido'
  if (!VALIDATION_RULES.PHONE.pattern.test(phone)) {
    return 'El teléfono debe tener 10 dígitos'
  }
  return null
}

// Postal code validation
export const validatePostalCode = (code) => {
  if (!code) return 'El código postal es requerido'
  if (!VALIDATION_RULES.POSTAL_CODE.pattern.test(code)) {
    return 'Código postal inválido (5 dígitos)'
  }
  return null
}

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'La contraseña es requerida'
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres'
  }
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe contener al menos una mayúscula'
  }
  if (!/[a-z]/.test(password)) {
    return 'La contraseña debe contener al menos una minúscula'
  }
  if (!/[0-9]/.test(password)) {
    return 'La contraseña debe contener al menos un número'
  }
  return null
}

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Confirma tu contraseña'
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden'
  }
  return null
}

// Required field validation
export const validateRequired = (value, fieldName = 'Este campo') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} es requerido`
  }
  return null
}

// Min length validation
export const validateMinLength = (value, minLength, fieldName = 'Este campo') => {
  if (value && value.length < minLength) {
    return `${fieldName} debe tener al menos ${minLength} caracteres`
  }
  return null
}

// Max length validation
export const validateMaxLength = (value, maxLength, fieldName = 'Este campo') => {
  if (value && value.length > maxLength) {
    return `${fieldName} no puede exceder ${maxLength} caracteres`
  }
  return null
}

// Number validation
export const validateNumber = (value, fieldName = 'Este campo') => {
  if (value && isNaN(value)) {
    return `${fieldName} debe ser un número`
  }
  return null
}

// Min value validation
export const validateMin = (value, min, fieldName = 'Este campo') => {
  if (value && parseFloat(value) < min) {
    return `${fieldName} debe ser mayor o igual a ${min}`
  }
  return null
}

// Max value validation
export const validateMax = (value, max, fieldName = 'Este campo') => {
  if (value && parseFloat(value) > max) {
    return `${fieldName} debe ser menor o igual a ${max}`
  }
  return null
}

// Age validation
export const validateAge = (birthDate, minAge = 14, maxAge = 20) => {
  if (!birthDate) return 'La fecha de nacimiento es requerida'
  
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  if (age < minAge) {
    return `Debes tener al menos ${minAge} años`
  }
  if (age > maxAge) {
    return `Debes tener máximo ${maxAge} años`
  }
  return null
}

// File validation
export const validateFile = (file, maxSize, allowedTypes) => {
  if (!file) return 'El archivo es requerido'
  
  if (maxSize && file.size > maxSize) {
    return `El archivo no debe exceder ${maxSize / (1024 * 1024)}MB`
  }
  
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return 'Tipo de archivo no permitido'
  }
  
  return null
}

// URL validation
export const validateURL = (url) => {
  if (!url) return null
  
  try {
    new URL(url)
    return null
  } catch {
    return 'URL inválida'
  }
}

// Promedio validation (6.0 - 10.0)
export const validatePromedio = (promedio) => {
  if (!promedio) return 'El promedio es requerido'
  const num = parseFloat(promedio)
  if (isNaN(num) || num < 6 || num > 10) {
    return 'El promedio debe estar entre 6.0 y 10.0'
  }
  return null
}