const ServiceDetail = ({ title, description, requirements, schedule, contact }) => {
  return (
    <div className="card">
      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
        {title}
      </h3>
      <p className="text-neutral-600 mb-6">
        {description}
      </p>
      
      {requirements && (
        <div className="mb-6">
          <h4 className="font-bold text-neutral-900 mb-3">Requisitos:</h4>
          <ul className="space-y-2">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2"></span>
                <span className="text-neutral-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {schedule && (
        <div className="mb-6">
          <h4 className="font-bold text-neutral-900 mb-2">Horario de Atención:</h4>
          <p className="text-neutral-700">{schedule}</p>
        </div>
      )}

      {contact && (
        <div className="bg-gold-50 p-4 rounded-lg">
          <h4 className="font-bold text-neutral-900 mb-2">Contacto:</h4>
          <p className="text-neutral-700">{contact}</p>
        </div>
      )}
    </div>
  )
}

export default ServiceDetail