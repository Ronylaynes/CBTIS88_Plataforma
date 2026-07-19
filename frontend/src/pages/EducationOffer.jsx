import SpecialtyCard from '@components/EducationOffer/SpecialtyCard'
import ProgramInfo from '@components/EducationOffer/ProgramInfo'
import { FaCode, FaRobot } from 'react-icons/fa'
import { FaGear, FaBolt, FaShieldHalved, FaUmbrellaBeach, FaBrain } from 'react-icons/fa6'

const EducationOffer = () => {
  const specialties = [
    {
      icon: <FaGear size={28} />,
      title: 'Mecánica Industrial',
      description: 'Instala, opera y mantiene maquinaria industrial y sistemas de manufactura.',
      color: 'bg-blue-600',
      badge: 'Turno matutino',
      area: 'Industrial y de Energía',
      features: ['Torno y fresado CNC', 'Soldadura industrial', 'Mantenimiento preventivo', 'Neumática e hidráulica']
    },
    {
      icon: <FaBolt size={28} />,
      title: 'Electricidad',
      description: 'Diseña e instala sistemas eléctricos residenciales, comerciales e industriales.',
      color: 'bg-yellow-500',
      area: 'Industrial y de Energía',
      features: ['Instalaciones eléctricas', 'Tableros de control', 'Energías renovables', 'NOM y normativas']
    },
    {
      icon: <FaRobot size={28} />,
      title: 'Mecatrónica',
      description: 'Integra mecánica, electrónica y programación para la automatización industrial.',
      color: 'bg-red-500',
      area: 'Industrial y de Energía',
      features: ['Robótica', 'PLC y automatización', 'Control automático', 'Industria 4.0']
    },
    {
      icon: <FaCode size={28} />,
      title: 'Programación',
      description: 'Desarrolla software, aplicaciones web y móviles con las últimas tecnologías.',
      color: 'bg-blue-500',
      area: 'Tecnología',
      features: ['Desarrollo web', 'Apps móviles', 'Bases de datos', 'Python y JavaScript']
    },
    {
      icon: <FaShieldHalved size={28} />,
      title: 'Ciberseguridad',
      description: 'Protege sistemas e infraestructuras digitales contra amenazas cibernéticas.',
      color: 'bg-slate-700',
      badge: 'Turno vespertino',
      area: 'Tecnología',
      features: ['Ethical hacking', 'Redes y firewalls', 'Criptografía', 'Análisis forense digital']
    },
    {
      icon: <FaUmbrellaBeach size={28} />,
      title: 'Gestión e Innovación Turística',
      description: 'Planifica y gestiona servicios turísticos aprovechando el potencial de Chiapas.',
      color: 'bg-teal-500',
      badge: '¡Nueva!',
      area: 'Nuevas Carreras',
      features: ['Turismo sostenible', 'Administración hotelera', 'Marketing turístico', 'Ecoturismo']
    },
    {
      icon: <FaBrain size={28} />,
      title: 'Inteligencia Artificial',
      description: 'Desarrolla soluciones con machine learning, redes neuronales e IA generativa.',
      color: 'bg-purple-600',
      badge: '¡Nueva!',
      area: 'Nuevas Carreras',
      features: ['Machine learning', 'Visión por computadora', 'Procesamiento de lenguaje', 'IA generativa']
    },
  ]

  const areas = [...new Set(specialties.map(s => s.area))]

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Oferta Educativa</h1>
          <p className="text-xl max-w-3xl mx-auto">
            7 especialidades técnicas para que elijas el camino que transformará tu futuro profesional.
          </p>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <ProgramInfo />
        </div>
      </section>

      {/* Especialidades agrupadas por área */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">

          {areas.map(area => (
            <div key={area} className="mb-16">

              {/* Encabezado de área */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-8 bg-primary-500 rounded" />
                <h2 className="text-2xl font-bold text-neutral-800">
                  Área de {area}
                </h2>
              </div>

              {/* Grid de tarjetas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {specialties
                  .filter(s => s.area === area)
                  .map((specialty, index) => (
                    <SpecialtyCard key={index} {...specialty} />
                  ))}
              </div>

            </div>
          ))}

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