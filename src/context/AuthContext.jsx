import { createContext, useCallback, useContext, useState } from 'react'
import { loginRequest } from '../services/authService'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'))
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem('user') || 'null')
    )
    const login = async (username, password) => {
        const data = await loginRequest(username, password) // puede lanzar error
        const { accessToken, ...perfil } = data
        delete perfil.refreshToken
        localStorage.setItem('token', accessToken)
        localStorage.setItem('user', JSON.stringify(perfil))
        setToken(accessToken)
        setUser(perfil)
    }
    // useCallback: la función no cambia en cada render (evita bucles en useEffect)
    const logout = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }, [])
    return (
        <AuthContext.Provider
            value={{ token, user, isAuthenticated: !!token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)