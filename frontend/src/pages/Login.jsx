// frontend/src/pages/Login.jsx
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate   = useNavigate()

  const [form,     setForm]     = useState({ email: '', password: '' })
  const [error,    setError]    = useState(null)
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setCargando(true)
    const result = await login({ email: form.email, password: form.password })
    if (result.success) {
      navigate('/admin')
    } else {
      setError('Correo o contraseña incorrectos.')
    }
    setCargando(false)
  }

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <div style={s.logoWrap}>
          <img src="/assets/images/icons/cbtis88.png" alt="CBTIS 88" style={s.logo} />
        </div>
        <h1 style={s.titulo}>CBTIS No. 88</h1>
        <p style={s.subtitulo}>Acceso al Panel Institucional</p>

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Correo institucional</label>
            <input
              type="email" required placeholder="correo@cbtis88.edu.mx"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              style={s.input}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Contraseña</label>
            <input
              type="password" required placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              style={s.input}
            />
          </div>
          {error && <div style={s.error}>{error}</div>}
          <button type="submit" disabled={cargando}
            style={{ ...s.btn, ...(cargando ? s.btnDis : {}) }}>
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p style={s.nota}>Solo personal autorizado del CBTIS No. 88</p>
      </div>
    </div>
  )
}

const s = {
  bg:        { minHeight:'100vh', background:'#1a0008', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem', fontFamily:"'Segoe UI',sans-serif" },
  card:      { background:'#fff', borderRadius:18, padding:'2.5rem 2rem', width:'100%', maxWidth:400, boxShadow:'0 24px 60px rgba(107,0,32,.35)', textAlign:'center' },
  logoWrap:  { width:90, height:90, borderRadius:'50%', border:'3px solid #FFD700', overflow:'hidden', margin:'0 auto 1rem', background:'#fff' },
  logo:      { width:'100%', height:'100%', objectFit:'cover' },
  titulo:    { fontWeight:800, fontSize:'1.4rem', color:'#6B0020', margin:'0 0 4px' },
  subtitulo: { fontSize:'0.85rem', color:'#888', marginBottom:'1.8rem' },
  form:      { textAlign:'left', display:'flex', flexDirection:'column', gap:'1rem' },
  field:     { display:'flex', flexDirection:'column', gap:5 },
  label:     { fontSize:'0.8rem', fontWeight:700, color:'#6B0020', textTransform:'uppercase', letterSpacing:'.06em' },
  input:     { padding:'0.6rem 0.9rem', borderRadius:8, border:'1.5px solid rgba(107,0,32,.2)', fontSize:'0.95rem', outline:'none', fontFamily:'inherit' },
  error:     { background:'#FFC7CE', color:'#9C0006', borderRadius:8, padding:'0.6rem 1rem', fontSize:'0.85rem', fontWeight:500 },
  btn:       { padding:'0.75rem', background:'#6B0020', color:'#FFD700', border:'none', borderRadius:10, fontWeight:700, fontSize:'1rem', cursor:'pointer', fontFamily:'inherit', marginTop:4 },
  btnDis:    { background:'#ccc', color:'#888', cursor:'not-allowed' },
  nota:      { marginTop:'1.2rem', fontSize:'0.75rem', color:'#bbb' },
}
