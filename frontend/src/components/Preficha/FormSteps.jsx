import { FaUser, FaPhone, FaGraduationCap, FaCamera } from 'react-icons/fa'

const FormSteps = ({ currentStep }) => {
  // ✅ 4 pasos — sin PaymentMethod
  const steps = [
    { number: 1, label: 'Datos Personales', icon: FaUser },
    { number: 2, label: 'Contacto',         icon: FaPhone },
    { number: 3, label: 'Opciones Acad.',   icon: FaGraduationCap },
    { number: 4, label: 'Fotografía',       icon: FaCamera },
  ]

  return (
    <div className="w-full mb-6 md:mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const Icon      = step.icon
          const isActive  = currentStep === step.number
          const isDone    = currentStep > step.number
          const isLast    = index === steps.length - 1

          return (
            <div key={step.number}
                 className="flex items-center">

              {/* Círculo del paso */}
              <div className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full
                  flex items-center justify-center
                  border-2 transition-all duration-300
                  ${isDone
                    ? 'bg-green-500 border-green-500 text-white'
                    : isActive
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'bg-white border-neutral-300 text-neutral-400'}
                `}>
                  {isDone ? (
                    <span className="text-xs md:text-sm">✓</span>
                  ) : (
                    <Icon size={14} className="md:w-4 md:h-4" />
                  )}
                </div>
                <span className={`
                  text-xs mt-1 text-center hidden sm:block
                  max-w-16 leading-tight
                  ${isActive
                    ? 'text-primary-500 font-semibold'
                    : isDone
                      ? 'text-green-600'
                      : 'text-neutral-400'}
                `}>
                  {step.label}
                </span>
              </div>

              {/* Línea conectora */}
              {!isLast && (
                <div className={`
                  h-0.5 w-8 sm:w-12 md:w-20 mx-1 md:mx-2
                  transition-all duration-300
                  ${currentStep > step.number
                    ? 'bg-green-500'
                    : 'bg-neutral-200'}
                `} />
              )}
            </div>
          )
        })}
      </div>

      {/* Indicador móvil */}
      <p className="text-center text-xs text-neutral-500
                    mt-2 sm:hidden">
        Paso {currentStep} de 4
      </p>
    </div>
  )
}

export default FormSteps
