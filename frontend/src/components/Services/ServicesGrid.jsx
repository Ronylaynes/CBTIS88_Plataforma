import { FaLaptop, FaTools, FaCamera, FaPrint, FaWifi, FaChalkboardTeacher } from 'react-icons/fa'

const ServicesGrid = () => {
  const services = [
    {
      icon: <FaLaptop size={40} />,
      title: 'Laboratorios de Cómputo',
      description: 'Equipos de última generación con software especializado para cada especialidad.',
      color: 'bg-blue-500'
    },
    {
      icon: <FaTools size={40} />,
      title: 'Talleres Especializados',
      description: 'Espacios equipados para prácticas profesionales en todas nuestras especialidades.',
      color: 'bg-green-500'
    },
    {
      icon: <FaCamera size={40} />,
      title: 'Equipo Audiovisual',
      description: 'Recursos multimedia para presentaciones y proyectos académicos.',
      color: 'bg-purple-500'
    },
    {
      icon: <FaPrint size={40} />,
      title: 'Centro de Copiado',
      description: 'Servicio de impresión, copiado y encuadernación para estudiantes.',
      color: 'bg-orange-500'
    },
    {
      icon: <FaWifi size={40} />,
      title: 'Internet WiFi',
      description: 'Conexión inalámbrica de alta velocidad en todo el plantel.',
      color: 'bg-cyan-500'
    },
    {
      icon: <FaChalkboardTeacher size={40} />,
      title: 'Asesorías Académicas',
      description: 'Apoyo personalizado en todas las materias con horarios flexibles.',
      color: 'bg-red-500'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-16">
          Contamos con infraestructura y servicios de calidad para apoyar tu desarrollo académico y profesional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card group">
              <div className={`${service.color} text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-neutral-600 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid