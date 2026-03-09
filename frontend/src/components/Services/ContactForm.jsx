import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom max-w-4xl">
        <h2 className="section-title">Contáctanos</h2>
        <p className="text-center text-neutral-600 mb-12">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
        </p>
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-neutral-700 font-medium mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-neutral-700 font-medium mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-neutral-700 font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="(962) 123-4567"
              />
            </div>
            <div>
              <label className="block text-neutral-700 font-medium mb-2">
                Asunto *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Selecciona un asunto</option>
                <option value="informacion">Información General</option>
                <option value="inscripcion">Inscripciones</option>
                <option value="servicios">Servicios</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-2">
              Mensaje *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="input-field resize-none"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-primary w-full md:w-auto flex items-center justify-center space-x-2"
          >
            <span>Enviar Mensaje</span>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm