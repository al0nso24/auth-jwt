import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Perfil from './pages/Perfil'

export default function App() {
  return (
    <AuthProvider>
      {/*basename permite publicar la app en una subcarpeta (ej. GitHub Pages)*/}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}> {/*protege la ruta /perfil*/}
            <Route path="/perfil" element={<Perfil />} />
          </Route>
          <Route path="*" element={<Navigate to="/perfil" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}