import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { 
  FaHome, 
  FaUsers, 
  FaFileAlt, 
  FaProjectDiagram, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell
} from 'react-icons/fa'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <FaFileAlt />, label: 'Prefichas', path: '/admin/prefichas' },
    { icon: <FaUsers />, label: 'Estudiantes', path: '/admin/students' },
    { icon: <FaProjectDiagram />, label: 'Proyectos', path: '/admin/projects' },
    { icon: <FaChartBar />, label: 'Reportes', path: '/admin/reports' },
    { icon: <FaCog />, label: 'Configuración', path: '/admin/settings' }
  ]

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary-500 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-primary-400">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">88</span>
                </div>
                <div>
                  <h2 className="font-bold">CBTIS 88</h2>
                  <p className="text-xs text-gold-300">Admin Panel</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl font-bold">88</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-6 py-3 hover:bg-primary-600 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-primary-400">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="text-xl" />
            {sidebarOpen && <span className="ml-4">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-600 hover:text-primary-500 transition-colors"
          >
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div className="flex items-center space-x-4">
            <button className="relative text-neutral-600 hover:text-primary-500">
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-neutral-900">{user?.name || 'Administrador'}</p>
                <p className="text-xs text-neutral-500">{user?.role || 'Admin'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout