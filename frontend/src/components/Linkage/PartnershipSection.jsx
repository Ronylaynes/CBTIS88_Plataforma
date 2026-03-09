import { FaBriefcase, FaHandshake, FaGraduationCap } from 'react-icons/fa'

const PartnershipSection = () => {
  const benefits = [
    {
      icon: <FaBriefcase size={40} />,
      title: 'Prácticas Profesionales',
      description: 'Oportunidades en empresas líderes del sector productivo.'
    },
    {
      icon: <FaHandshake size={40} />,
      title: 'Convenios de Colaboración',
      description: 'Alianzas estratégicas para el desarrollo tecnológico.'
    },
    {
      icon: <FaGraduationCap size={40} />,
      title: 'Inserción Laboral',
      description: 'Alto porcentaje de egresados empleados en su área.'
    }
  ]

  return (
    <section className="py-20 gradient-bg text-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-16">
          Vinculación con el Sector Productivo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-gold-300 mb-6 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-neutral-100">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnershipSection