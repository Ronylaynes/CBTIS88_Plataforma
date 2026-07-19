// frontend/src/components/common/Navbar.jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { path: '/',                       label: 'Inicio' },
    { path: '/identidad',              label: 'Identidad' },
    { path: '/oferta-educativa',       label: 'Oferta Educativa' },
    { path: '/vinculacion',            label: 'Vinculación' },
    // ✅ Cambiado: Proyectos → Actividades Académicas
    { path: '/actividades-academicas', label: 'Actividades Académicas' },
    { path: '/maestros',               label: 'Maestros' },
    { path: '/servicios-escolares',    label: 'Servicios Escolares' },
    { path: '/servicios',              label: 'Servicios' },
    { path: '/transparencia',          label: 'Transparencia' },
  ]

  return (
    <nav className="bg-primary-500 text-white shadow-lg sticky top-0 z-50 w-full">
      <div className="container-custom px-4">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full
                            border-2 border-gold-400 overflow-hidden
                            flex items-center justify-center flex-shrink-0
                            bg-white">
              <img
                src="/assets/images/icons/cbtis88.jpg"
                alt="Escudo CBTIS 88"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-white text-sm md:text-base leading-tight">
                CBTIS No. 88
              </span>
              <span className="text-xs text-gold-300 hidden sm:block">
                Formando el Futuro
              </span>
            </div>
          </Link>

          {/* ── Menú desktop ── */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-md text-xs font-medium
                   transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gold-500 text-white'
                      : 'hover:bg-primary-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/preficha"
              className="ml-2 px-3 py-1.5 bg-gold-500 hover:bg-gold-600
                         text-white font-semibold rounded-lg text-xs
                         transition-all whitespace-nowrap"
            >
              Preinscripción
            </Link>
          </div>

          {/* ── Hamburguesa ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-md hover:bg-primary-600
                       transition-colors focus:outline-none
                       focus:ring-2 focus:ring-white"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* ── Menú móvil ── */}
        {isOpen && (
          <div className="xl:hidden pb-4 border-t border-primary-600 mt-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pt-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-md text-sm font-medium
                     transition-all text-center ${
                      isActive
                        ? 'bg-gold-500 text-white'
                        : 'hover:bg-primary-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-3">
              <Link
                to="/preficha"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-2.5 bg-gold-500
                           hover:bg-gold-600 text-white font-semibold
                           rounded-lg transition-all text-sm"
              >
                Preinscripción
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
