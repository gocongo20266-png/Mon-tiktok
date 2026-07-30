import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'
import Auth from './pages/Auth'
import Feed from './pages/Feed'
import Upload from './pages/Upload'

function Shell() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return null
  if (!session) return <Auth />

  const showNav = location.pathname !== '/upload'

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      {showNav && (
        <nav className="tabbar">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="tab-icon">▷</span>
            Fil
          </NavLink>
          <NavLink to="/upload" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="tab-icon">＋</span>
            Ajouter
          </NavLink>
        </nav>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  )
}
