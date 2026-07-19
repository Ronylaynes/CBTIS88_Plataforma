// frontend/src/components/common/PrivateRoute.jsx
// Protege rutas que solo puede ver personal autorizado del instituto.
// Si no hay sesión  → redirige a /login
// Si rol no coincide → redirige a /

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@context/AuthContext'

export default function PrivateRoute({ children, rolesPermitidos = ['admin'] }) {
  const { isAuthenticated, user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', background:'#1a0008', display:'flex',
                    alignItems:'center', justifyContent:'center',
                    fontFamily:"'Segoe UI',sans-serif" }}>
        <div style={{ textAlign:'center', color:'#FFD700' }}>
          <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>⚙️</div>
          <p style={{ fontSize:'1rem', fontWeight:600 }}>Verificando acceso...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated)                                    return <Navigate to="/login"  replace />
  if (!rolesPermitidos.includes(user?.role))               return <Navigate to="/"       replace />

  return children
}
