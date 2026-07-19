import CompanyCard from '@components/Linkage/CompanyCard'
import PartnershipSection from '@components/Linkage/PartnershipSection'

const Linkage = () => {
  const companies = [
    {
      name:        'CECATI',
      initials:    'CECATI',
      color:       'bg-red-700',
      sector:      'Educación Tecnológica',
      description: 'Centro de Capacitación para el Trabajo Industrial. Formación técnica y capacitación laboral en diversas áreas productivas.'
    },
    {
      name:        'Universidad Politécnica de Tapachula',
      initials:    'UP\nTap',
      color:       'bg-green-700',
      sector:      'Educación Superior',
      description: 'Institución de educación superior politécnica que forma ingenieros y profesionistas para el desarrollo regional de Chiapas.'
    },
    {
      name:        'TecNM — Tapachula',
      initials:    'TecNM',
      color:       'bg-blue-700',
      sector:      'Educación Superior',
      description: 'Tecnológico Nacional de México. Red de instituciones tecnológicas que impulsan la investigación y el desarrollo tecnológico.'
    },
    {
      name:        'UNACH — Tapachula',
      initials:    'UNACH',
      color:       'bg-purple-700',
      sector:      'Educación Superior',
      description: 'Universidad Autónoma de Chiapas. Primera universidad pública del estado, comprometida con la educación de calidad.'
    },
    {
      name:        'UVG — Universidad del Valle de Grijalva',
      initials:    'UVG',
      color:       'bg-orange-600',
      sector:      'Educación Superior',
      description: 'Universidad privada con amplia oferta educativa en el sureste mexicano, enfocada en la formación integral de profesionistas.'
    },
    {
      name:        'Universidad Salazar',
      initials:    'U\nSalazar',
      color:       'bg-teal-700',
      sector:      'Educación Superior',
      description: 'Institución educativa de nivel superior comprometida con la formación de profesionistas competentes en Tapachula, Chiapas.'
    },
    {
      name:        'Red IBAI',
      initials:    'IBAI',
      color:       'bg-primary-500',
      sector:      'Todas las Áreas',
      description: 'Red educativa con presencia en todas las áreas de formación. Vinculación integral con el sector productivo y académico de la región.'
    },
  ]

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="gradient-bg text-white py-12 md:py-20 px-4">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Vinculación con el Sector Productivo
          </h1>
          <p className="text-base md:text-xl max-w-3xl mx-auto">
            Conectamos a nuestros estudiantes con las mejores instituciones
            educativas y empresas de la región para garantizar experiencias
            prácticas y oportunidades laborales.
          </p>
        </div>
      </section>

      <PartnershipSection />

      {/* Instituciones aliadas */}
      <section className="py-12 md:py-20 bg-white px-4">
        <div className="container-custom">
          <h2 className="section-title">Nuestros Aliados Estratégicos</h2>
          <p className="text-center text-sm md:text-base text-neutral-500
                        max-w-2xl mx-auto mb-10 md:mb-14">
            Instituciones educativas y organismos con los que el CBTIS 88
            mantiene convenios de colaboración para el beneficio de nuestros
            estudiantes.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
                          gap-4 md:gap-6">
            {companies.map((company, index) => (
              <CompanyCard key={index} {...company} />
            ))}
          </div>

          {/* Nota Red IBAI */}
          <div className="mt-8 md:mt-12 p-4 md:p-6 bg-primary-50
                          border-l-4 border-primary-500 rounded-r-xl
                          max-w-3xl mx-auto">
            <h3 className="font-bold text-primary-700 mb-2 text-sm md:text-base">
              ⭐ Red IBAI — Vinculación en todas las áreas
            </h3>
            <p className="text-neutral-700 text-xs md:text-sm leading-relaxed">
              La Red IBAI tiene presencia en todas las especialidades del CBTIS 88,
              ofreciendo oportunidades de vinculación, prácticas profesionales
              y proyectos colaborativos para estudiantes de cualquier área.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-12 md:py-20 bg-neutral-50 px-4">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title">Beneficios de la Vinculación</h2>
          <div className="space-y-4 md:space-y-6">

            <div className="card">
              <h3 className="text-base md:text-xl font-bold text-primary-500 mb-3">
                Para Estudiantes
              </h3>
              <ul className="space-y-2 text-neutral-700">
                {[
                  'Experiencia práctica en entornos laborales y académicos reales',
                  'Desarrollo de competencias profesionales reconocidas',
                  'Networking con profesionales e instituciones del sector',
                  'Mayores oportunidades de empleo y continuación de estudios al egresar',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-500 rounded-full
                                     mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="text-base md:text-xl font-bold text-primary-500 mb-3">
                Para Instituciones Aliadas
              </h3>
              <ul className="space-y-2 text-neutral-700">
                {[
                  'Acceso a talento joven capacitado y motivado desde nivel medio superior',
                  'Participación en proyectos de innovación tecnológica del CBTIS 88',
                  'Fortalecimiento de su responsabilidad social y vinculación educativa',
                  'Vinculación directa con una institución con más de 30 años de trayectoria',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-500 rounded-full
                                     mt-2 flex-shrink-0" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Linkage