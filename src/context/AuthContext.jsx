import { createContext, useCallback, useContext, useState } from 'react'
import { loginRequest } from '../services/authService'

//Crea un componente de datos compartidos (guarda datos del usuario)
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token')) //si ya había un token, se recupera
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem('user') || 'null')
    )

    const login = async (username, password) => {
        const data = await loginRequest(username, password) //puede lanzar error
        const { accessToken, ...perfil } = data
        delete perfil.refreshToken
        //Guarda en localStorage
        localStorage.setItem('token', accessToken)
        localStorage.setItem('user', JSON.stringify(perfil))
        //Actualiza estados
        setToken(accessToken)
        setUser(perfil)
    }

    //useCallback: la función no cambia en cada render (evita bucles en useEffect)
    const logout = useCallback(() => {
        //Borra el token del navegador y los datos del usuario
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }, [])

    return (
        //token = el jwt
        <AuthContext.Provider
            value={{ token, user, isAuthenticated: !!token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

//Para que cualquier componente puede acceder
export const useAuth = () => useContext(AuthContext)