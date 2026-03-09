import { FaFileAlt, FaCreditCard, FaCertificate, FaBook } from 'react-icons/fa'

const ServicesList = () => {
  const services = [
    {
      icon: <FaFileAlt size={40} />,
      title: 'Trámites Escolares',
      description: 'Inscripciones, reinscripciones y cambios de especialidad.',
      items: ['Inscripción', 'Reinscripción', 'Cambio de especialidad', 'Baja temporal']
    },
    {
      icon: <FaCreditCard size={40} />,
      title: 'Servicios de Pago',
      description: 'Información sobre colegiaturas y métodos de pago.',
      items: ['Colegiaturas', 'Credenciales', 'Seguros escolares', 'Material didáctico']
    },
    {
      icon: <FaCertificate size={40} />,
      title: 'Documentación',
      description: 'Solicitud de certificados y constancias.',
      items: ['Certificados', 'Constancias', 'Historial académico', 'Cartas de recomendación']
    },
    {
      icon: <FaBook size={40} />,
      title: 'Biblioteca',
      description: 'Servicios bibliotecarios y recursos digitales.',
      items: ['Préstamo de libros', 'Recursos digitales', 'Sala de estudio', 'Asesorías']
    }
  ]

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">
        <h2 className="section-title">Servicios Escolares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card">
              <div className="text-primary-500 mb-6 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-neutral-600 text-center mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-neutral-700">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesList