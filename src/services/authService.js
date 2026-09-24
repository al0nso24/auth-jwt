// Toda la comunicación con la API de autenticación vive aquí
const API_URL = import.meta.env.VITE_API_URL
// POST /auth/login -> { accessToken, refreshToken, id, username, firstName, ... }
export async function loginRequest(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Credenciales inválidas')
    return data
}
// GET /auth/me (ruta protegida: exige el token en la cabecera Authorization)
export async function getProfile(token) {
    const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (res.status === 401) throw new Error('SESION_EXPIRADA')
    if (!res.ok) throw new Error('No se pudo obtener el perfil')
    return res.json()
}