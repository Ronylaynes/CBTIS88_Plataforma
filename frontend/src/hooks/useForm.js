import { useState } from 'react'

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Clear error when field changes
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validate on blur
    if (validationRules[name]) {
      validateField(name, values[name])
    }
  }

  const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName]
    if (!rules) return true

    let error = null

    if (rules.required && !value) {
      error = rules.message || 'Este campo es requerido'
    } else if (rules.pattern && value && !rules.pattern.test(value)) {
      error = rules.patternMessage || 'Formato inválido'
    } else if (rules.minLength && value && value.length < rules.minLength) {
      error = `Mínimo ${rules.minLength} caracteres`
    } else if (rules.maxLength && value && value.length > rules.maxLength) {
      error = `Máximo ${rules.maxLength} caracteres`
    } else if (rules.min && value && parseFloat(value) < rules.min) {
      error = `Valor mínimo: ${rules.min}`
    } else if (rules.max && value && parseFloat(value) > rules.max) {
      error = `Valor máximo: ${rules.max}`
    } else if (rules.custom && typeof rules.custom === 'function') {
      error = rules.custom(value, values)
    }

    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }))
      return false
    }

    return true
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach(fieldName => {
      if (!validateField(fieldName, values[fieldName])) {
        isValid = false
      }
    })

    return isValid
  }

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  const setFieldValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const setFieldError = (name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateForm
  }
}