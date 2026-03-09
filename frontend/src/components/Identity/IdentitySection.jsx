import ValueCard from './ValueCard'
import { FaTrophy, FaHandshake, FaUsers, FaHeart } from 'react-icons/fa'

const IdentitySection = () => {
  const values = [
    {
      icon: <FaTrophy size={40} />,
      title: 'Excelencia Académica',
      description: 'Comprometidos con la calidad educativa y la mejora continua en todos nuestros procesos de enseñanza-aprendizaje.'
    },
    {
      icon: <FaHandshake size={40} />,
      title: 'Integridad',
      description: 'Actuamos con honestidad, transparencia y ética en todas nuestras actividades institucionales.'
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Trabajo en Equipo',
      description: 'Fomentamos la colaboración y el apoyo mutuo para alcanzar objetivos comunes.'
    },
    {
      icon: <FaHeart size={40} />,
      title: 'Responsabilidad Social',
      description: 'Contribuimos al desarrollo sostenible de nuestra comunidad y región.'
    }
  ]

  return (
    <section className="py-20 bg-neutral-50 pattern-dots">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Nuestra Identidad: CBTIS No. 88</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Formar técnicos bachilleres altamente capacitados, comprometidos con la innovación 
            y el desarrollo tecnológico de nuestra región.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <h3 className="text-2xl font-bold mb-4">Misión</h3>
            <p className="text-lg leading-relaxed">
              Formar profesionales técnicos bachilleres con excelencia académica, competencias 
              tecnológicas y valores éticos que contribuyan al desarrollo económico y social 
              de México.
            </p>
          </div>
          <div className="card bg-gradient-to-br from-gold-500 to-gold-700 text-white">
            <h3 className="text-2xl font-bold mb-4">Visión</h3>
            <p className="text-lg leading-relaxed">
              Ser una institución educativa líder en la formación de técnicos bachilleres, 
              reconocida por su innovación, calidad educativa y vinculación con el sector 
              productivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IdentitySection