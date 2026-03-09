import ServicesGrid from '@components/Services/ServicesGrid'
import ContactForm from '@components/Services/ContactForm'

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Servicios</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Infraestructura y recursos de primer nivel para apoyar tu desarrollo académico.
          </p>
        </div>
      </section>

      <ServicesGrid />
      <ContactForm />
    </div>
  )
}

export default Services