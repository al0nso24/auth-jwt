import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

//"Guardia" de rutas: si no hay sesión, redirige al login
export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth()
    const location = useLocation() //guarda la url actual
    if (!isAuthenticated) {
        //Guardamos a dónde quería ir para regresarlo después del login
        //replace evita que la persona vuelva atrás con el botón del navegador a la página protegida
        return <Navigate to="/login" replace state={{ from: location }} />
    }
    return <Outlet /> //muestra la ruta hija (la página privada)
}