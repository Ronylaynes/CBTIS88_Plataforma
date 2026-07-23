import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram,
         FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo + descripción */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-gold-400
                              overflow-hidden flex items-center justify-center
                              flex-shrink-0 bg-white">
                <img
                  src="/assets/images/icons/cbtis88.jpg"
                  alt="Escudo CBTIS 88"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div>
                <h3 className="text-base font-bold">CBTIS No. 88</h3>
                <p className="text-xs text-gold-300">Formando el Futuro</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Institución dedicada a formar técnicos bachilleres altamente
              capacitados, comprometidos con la innovación y el desarrollo
              tecnológico de Tapachula, Chiapas.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-gold-400">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ['/identidad',              'Identidad'],
                ['/oferta-educativa',       'Oferta Educativa'],
                ['/actividades-academicas', 'Actividades Académicas'],
                ['/transparencia',          'Transparencia'],
                ['/preficha',               'Preinscripción'],
                // ✅ Nuevo: acceso para el personal administrativo
                // (Servicios Escolares / Dirección) a la descarga
                // de la relación de aspirantes con preficha.
                ['/admin',                  'Panel Administrativo'],
              ].map(([path, label]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-gold-400">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-gold-400" />
                <span>
                  Primaveras, Los Naranjos, Los Laureles I,
                  30780 Tapachula de Córdova y Ordóñez, Chiapas
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="flex-shrink-0 text-gold-400" />
                <span>(962) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="flex-shrink-0 text-gold-400" />
                <span className="break-all">contacto@cbtis88.edu.mx</span>
              </li>
            </ul>
          </div>

          {/* Redes sociales — solo las reales */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-gold-400">
              Síguenos
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.facebook.com/CBTIsNo88DGETI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook CBTIS 88"
                className="w-10 h-10 bg-primary-500 hover:bg-gold-500
                           rounded-full flex items-center justify-center
                           transition-colors"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/cbtis_88_tapachula/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram CBTIS 88"
                className="w-10 h-10 bg-primary-500 hover:bg-gold-500
                           rounded-full flex items-center justify-center
                           transition-colors"
              >
                <FaInstagram size={18} />
              </a>
            </div>
            <p className="text-sm text-neutral-400">
              Mantente al día con nuestras últimas noticias y actividades.
            </p>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-neutral-800">
        <div className="container-custom px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between
                          items-center gap-2 text-xs text-neutral-500">
            <p>
              © {currentYear} CBTIS No. 88 · Tapachula, Chiapas ·
              Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              {[
                ['/privacidad', 'Privacidad'],
                ['/terminos',   'Términos'],
                ['/cookies',    'Cookies'],
              ].map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  className="hover:text-gold-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer