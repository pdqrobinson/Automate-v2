import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import AdminDashboard from './components/AdminDashboard'
import ClientDashboard from './components/ClientDashboard'
import LoginPage from './components/LoginPage'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

function AppContent() {
  const { user, userProfile, loading, isImpersonating } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  const isAdmin = userProfile?.role === 'admin'
  const isClient = userProfile?.role === 'client' || isImpersonating

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to={isAdmin ? '/admin' : '/client'} />} 
          />
          <Route 
            path="/admin/*" 
            element={user && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/client/*" 
            element={user && isClient ? <ClientDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={
              user ? 
                <Navigate to={isAdmin ? '/admin' : '/client'} /> : 
                <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App