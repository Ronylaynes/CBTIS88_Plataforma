import { useState } from 'react'
import FormSteps from './FormSteps'
import PersonalDataSection from './PersonalDataSection'
import ContactSection from './ContactSection'
import AcademicOptionsSection from './AcademicOptionsSection'
import FotoSection from './FotoSection'
import { prefichaService } from '@services/prefichaService'

const PrefichaForm = () => {
  const [currentStep,    setCurrentStep]    = useState(1)
  const [submitting,     setSubmitting]     = useState(false)
  const [submitError,    setSubmitError]    = useState(null)
  const [submitSuccess,  setSubmitSuccess]  = useState(null)
  const [folioGenerado,  setFolioGenerado]  = useState(null)

  const [formData, setFormData] = useState({
    apellidoPaterno:     '',
    apellidoMaterno:     '',
    nombre:              '',
    edad:                '',
    sexo:                '',
    curp:                '',
    fechaNacimiento:     { dia: '', mes: '', año: '' },
    lugarNacimiento:     '',
    estadoNacimiento:    '',
    domicilio:           '',
    colonia:             '',
    codigoPostal:        '',
    correoElectronico:   '',
    telefonoTutor:       '',
    telefonoAlumno:      '',
    escuelaProcedencia:  '',
    promedioAproximado:  '',
    opcion1:             '',
    opcion1Especialidad: '',
    opcion2:             '',
    opcion3:             '',
    // ✅ metodoPago eliminado
    foto_base64:         null,
  })

  const updateFormData = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  // ✅ Ahora son 4 pasos (sin PaymentMethodSection)
  const handleNext     = () => { if (currentStep < 4) setCurrentStep(s => s + 1) }
  const handlePrevious = () => { if (currentStep > 1) setCurrentStep(s => s - 1) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    if (!formData.foto_base64 || formData.foto_base64 === 'data:,') {
      setSubmitError('Debes agregar tu foto para enviar la solicitud.')
      setSubmitting(false)
      setCurrentStep(4)
      return
    }

    try {
      const payload = {
        apellido_paterno:     formData.apellidoPaterno,
        apellido_materno:     formData.apellidoMaterno,
        nombre:               formData.nombre,
        edad:                 Number(formData.edad),
        sexo:                 formData.sexo,
        curp:                 formData.curp,
        fecha_nacimiento:     `${formData.fechaNacimiento.año}-${String(formData.fechaNacimiento.mes).padStart(2,'0')}-${String(formData.fechaNacimiento.dia).padStart(2,'0')}`,
        lugar_nacimiento:     formData.lugarNacimiento,
        estado_nacimiento:    formData.estadoNacimiento,
        domicilio:            formData.domicilio,
        colonia:              formData.colonia,
        codigo_postal:        formData.codigoPostal,
        correo_electronico:   formData.correoElectronico,
        telefono_tutor:       formData.telefonoTutor,
        telefono_alumno:      formData.telefonoAlumno,
        escuela_procedencia:  formData.escuelaProcedencia,
        promedio_aproximado:  Number(formData.promedioAproximado),
        opcion1:              formData.opcion1,
        opcion1_especialidad: formData.opcion1Especialidad,
        opcion2:              formData.opcion2,
        opcion3:              formData.opcion3,
        // ✅ metodo_pago eliminado del payload
        foto_base64:          formData.foto_base64,
      }
      const result = await prefichaService.createPreficha(payload)
      const folio  = result.preficha?.folio
      setFolioGenerado(folio)
      setSubmitSuccess(`Solicitud enviada exitosamente. Folio: ${folio}`)
      setCurrentStep(1)
    } catch (err) {
      setSubmitError(err.message || 'Error al enviar la solicitud.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDescargarPDF = async () => {
    try {
      const token    = localStorage.getItem('token')
      const response = await fetch(
        `http://localhost:5000/api/prefichas/pdf/${folioGenerado}`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      )
      const blob = await response.blob()
      const url  = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href  = url
      link.setAttribute('download', `preficha_${folioGenerado}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch {
      alert('Error al descargar el PDF. Intenta de nuevo.')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 md:py-12">
      <div className="container-custom max-w-5xl px-4">

        {/* ── Encabezado ── */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full
                            border-4 border-gold-400 overflow-hidden
                            flex items-center justify-center shadow-lg">
              <img
                src="/assets/images/icons/cbtis88.jpg"
                alt="Escudo CBTIS 88"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-xs text-gray-400 tracking-widest
                        uppercase mb-1">
            Secretaría de Educación Pública · DGETI
          </p>
          <p className="text-sm md:text-base font-medium
                        text-gray-600 mb-1">
            Centro de Bachillerato Tecnológico Industrial
            y de Servicios No. 88
          </p>
          {/* ✅ "Vicente Guerrero" debajo del nombre */}
          <p className="text-sm font-semibold text-primary-500 mb-1">
            Vicente Guerrero
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Tapachula, Chiapas
          </p>

          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="h-px w-10 md:w-16 bg-gold-400" />
            {/* ✅ Título actualizado */}
            <h1 className="text-xl md:text-2xl font-bold
                           text-primary-500 tracking-wide
                           text-center">
              FICHA DE APLICACIÓN DE<br />
              INSTRUMENTO DIAGNÓSTICO
            </h1>
            <div className="h-px w-10 md:w-16 bg-gold-400" />
          </div>

          <div className="bg-gold-100 text-gold-800 p-3 md:p-4
                          rounded-lg inline-block border border-gold-300">
            <p className="font-medium text-sm">FOLIO: [AUTO]</p>
            <p className="text-xs mt-1">
              FECHA: {new Date().toLocaleDateString('es-MX')}
              {' · '}
              HORA: {new Date().toLocaleTimeString('es-MX')}
            </p>
          </div>
        </div>

        {/* ✅ 4 pasos */}
        <FormSteps currentStep={currentStep} />

        {submitSuccess && (
          <div className="mt-4 p-4 bg-green-100 text-green-800
                          rounded-lg text-center font-medium
                          border border-green-300 text-sm md:text-base">
            ✅ {submitSuccess}
            <div className="mt-3">
              <button
                onClick={handleDescargarPDF}
                className="inline-block bg-red-700 text-white
                           px-6 py-2 rounded-lg font-medium text-sm
                           hover:bg-red-800 transition-colors cursor-pointer"
              >
                📄 Descargar PDF de Preficha
              </button>
            </div>
          </div>
        )}

        {submitError && (
          <div className="mt-4 p-4 bg-red-100 text-red-800
                          rounded-lg text-center font-medium
                          border border-red-300 text-sm md:text-base">
            ⚠️ {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card mt-6 md:mt-8">
          {/* ✅ PaymentMethodSection eliminado — ahora 4 pasos */}
          {currentStep === 1 && (
            <PersonalDataSection
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 2 && (
            <ContactSection
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 3 && (
            <AcademicOptionsSection
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 4 && (
            <FotoSection
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          <div className="flex justify-between items-center
                          mt-6 md:mt-8 pt-4 md:pt-6
                          border-t border-gold-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn-outline text-sm md:text-base"
              >
                ← Anterior
              </button>
            ) : <div />}

            {/* ✅ Último paso ahora es el 4 */}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary ml-auto text-sm md:text-base"
              >
                Siguiente →
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="btn-secondary ml-auto text-sm md:text-base
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? '⏳ ENVIANDO...' : '✅ ENVIAR SOLICITUD'}
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4 md:mt-6">
          CBTIS No. 88 · Vicente Guerrero · Tapachula, Chiapas ·
          Ciclo Escolar 2025–2026
        </p>
      </div>
    </div>
  )
}

export default PrefichaForm
