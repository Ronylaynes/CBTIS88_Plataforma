import { FaUser, FaAddressBook, FaBook, FaCreditCard, FaCheck } from 'react-icons/fa'

const FormSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Datos Personales', icon: <FaUser /> },
    { number: 2, title: 'Contacto y Origen', icon: <FaAddressBook /> },
    { number: 3, title: 'Opciones Académicas', icon: <FaBook /> },
    { number: 4, title: 'Método de Pago', icon: <FaCreditCard /> }
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex-1 flex items-center">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-primary-500 text-white scale-110'
                    : 'bg-neutral-300 text-neutral-600'
                }`}
              >
                {currentStep > step.number ? <FaCheck /> : step.icon}
              </div>
              <p
                className={`mt-2 text-sm font-medium text-center ${
                  currentStep >= step.number ? 'text-primary-600' : 'text-neutral-500'
                }`}
              >
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                currentStep > step.number ? 'bg-green-500' : 'bg-neutral-300'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormSteps