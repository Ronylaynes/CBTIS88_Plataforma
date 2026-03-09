import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">88</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">CBTIS No. 88</h3>
                <p className="text-sm text-gold-300">Formando el Futuro</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400">
              Institución dedicada a formar técnicos bachilleres altamente capacitados, 
              comprometidos con la innovación y el desarrollo tecnológico.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-400">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/identidad" className="hover:text-gold-400 transition-colors">Identidad</Link></li>
              <li><Link to="/oferta-educativa" className="hover:text-gold-400 transition-colors">Oferta Educativa</Link></li>
              <li><Link to="/proyectos" className="hover:text-gold-400 transition-colors">Proyectos</Link></li>
              <li><Link to="/transparencia" className="hover:text-gold-400 transition-colors">Transparencia</Link></li>
              <li><Link to="/preficha" className="hover:text-gold-400 transition-colors">Preinscripción</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-400">Contacto</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-gold-400" />
                <span>Calle Principal #123, Tapachula, Chiapas, México</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="flex-shrink-0 text-gold-400" />
                <span>(962) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="flex-shrink-0 text-gold-400" />
                <span>contacto@cbtis88.edu.mx</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold-400">Síguenos</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="w-10 h-10 bg-primary-500 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-500 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-500 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-500 hover:bg-gold-500 rounded-full flex items-center justify-center transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
            <p className="text-sm text-neutral-400">
              Mantente al día con nuestras últimas noticias y eventos.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
            <p>&copy; {currentYear} CBTIS No. 88. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link to="/privacidad" className="hover:text-gold-400 transition-colors">Privacidad</Link>
              <Link to="/terminos" className="hover:text-gold-400 transition-colors">Términos</Link>
              <Link to="/cookies" className="hover:text-gold-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer