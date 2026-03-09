import ServicesList from '@components/SchoolServices/ServicesList'
import ServiceDetail from '@components/SchoolServices/ServiceDetail'

const SchoolServices = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Servicios Escolares</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Información sobre trámites, servicios y atención para estudiantes del CBTIS No. 88.
          </p>
        </div>
      </section>

      <ServicesList />

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title">Información de Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceDetail
              title="Horario de Atención"
              description="Departamento de Servicios Escolares"
              schedule="Lunes a Viernes: 8:00 AM - 3:00 PM"
              contact="servicios.escolares@cbtis88.edu.mx"
            />
            <ServiceDetail
              title="Ubicación"
              description="Oficinas Administrativas"
              requirements={[
                'Edificio Principal, Planta Baja',
                'Ventanillas 1-4',
                'Lleva tu identificación oficial'
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default SchoolServices