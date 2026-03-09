import CompanyCard from '@components/Linkage/CompanyCard'
import PartnershipSection from '@components/Linkage/PartnershipSection'

const Linkage = () => {
  const companies = [
    {
      name: 'Corporación TechMex',
      sector: 'Tecnología',
      description: 'Líder en desarrollo de software empresarial en la región del Soconusco.'
    },
    {
      name: 'Industrias del Café S.A.',
      sector: 'Agroindustria',
      description: 'Producción y exportación de café chiapaneco de alta calidad.'
    },
    {
      name: 'Electrónica Avanzada',
      sector: 'Manufactura',
      description: 'Fabricación de componentes electrónicos para la industria automotriz.'
    },
    {
      name: 'Grupo Administrativo del Sur',
      sector: 'Servicios',
      description: 'Consultoría empresarial y servicios administrativos especializados.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Vinculación con el Sector Productivo</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Conectamos a nuestros estudiantes con las mejores empresas de la región para 
            garantizar experiencias prácticas y oportunidades laborales.
          </p>
        </div>
      </section>

      <PartnershipSection />

      {/* Companies */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Nuestros Aliados Estratégicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companies.map((company, index) => (
              <CompanyCard key={index} {...company} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title">Beneficios de la Vinculación</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-primary-500 mb-3">Para Estudiantes</h3>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2"></span>
                  <span>Experiencia práctica en entornos laborales reales</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2"></span>
                  <span>Desarrollo de competencias profesionales</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2"></span>
                  <span>Networking con profesionales del sector</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2"></span>
                  <span>Mayores oportunidades de empleo al egresar</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-primary-500 mb-3">Para Empresas</h3>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2"></span>
                  <span>Acceso a talento joven capacitado y motivado</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2"></span>
                  <span>Participación en proyectos de innovación tecnológica</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2"></span>
                  <span>Fortalecimiento de su responsabilidad social</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2"></span>
                  <span>Vinculación directa con la institución educativa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Linkage