const ContactSection = ({ formData, updateFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-500 mb-6">
        2. DATOS DE CONTACTO Y ORIGEN
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-neutral-700 font-medium mb-2">Domicilio *</label>
          <input type="text" value={formData.domicilio}
            onChange={(e) => updateFormData('domicilio', e.target.value)}
            className="input-field" placeholder="Calle y número" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-neutral-700 font-medium mb-2">Colonia *</label>
            <input type="text" value={formData.colonia}
              onChange={(e) => updateFormData('colonia', e.target.value)}
              className="input-field" required />
          </div>
          <div>
            <label className="block text-neutral-700 font-medium mb-2">Código Postal *</label>
            <input type="text" value={formData.codigoPostal}
              onChange={(e) => updateFormData('codigoPostal', e.target.value)}
              className="input-field" maxLength="5" pattern="[0-9]{5}" required />
          </div>
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Correo Electrónico *</label>
          <input type="email" value={formData.correoElectronico}
            onChange={(e) => updateFormData('correoElectronico', e.target.value)}
            className="input-field" placeholder="tu@email.com" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-neutral-700 font-medium mb-2">Teléfono Tutor *</label>
            <input type="tel" value={formData.telefonoTutor}
              onChange={(e) => updateFormData('telefonoTutor', e.target.value)}
              className="input-field" placeholder="(962) 123-4567" required />
          </div>
          <div>
            <label className="block text-neutral-700 font-medium mb-2">Teléfono Alumno</label>
            <input type="tel" value={formData.telefonoAlumno}
              onChange={(e) => updateFormData('telefonoAlumno', e.target.value)}
              className="input-field" placeholder="(962) 123-4567" />
          </div>
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Escuela de Procedencia *</label>
          <input type="text" value={formData.escuelaProcedencia}
            onChange={(e) => updateFormData('escuelaProcedencia', e.target.value)}
            className="input-field" placeholder="Nombre de tu secundaria" required />
        </div>

        <div>
          <label className="block text-neutral-700 font-medium mb-2">Promedio Aproximado *</label>
          <input type="number" value={formData.promedioAproximado}
            onChange={(e) => updateFormData('promedioAproximado', e.target.value)}
            className="input-field" min="6" max="10" step="0.1" placeholder="8.5" required />
        </div>
      </div>
    </div>
  )
}

export default ContactSection