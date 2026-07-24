import { useState, useEffect } from 'react'
import FormSteps from './FormSteps'
import PersonalDataSection from './PersonalDataSection'
import ContactSection from './ContactSection'
import AcademicOptionsSection from './AcademicOptionsSection'
import FotoSection from './FotoSection'
import { prefichaService } from '@services/prefichaService'
import { apiService } from '@services/api'

const CURP_REGEX = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/

const initialFormData = {
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
  foto_base64:         null,
}

// ── Validación por paso ──────────────────────────────
// Devuelve un arreglo con los nombres de los campos faltantes/erróneos.
// Si el arreglo está vacío, el paso es válido y se puede avanzar.
const validateStep = (step, formData) => {
  const errors = []

  if (step === 1) {
    if (!formData.apellidoPaterno.trim()) errors.push('Apellido Paterno')
    if (!formData.apellidoMaterno.trim()) errors.push('Apellido Materno')
    if (!formData.nombre.trim()) errors.push('Nombre(s)')
    if (!formData.edad) errors.push('Edad')
    if (!formData.sexo) errors.push('Sexo')
    if (!formData.curp || !CURP_REGEX.test(formData.curp)) {
      errors.push('CURP (verifica que tenga el formato correcto, 18 caracteres)')
    }
    if (!formData.fechaNacimiento.dia) errors.push('Día de nacimiento')
    if (!formData.fechaNacimiento.mes) errors.push('Mes de nacimiento')
    if (!formData.fechaNacimiento.año) errors.push('Año de nacimiento')
    if (!formData.lugarNacimiento.trim()) errors.push('Lugar de Nacimiento')
    if (!formData.estadoNacimiento.trim()) errors.push('Estado de Nacimiento')
  }

  if (step === 2) {
    if (!formData.domicilio.trim()) errors.push('Domicilio')
    if (!formData.colonia.trim()) errors.push('Colonia')
    if (!/^\d{5}$/.test(formData.codigoPostal)) errors.push('Código Postal (5 dígitos)')
    if (!formData.correoElectronico.trim()) errors.push('Correo Electrónico')
    if (!formData.telefonoTutor.trim()) errors.push('Teléfono Tutor')
    if (!formData.escuelaProcedencia.trim()) errors.push('Escuela de Procedencia')
    if (!formData.promedioAproximado) errors.push('Promedio Aproximado')
  }

  if (step === 3) {
    if (!formData.opcion1) errors.push('Opción 1 - Especialidad')
  }

  // El paso 4 (foto) se valida en handleSubmit, ya que es el último paso.
  return errors
}

