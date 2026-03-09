import { useState } from 'react'
import FormSteps from './FormSteps'
import PersonalDataSection from './PersonalDataSection'
import ContactSection from './ContactSection'
import AcademicOptionsSection from './AcademicOptionsSection'
import PaymentMethodSection from './PaymentMethodSection'

const PrefichaForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Datos Personales
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombre: '',
    edad: '',
    sexo: '',
    curp: '',
    fechaNacimiento: { dia: '', mes: '', año: '' },
    lugarNacimiento: '',
    estadoNacimiento: '',
    // Datos de Contacto
    domicilio: '',
    colonia: '',
    codigoPostal: '',
    correoElectronico: '',
    telefonoTutor: '',
    telefonoAlumno: '',
    escuelaProcedencia: '',
    promedioAproximado: '',
    // Opciones Académicas
    opcion1: '',
    opcion1Especialidad: '',
    opcion2: '',
    opcion3: '',
    // Método de Pago
    metodoPago: 'transferencia'
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    alert('¡Solicitud de preficha enviada exitosamente!')
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-500 mb-4">
            SOLICITUD DE PREFICHA
          </h1>
          <div className="bg-gold-100 text-gold-800 p-4 rounded-lg inline-block">
            <p className="font-medium">FOLIO: [AUTO]</p>
            <p className="text-sm">FECHA: {new Date().toLocaleDateString()}</p>
            <p className="text-sm">HORA: {new Date().toLocaleTimeString()}</p>
            <p className="text-sm">FICHA: [AUTO]</p>
          </div>
        </div>

        <FormSteps currentStep={currentStep} />

        <form onSubmit={handleSubmit} className="card mt-8">
          {currentStep === 1 && (
            <PersonalDataSection formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <ContactSection formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && (
            <AcademicOptionsSection formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && (
            <PaymentMethodSection formData={formData} updateFormData={updateFormData} />
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn-outline"
              >
                Anterior
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary ml-auto"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                className="btn-secondary ml-auto"
              >
                ENVIAR SOLICITUD
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default PrefichaForm