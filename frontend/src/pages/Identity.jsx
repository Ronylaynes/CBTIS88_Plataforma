import IdentitySection from '@components/Identity/IdentitySection'

const Identity = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Nuestra Identidad</h1>
          <p className="text-xl max-w-3xl mx-auto">
            CBTIS No. 88: Comprometidos con la excelencia educativa y la formación 
            integral de nuestros estudiantes desde hace más de 30 años.
          </p>
        </div>
      </section>

      <IdentitySection />

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Nuestra Historia</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-neutral-700 leading-relaxed">
              <p className="text-lg">
                El Centro de Bachillerato Tecnológico Industrial y de Servicios No. 88 
                fue fundado en 1990 con el objetivo de ofrecer educación tecnológica de 
                calidad a los jóvenes de Tapachula y la región del Soconusco.
              </p>
              <p className="text-lg">
                A lo largo de más de tres décadas, hemos formado miles de técnicos 
                bachilleres que han contribuido significativamente al desarrollo económico 
                y social de Chiapas y México.
              </p>
              <p className="text-lg">
                Hoy en día, nos consolidamos como una institución líder en educación 
                tecnológica, con instalaciones modernas, personal altamente capacitado 
                y una sólida vinculación con el sector productivo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Identity