const PrefichaForm = () => {
  const [currentStep,    setCurrentStep]    = useState(1)
  const [stepErrors,     setStepErrors]     = useState([])
  const [submitting,     setSubmitting]     = useState(false)
  const [submitError,    setSubmitError]    = useState(null)
  const [submitSuccess,  setSubmitSuccess]  = useState(null)
  const [folioGenerado,  setFolioGenerado]  = useState(null)
  const [formData, setFormData] = useState(initialFormData)

  const updateFormData = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  // Sube al inicio de la página cuando aparece un mensaje de éxito/error
  // o al cambiar de paso, para que el usuario siempre lo vea.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [submitSuccess, submitError, currentStep])

  const handleNext = () => {
    const errors = validateStep(currentStep, formData)
    if (errors.length > 0) {
      setStepErrors(errors)
      return
    }
    setStepErrors([])
    if (currentStep < 4) setCurrentStep(s => s + 1)
  }

  const handlePrevious = () => {
    setStepErrors([])
    if (currentStep > 1) setCurrentStep(s => s - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validamos también el último paso (foto) antes de enviar.
    if (!formData.foto_base64 || formData.foto_base64 === 'data:,') {
      setSubmitError('Debes agregar tu foto para enviar la solicitud.')
      setCurrentStep(4)
      return
    }

    setSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      const payload = {
        apellido_paterno:     formData.apellidoPaterno,
        apellido_materno:     formData.apellidoMaterno,
        nombre:               formData.nombre,
        edad:                 Number(formData.edad),
        sexo:                 formData.sexo,
        curp:                 formData.curp,
        fecha_nacimiento:     `${formData.fechaNacimiento.año}-${String(formData.fechaNacimiento.mes).padStart(2, '0')}-${String(formData.fechaNacimiento.dia).padStart(2, '0')}`,
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
        foto_base64:          formData.foto_base64,
      }
      const result = await prefichaService.createPreficha(payload)
      const folio  = result.preficha?.folio

      setFolioGenerado(folio)
      setSubmitSuccess(`Solicitud enviada exitosamente. Folio: ${folio}`)
      // Nota: ya NO reseteamos currentStep aquí. En su lugar mostramos
      // una pantalla de confirmación dedicada (ver render abajo).
    } catch (err) {
      setSubmitError(err.message || 'Ocurrió un error al enviar la solicitud. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Descarga de PDF ───────────────────────────────────────────
  // Antes: usaba fetch() con "http://localhost:5000" hardcodeado, lo cual
  // solo funcionaba en desarrollo local. Ahora usa el mismo servicio de
  // Axios (api.js) que ya respeta VITE_API_URL en producción y agrega
  // automáticamente el token de autenticación si existe.
  const handleDescargarPDF = async () => {
    try {
      const response = await apiService.download(`/prefichas/pdf/${folioGenerado}`)
      const url  = window.URL.createObjectURL(new Blob([response.data]))
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

  const handleNuevaSolicitud = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
    setStepErrors([])
    setSubmitError(null)
    setSubmitSuccess(null)
    setFolioGenerado(null)
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

          <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">
            Secretaría de Educación Pública · DGETI
          </p>
          <p className="text-sm md:text-base font-medium text-gray-600 mb-1">
            Centro de Bachillerato Tecnológico Industrial y de Servicios No. 88
          </p>
          <p className="text-sm font-semibold text-primary-500 mb-1">
            Vicente Guerrero
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Tapachula, Chiapas
          </p>

          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="h-px w-10 md:w-16 bg-gold-400" />
            <h1 className="text-xl md:text-2xl font-bold text-primary-500 tracking-wide text-center">
              FICHA DE APLICACIÓN DE<br />
              INSTRUMENTO DIAGNÓSTICO
            </h1>
            <div className="h-px w-10 md:w-16 bg-gold-400" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            PANTALLA DE ÉXITO — reemplaza al formulario
            en vez de solo mostrar un banner arriba.
           ══════════════════════════════════════════════ */}
        {submitSuccess ? (
          <div className="card p-8 md:p-12 text-center border-2 border-green-300 bg-green-50">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              ¡Solicitud enviada exitosamente!
            </h2>
            <p className="text-green-700 mb-6">
              Tu folio de preficha es:
            </p>
            <div className="inline-block bg-white border-2 border-gold-400
                            rounded-lg px-8 py-4 mb-8">
              <span className="text-2xl md:text-3xl font-bold text-primary-600 tracking-wider">
                {folioGenerado}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Guarda este folio, lo necesitarás para dar seguimiento a tu solicitud.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDescargarPDF}
                className="bg-red-700 text-white px-6 py-3 rounded-lg font-medium
                           hover:bg-red-800 transition-colors"
              >
                📄 Descargar PDF de Preficha
              </button>
              <button
                onClick={handleNuevaSolicitud}
                className="btn-outline px-6 py-3"
              >
                Registrar otra solicitud
              </button>
            </div>
          </div>
        ) : (
          <>
            <FormSteps currentStep={currentStep} />

            {submitError && (
              <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg
                              text-center font-medium border border-red-300
                              text-sm md:text-base">
                ⚠️ {submitError}
              </div>
            )}

            {stepErrors.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg
                              border border-red-300 text-sm">
                <p className="font-semibold mb-1">
                  ⚠️ Antes de continuar, completa correctamente:
                </p>
                <ul className="list-disc list-inside space-y-0.5">
                  {stepErrors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="card mt-6 md:mt-8">
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
                <FotoSection formData={formData} updateFormData={updateFormData} />
              )}

              <div className="flex justify-between items-center mt-6 md:mt-8
                              pt-4 md:pt-6 border-t border-gold-200">
                {currentStep > 1 ? (
                  <button type="button" onClick={handlePrevious} className="btn-outline text-sm md:text-base">
                    ← Anterior
                  </button>
                ) : <div />}

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
          </>
        )}

        <p className="text-center text-xs text-gray-400 mt-4 md:mt-6">
          CBTIS No. 88 · Vicente Guerrero · Tapachula, Chiapas · Ciclo Escolar 2025–2026
        </p>
      </div>
    </div>
  )
}

export default PrefichaForm