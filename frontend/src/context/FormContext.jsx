import { createContext, useState } from 'react'

export const FormContext = createContext()

export const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormField = (fieldName, value) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: value
    }))
    
    // Clear error when field is updated
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  const updateMultipleFields = (fields) => {
    setFormState(prev => ({
      ...prev,
      ...fields
    }))
  }

  const setFieldError = (fieldName, error) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))
  }

  const clearErrors = () => {
    setErrors({})
  }

  const resetForm = () => {
    setFormState({})
    setErrors({})
    setIsSubmitting(false)
  }

  const validateForm = (validationRules) => {
    const newErrors = {}
    
    Object.keys(validationRules).forEach(fieldName => {
      const rules = validationRules[fieldName]
      const value = formState[fieldName]
      
      if (rules.required && !value) {
        newErrors[fieldName] = rules.message || 'Este campo es requerido'
      }
      
      if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[fieldName] = rules.patternMessage || 'Formato inválido'
      }
      
      if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[fieldName] = `Mínimo ${rules.minLength} caracteres`
      }
      
      if (rules.maxLength && value && value.length > rules.maxLength) {
        newErrors[fieldName] = `Máximo ${rules.maxLength} caracteres`
      }
      
      if (rules.custom && typeof rules.custom === 'function') {
        const customError = rules.custom(value, formState)
        if (customError) {
          newErrors[fieldName] = customError
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const value = {
    formState,
    errors,
    isSubmitting,
    setIsSubmitting,
    updateFormField,
    updateMultipleFields,
    setFieldError,
    clearErrors,
    resetForm,
    validateForm
  }

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}