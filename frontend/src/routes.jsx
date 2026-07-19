// frontend/src/routes.jsx
import { createBrowserRouter } from 'react-router-dom'
import MainLayout   from './layouts/MainLayout'
import AdminLayout  from './layouts/AdminLayout'
import PrivateRoute from './components/common/PrivateRoute'

// ── Páginas públicas ──────────────────────────────────────────
import Home           from './pages/Home'
import Identity       from './pages/Identity'
import EducationOffer from './pages/EducationOffer'
import Linkage        from './pages/Linkage'
import Projects       from './pages/Projects'
import Teachers       from './pages/Teachers'
import SchoolServices from './pages/SchoolServices'
import Services       from './pages/Services'
import Transparency   from './pages/Transparency'
import PrefichaForm   from './pages/PrefichaForm'

// ── Autenticación ─────────────────────────────────────────────
import Login from './pages/Login'

// ── Admin ─────────────────────────────────────────────────────
import Admin from './pages/Admin'

// ── 404 ───────────────────────────────────────────────────────
const NotFound = () => (
  <div style={{
    minHeight:'100vh', display:'flex', alignItems:'center',
    justifyContent:'center', fontFamily:"'Segoe UI',sans-serif",
    background:'#1a0008', color:'#fff', flexDirection:'column', gap:'1rem'
  }}>
    <h1 style={{ fontSize:'6rem', fontWeight:800, color:'#FFD700', margin:0 }}>404</h1>
    <p style={{ fontSize:'1.2rem', color:'rgba(255,255,255,.7)' }}>Página no encontrada</p>
    <a href="/" style={{
      padding:'0.6rem 1.4rem', background:'#6B0020', color:'#FFD700',
      borderRadius:8, fontWeight:700, textDecoration:'none'
    }}>
      Volver al inicio
    </a>
  </div>
)

const router = createBrowserRouter([

  // ── Rutas públicas ──────────────────────────────────────────
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true,                 element: <Home />           },
      { path: 'identidad',           element: <Identity />       },
      { path: 'oferta-educativa',    element: <EducationOffer /> },
      { path: 'vinculacion',         element: <Linkage />        },
      // ✅ Ruta actualizada: /actividades-academicas
      { path: 'actividades-academicas', element: <Projects />    },
      { path: 'maestros',            element: <Teachers />       },
      { path: 'servicios-escolares', element: <SchoolServices /> },
      { path: 'servicios',           element: <Services />       },
      { path: 'transparencia',       element: <Transparency />   },
      { path: 'preficha',            element: <PrefichaForm />   },
      // ✅ Redirige /proyectos a /actividades-academicas
      { path: 'proyectos',           element: <Projects />       },
    ]
  },

  // ── Login ───────────────────────────────────────────────────
  {
    path: '/login',
    element: <Login />,
  },

  // ── Admin protegido ─────────────────────────────────────────
  {
    path: '/admin',
    element: (
      <PrivateRoute rolesPermitidos={['admin', 'teacher', 'servicios_escolares']}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true,          element: <Admin /> },
      { path: 'prefichas',    element: <Admin seccionInicial="prefichas" /> },
      { path: 'usuarios',     element: <Admin seccionInicial="usuarios" /> },
    ]
  },

  // ── Catch-all ───────────────────────────────────────────────
  { path: '*', element: <NotFound /> }
])

export default router
