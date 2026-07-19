import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import {
  FaHome, FaUsers, FaFileAlt, FaProjectDiagram,
  FaChartBar, FaCog, FaSignOutAlt, FaBars, FaTimes, FaBell
} from 'react-icons/fa'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const menuItems = [
    { icon: <FaHome />,           label: 'Dashboard',    path: '/admin/dashboard' },
    { icon: <FaFileAlt />,        label: 'Prefichas',    path: '/admin/prefichas' },
    { icon: <FaUsers />,          label: 'Estudiantes',  path: '/admin/students' },
    { icon: <FaProjectDiagram />, label: 'Proyectos',    path: '/admin/projects' },
    { icon: <FaChartBar />,       label: 'Reportes',     path: '/admin/reports' },
    { icon: <FaCog />,            label: 'Configuración',path: '/admin/settings' },
  ]

  return (
    <div className="min-h-screen bg-neutral-100 flex relative">

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        ${sidebarOpen ? 'w-64' : 'w-0 lg:w-20'}
        bg-primary-500 text-white transition-all duration-300
        flex flex-col overflow-hidden
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-primary-400 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-gold-400
                            overflow-hidden flex items-center justify-center
                            flex-shrink-0">
              <img
                src="/assets/cbtis_88.png"
                alt="CBTIS 88"
                className="w-10 h-10 object-contain"
              />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-sm">CBTIS 88</h2>
                <p className="text-xs text-gold-300">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item, i) => (
            <Link key={i} to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3
                         hover:bg-primary-600 transition-colors gap-3">
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-400 flex-shrink-0">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-2 py-2
                       hover:bg-primary-600 rounded-lg transition-colors">
            <FaSignOutAlt className="text-lg flex-shrink-0" />
            {sidebarOpen && (
              <span className="text-sm whitespace-nowrap">Cerrar Sesión</span>
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm h-14 md:h-16 flex items-center
                           justify-between px-4 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-600 hover:text-primary-500
                       transition-colors p-1">
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <button className="relative text-neutral-600
                               hover:text-primary-500 p-1">
              <FaBell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500
                               rounded-full text-white text-xs
                               flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-500
                              rounded-full flex items-center justify-center
                              text-white font-bold text-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-medium text-neutral-900">
                  {user?.name || 'Administrador'}
                </p>
                <p className="text-xs text-neutral-500">
                  {user?.role || 'Admin'}
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout