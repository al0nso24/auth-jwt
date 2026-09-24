import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getProfile } from '../services/authService'

export default function Perfil() {
    const { token, logout } = useAuth() //el jwt actual
    const [perfil, setPerfil] = useState(null) //guarda información del usuario
    const [error, setError] = useState('') //mensaje de error

    useEffect(() => {
        getProfile(token)
            .then(setPerfil)
            .catch((err) => {
                //Cierra la sesión automáticamente cuando el token vence
                if (err.message === 'SESION_EXPIRADA') logout()
                else setError(err.message)
            })
    }, [token, logout])
    
    return (
        <div className="page">
            <header className="topbar">
                <strong>Mi App JWT</strong>
                <button onClick={logout}>Cerrar sesión</button>
            </header>
            <main className="card">
                {error && <p className="error">{error}</p>}
                {!perfil && !error && <p>Cargando perfil...</p>}
                {perfil && (
                    <>
                        <img src={perfil.image} alt="avatar" width="96" />
                        <h1>{perfil.firstName} {perfil.lastName}</h1>
                        <p>Email: {perfil.email}</p>
                        <p>Usuario: {perfil.username}</p>
                        <details>
                            <summary>Ver mi token (solo para aprender)</summary>
                            <code style={{ wordBreak: 'break-all' }}>{token}</code>
                        </details>
                    </>
                )}
            </main>
        </div>
    )
}