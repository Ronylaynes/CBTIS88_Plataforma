const AcademicOptionsSection = ({ formData, updateFormData }) => {
  const especialidades = [
    'Programación',
    'mecanica industrial',
    'electricidad',
    'mecatronica',
    'ciberciberseguridad',
    'gestion e inovacion turistica',
    'inteligencia artificial'
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-500 mb-6">
        3. OPCIONES ACADÉMICAS
      </h2>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-800 font-medium">
          Selecciona hasta 3 opciones de especialidad en orden de preferencia.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-neutral-700 font-medium mb-2">Opción 1 - Especialidad *</label>
          <select value={formData.opcion1}
            onChange={(e) => updateFormData('opcion1', e.target.value)}
            className="input-field" required>
            <option value="">Selecciona tu primera opción</option>
            {especialidades.map((esp) => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>

        {/* ✅ Corregido: opcion1Especialidad estaba undefined en PrefichaForm */}
        <div>
          <label className="block text-neutral-700 font-medium mb-2">Opción 1 - Detalles de Especialidad</label>
          <input type="text"
            value={formData.opcion1Especialidad || ''}
            onChange={(e) => updateFormData('opcion1Especialidad', e.target.value)}
            className="input-field"
            placeholder="Información adicional sobre tu elección" />
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Opción 2 - Especialidad</label>
          <select value={formData.opcion2}
            onChange={(e) => updateFormData('opcion2', e.target.value)}
            className="input-field">
            <option value="">Selecciona tu segunda opción</option>
            {especialidades.filter(e => e !== formData.opcion1).map((esp) => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Opción 3 - Especialidad</label>
          <select value={formData.opcion3}
            onChange={(e) => updateFormData('opcion3', e.target.value)}
            className="input-field">
            <option value="">Selecciona tu tercera opción</option>
            {especialidades.filter(e => e !== formData.opcion1 && e !== formData.opcion2).map((esp) => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-gold-50 rounded-lg">
        <h3 className="font-bold text-neutral-900 mb-3">Especialidades Disponibles:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {especialidades.map((esp) => (
            <li key={esp} className="flex items-center text-neutral-700">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
              {esp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AcademicOptionsSection