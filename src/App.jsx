import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import AdminDashboard from './components/AdminDashboard'
import ClientDashboard from './components/ClientDashboard'
import LoginPage from './components/LoginPage'
import './App.css'

// Auth Context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function App() {
  const [user, setUser] = useState(null)
  const [isImpersonating, setIsImpersonating] = useState(false)
  const [impersonatedClient, setImpersonatedClient] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
    setIsImpersonating(false)
    setImpersonatedClient(null)
  }

  const startImpersonation = (clientData) => {
    setIsImpersonating(true)
    setImpersonatedClient(clientData)
  }

  const stopImpersonation = () => {
    setIsImpersonating(false)
    setImpersonatedClient(null)
  }

  const authValue = {
    user,
    isImpersonating,
    impersonatedClient,
    login,
    logout,
    startImpersonation,
    stopImpersonation
  }

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <LoginPage /> : <Navigate to={user.role === 'admin' ? '/admin' : '/client'} />} 
            />
            <Route 
              path="/admin/*" 
              element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/client/*" 
              element={user && (user.role === 'client' || isImpersonating) ? <ClientDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={
                user ? 
                  <Navigate to={user.role === 'admin' ? '/admin' : '/client'} /> : 
                  <Navigate to="/login" />
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App

