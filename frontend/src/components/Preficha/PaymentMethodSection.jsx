import { FaUniversity, FaMoneyBillWave } from 'react-icons/fa'

const PaymentMethodSection = ({ formData, updateFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-500 mb-6">
        4. MÉTODO DE PAGO
      </h2>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="text-yellow-800 font-medium">
          El costo de la preficha es de $500 MXN. Selecciona tu método de pago preferido.
        </p>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => updateFormData('metodoPago', 'transferencia')}
          className={`card cursor-pointer transition-all ${
            formData.metodoPago === 'transferencia'
              ? 'border-2 border-primary-500 bg-primary-50'
              : 'hover:shadow-lg'
          }`}
        >
          <div className="flex items-start space-x-4">
            <input
              type="radio"
              name="metodoPago"
              value="transferencia"
              checked={formData.metodoPago === 'transferencia'}
              onChange={(e) => updateFormData('metodoPago', e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <FaUniversity className="text-primary-500" size={24} />
                <h3 className="text-lg font-bold text-neutral-900">
                  Transferencia Bancaria
                </h3>
              </div>
              <p className="text-neutral-600 mb-3">
                Realiza tu pago mediante transferencia electrónica a nuestra cuenta oficial.
              </p>
              {formData.metodoPago === 'transferencia' && (
                <div className="bg-white p-4 rounded-lg border-2 border-primary-200">
                  <p className="font-medium text-neutral-900 mb-2">Datos bancarios:</p>
                  <div className="space-y-1 text-sm text-neutral-700">
                    <p><strong>Banco:</strong> Bancomer</p>
                    <p><strong>Cuenta:</strong> 0123456789</p>
                    <p><strong>CLABE:</strong> 012345678901234567</p>
                    <p><strong>Beneficiario:</strong> CBTIS No. 88</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={() => updateFormData('metodoPago', 'ventanilla')}
          className={`card cursor-pointer transition-all ${
            formData.metodoPago === 'ventanilla'
              ? 'border-2 border-primary-500 bg-primary-50'
              : 'hover:shadow-lg'
          }`}
        >
          <div className="flex items-start space-x-4">
            <input
              type="radio"
              name="metodoPago"
              value="ventanilla"
              checked={formData.metodoPago === 'ventanilla'}
              onChange={(e) => updateFormData('metodoPago', e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <FaMoneyBillWave className="text-green-500" size={24} />
                <h3 className="text-lg font-bold text-neutral-900">
                  Pago en Ventanilla
                </h3>
              </div>
              <p className="text-neutral-600 mb-3">
                Acude directamente a las oficinas del plantel para realizar tu pago en efectivo.
              </p>
              {formData.metodoPago === 'ventanilla' && (
                <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                  <p className="font-medium text-neutral-900 mb-2">Horario de atención:</p>
                  <div className="space-y-1 text-sm text-neutral-700">
                    <p><strong>Lunes a Viernes:</strong> 8:00 AM - 3:00 PM</p>
                    <p><strong>Ubicación:</strong> Oficinas Administrativas</p>
                    <p className="text-yellow-700 mt-2">
                      * Lleva tu comprobante de preficha impreso
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-primary-500 to-gold-500 text-white rounded-lg">
        <h3 className="font-bold text-xl mb-3">Importante:</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Conserva tu comprobante de pago como respaldo.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Una vez realizado el pago, tu preficha será validada en 24-48 horas.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Recibirás un correo de confirmación con tu número de folio oficial.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PaymentMethodSection