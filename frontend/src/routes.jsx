import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Pages
import Home from './pages/Home'
import Identity from './pages/Identity'
import EducationOffer from './pages/EducationOffer'
import Linkage from './pages/Linkage'
import Projects from './pages/Projects'
import Teachers from './pages/Teachers'
import SchoolServices from './pages/SchoolServices'
import Services from './pages/Services'
import Transparency from './pages/Transparency'
import PrefichaForm from './pages/PrefichaForm'

// Admin Pages (crear después)
const AdminDashboard = () => <div className="p-8"><h1 className="text-3xl font-bold">Dashboard Admin</h1></div>
const AdminPrefichas = () => <div className="p-8"><h1 className="text-3xl font-bold">Gestión de Prefichas</h1></div>
const AdminStudents = () => <div className="p-8"><h1 className="text-3xl font-bold">Gestión de Estudiantes</h1></div>
const AdminProjects = () => <div className="p-8"><h1 className="text-3xl font-bold">Gestión de Proyectos</h1></div>
const AdminReports = () => <div className="p-8"><h1 className="text-3xl font-bold">Reportes</h1></div>
const AdminSettings = () => <div className="p-8"><h1 className="text-3xl font-bold">Configuración</h1></div>

// Auth Pages (crear después)
const Login = () => <div className="min-h-screen flex items-center justify-center bg-neutral-100"><h1 className="text-3xl font-bold">Login</h1></div>
const Register = () => <div className="min-h-screen flex items-center justify-center bg-neutral-100"><h1 className="text-3xl font-bold">Registro</h1></div>

// Error Pages
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-100">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-primary-500">404</h1>
      <p className="text-2xl text-neutral-600 mb-8">Página no encontrada</p>
      <a href="/" className="btn-primary">Volver al inicio</a>
    </div>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'identidad',
        element: <Identity />
      },
      {
        path: 'oferta-educativa',
        element: <EducationOffer />
      },
      {
        path: 'vinculacion',
        element: <Linkage />
      },
      {
        path: 'proyectos',
        element: <Projects />
      },
      {
        path: 'maestros',
        element: <Teachers />
      },
      {
        path: 'servicios-escolares',
        element: <SchoolServices />
      },
      {
        path: 'servicios',
        element: <Services />
      },
      {
        path: 'transparencia',
        element: <Transparency />
      },
      {
        path: 'preficha',
        element: <PrefichaForm />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'prefichas',
        element: <AdminPrefichas />
      },
      {
        path: 'students',
        element: <AdminStudents />
      },
      {
        path: 'projects',
        element: <AdminProjects />
      },
      {
        path: 'reports',
        element: <AdminReports />
      },
      {
        path: 'settings',
        element: <AdminSettings />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router