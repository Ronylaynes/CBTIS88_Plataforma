import ActivitiesGallery from '@components/Activities/ActivitiesGallery'

const Projects = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Actividades Académicas</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Conoce las actividades de vinculación, salud, innovación e impacto social
            desarrolladas por nuestros estudiantes y docentes.
          </p>
        </div>
      </section>

      <ActivitiesGallery />

      {/* Innovation Section */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="section-title">Cultura de Innovación</h2>
          <p className="text-lg text-neutral-600 mb-8">
            En CBTIS 88 fomentamos la creatividad, el pensamiento crítico y la innovación
            tecnológica como pilares fundamentales de nuestra formación académica.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-blue-50">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">50+</h3>
              <p className="text-neutral-700">Actividades Anuales</p>
            </div>
            <div className="card bg-green-50">
              <h3 className="text-3xl font-bold text-green-600 mb-2">15+</h3>
              <p className="text-neutral-700">Premios Obtenidos</p>
            </div>
            <div className="card bg-purple-50">
              <h3 className="text-3xl font-bold text-purple-600 mb-2">100%</h3>
              <p className="text-neutral-700">Participación Estudiantil</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects
