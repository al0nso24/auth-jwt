import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('emilys')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)
    
    if (isAuthenticated) return <Navigate to="/perfil" replace />
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setCargando(true)
        try {
            await login(username, password)
            navigate('/perfil', { replace: true })
        } catch (err) {
            setError(err.message)
        } finally {
            setCargando(false)
        }
    }
    return (
        <div className="login-page">
            <form className="card" onSubmit={handleSubmit}>
                <h1>Login con JWT</h1>
                <label>
                    Usuario
                    <input value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Contraseña
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={cargando}>
                    {cargando ? 'Verificando...' : 'Ingresar'}
                </button>
                <small>Prueba: emilys / emilyspass</small>
            </form>
        </div>
    )
}