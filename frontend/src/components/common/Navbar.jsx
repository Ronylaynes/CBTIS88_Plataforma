import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/identidad', label: 'Identidad' },
    { path: '/oferta-educativa', label: 'Oferta Educativa' },
    { path: '/vinculacion', label: 'Vinculación' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/maestros', label: 'Maestros' },
    { path: '/servicios-escolares', label: 'Servicios Escolares' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/transparencia', label: 'Transparencia' },
  ]

  return (
    <nav className="bg-primary-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">88</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">CBTIS No. 88</h1>
              <p className="text-xs text-gold-300">Formando el Futuro</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
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
              className="ml-4 btn-secondary"
            >
              Preinscripción
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-primary-600 transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-slide-down">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-sm font-medium transition-all ${
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
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center btn-secondary"
            >
              Preinscripción
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar