import SpecialtyCard from '@components/EducationOffer/SpecialtyCard'
import ProgramInfo from '@components/EducationOffer/ProgramInfo'
import { FaCode, FaMicrochip, FaUsers, FaCalculator, FaRobot } from 'react-icons/fa'

const EducationOffer = () => {
  const specialties = [
    {
      icon: <FaCode size={30} />,
      title: 'Programación',
      description: 'Desarrolla aplicaciones web, móviles y software empresarial con las últimas tecnologías.',
      color: 'bg-blue-500',
      features: ['Desarrollo Web', 'Apps Móviles', 'Bases de Datos', 'Inteligencia Artificial']
    },
    {
      icon: <FaMicrochip size={30} />,
      title: 'Electrónica',
      description: 'Diseña, construye y mantiene sistemas electrónicos y de automatización industrial.',
      color: 'bg-green-500',
      features: ['Circuitos Electrónicos', 'Automatización', 'Telecomunicaciones', 'Energías Renovables']
    },
    {
      icon: <FaUsers size={30} />,
      title: 'Administración de Recursos Humanos',
      description: 'Gestiona el talento humano y optimiza procesos organizacionales.',
      color: 'bg-purple-500',
      features: ['Reclutamiento', 'Capacitación', 'Nóminas', 'Clima Laboral']
    },
    {
      icon: <FaCalculator size={30} />,
      title: 'Contabilidad',
      description: 'Maneja información financiera y elabora estados contables empresariales.',
      color: 'bg-orange-500',
      features: ['Finanzas', 'Auditoría', 'Impuestos', 'Costos']
    },
    {
      icon: <FaRobot size={30} />,
      title: 'Mecatrónica',
      description: 'Integra sistemas mecánicos, electrónicos y de control para la industria 4.0.',
      color: 'bg-red-500',
      features: ['Robótica', 'Neumática', 'Control Automático', 'Manufactura']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Oferta Educativa</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Descubre nuestras especialidades técnicas y elige el camino que transformará tu futuro profesional.
          </p>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <ProgramInfo />
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 bg-neutral-50 pattern-dots">
        <div className="container-custom">
          <h2 className="section-title">Especialidades Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <SpecialtyCard key={index} {...specialty} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para Inscribirte?</h2>
          <p className="text-xl mb-8">
            Comienza tu proceso de admisión y forma parte de nuestra comunidad educativa.
          </p>
          <button className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all">
            Iniciar Preinscripción
          </button>
        </div>
      </section>
    </div>
  )
}

export default EducationOffer