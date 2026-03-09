import DirectorProfile from '@components/Teachers/DirectorProfile'
import TeacherDirectory from '@components/Teachers/TeacherDirectory'

const Teachers = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Nuestros Maestros</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Docentes comprometidos con la excelencia académica y la formación integral 
            de nuestros estudiantes.
          </p>
        </div>
      </section>

      {/* Director */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="section-title">Mensaje del Director</h2>
          <DirectorProfile
            name="Dr. José Luis Hernández García"
            position="Director del CBTIS No. 88"
            message="Es un honor liderar esta institución que durante más de 30 años ha formado profesionales técnicos de excelencia. Nuestro compromiso es brindar educación de calidad, actualizada y pertinente para los desafíos del siglo XXI. Invitamos a todos los jóvenes con deseos de superación a formar parte de nuestra comunidad educativa."
          />
        </div>
      </section>

      <TeacherDirectory />

      {/* Stats */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <h2 className="section-title">Nuestro Equipo Docente</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-500 mb-2">80+</p>
              <p className="text-neutral-700">Docentes</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gold-500 mb-2">95%</p>
              <p className="text-neutral-700">Con Posgrado</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-500 mb-2">100%</p>
              <p className="text-neutral-700">Certificados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gold-500 mb-2">25+</p>
              <p className="text-neutral-700">Años Promedio</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Teachers