const PersonalDataSection = ({ formData, updateFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-500 mb-6">
        1. DATOS DEL ASPIRANTE
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-neutral-700 font-medium mb-2">Apellido Paterno *</label>
          <input type="text" value={formData.apellidoPaterno}
            onChange={(e) => updateFormData('apellidoPaterno', e.target.value)}
            className="input-field" required />
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Apellido Materno *</label>
          <input type="text" value={formData.apellidoMaterno}
            onChange={(e) => updateFormData('apellidoMaterno', e.target.value)}
            className="input-field" required />
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Nombre(s) *</label>
          <input type="text" value={formData.nombre}
            onChange={(e) => updateFormData('nombre', e.target.value)}
            className="input-field" required />
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Edad *</label>
          <input type="number" value={formData.edad}
            onChange={(e) => updateFormData('edad', e.target.value)}
            className="input-field" min="14" max="20" required />
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Sexo *</label>
          <select value={formData.sexo}
            onChange={(e) => updateFormData('sexo', e.target.value)}
            className="input-field" required>
            <option value="">Seleccionar</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">CURP *</label>
          <input type="text" value={formData.curp}
            onChange={(e) => updateFormData('curp', e.target.value.toUpperCase())}
            className="input-field" maxLength="18"
            pattern="[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}" required />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-neutral-700 font-medium mb-2">Fecha de Nacimiento *</label>
        <div className="grid grid-cols-3 gap-4">
          <select value={formData.fechaNacimiento.dia}
            onChange={(e) => updateFormData('fechaNacimiento', { ...formData.fechaNacimiento, dia: e.target.value })}
            className="input-field" required>
            <option value="">DÍA</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select value={formData.fechaNacimiento.mes}
            onChange={(e) => updateFormData('fechaNacimiento', { ...formData.fechaNacimiento, mes: e.target.value })}
            className="input-field" required>
            <option value="">MES</option>
            {['Enero','Febrero','Marzo','Abril','Mayo','Junio',
              'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((mes, i) => (
              <option key={i} value={i + 1}>{mes}</option>
            ))}
          </select>

          <select value={formData.fechaNacimiento.año}
            onChange={(e) => updateFormData('fechaNacimiento', { ...formData.fechaNacimiento, año: e.target.value })}
            className="input-field" required>
            <option value="">AÑO</option>
            {[...Array(10)].map((_, i) => {
              const year = new Date().getFullYear() - 14 - i
              return <option key={year} value={year}>{year}</option>
            })}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-neutral-700 font-medium mb-2">Lugar de Nacimiento *</label>
          <input type="text" value={formData.lugarNacimiento}
            onChange={(e) => updateFormData('lugarNacimiento', e.target.value)}
            className="input-field" required />
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Estado de Nacimiento *</label>
          <input type="text" value={formData.estadoNacimiento}
            onChange={(e) => updateFormData('estadoNacimiento', e.target.value)}
            className="input-field" required />
        </div>
      </div>
    </div>
  )
}

export default PersonalDataSection