import { useState, useEffect, createContext, useContext } from 'react'
import { authService } from '../services/auth'
import { databaseService } from '../services/database'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isImpersonating, setIsImpersonating] = useState(false)
  const [impersonatedClient, setImpersonatedClient] = useState(null)

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        // Get user profile from database
        try {
          const profile = await databaseService.getUser(currentUser.$id)
          setUserProfile(profile)
        } catch (error) {
          // If profile doesn't exist, create one
          const newProfile = {
            userId: currentUser.$id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.prefs?.role || 'client',
            status: 'active',
            company: '',
            phone: ''
          }
          const createdProfile = await databaseService.createUser(newProfile)
          setUserProfile(createdProfile)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      await authService.login(email, password)
      await checkAuth()
      return true
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password, name, role = 'client') => {
    try {
      setLoading(true)
      // Create account
      const newUser = await authService.createAccount(email, password, name)
      
      // Set role in preferences
      await authService.updatePreferences({ role })
      
      // Login automatically
      await authService.login(email, password)
      await checkAuth()
      
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      setUserProfile(null)
      setIsImpersonating(false)
      setImpersonatedClient(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const startImpersonation = (clientData) => {
    setIsImpersonating(true)
    setImpersonatedClient(clientData)
  }

  const stopImpersonation = () => {
    setIsImpersonating(false)
    setImpersonatedClient(null)
  }

  const updateProfile = async (profileData) => {
    try {
      const updatedProfile = await databaseService.updateUser(userProfile.$id, profileData)
      setUserProfile(updatedProfile)
      return updatedProfile
    } catch (error) {
      console.error('Profile update failed:', error)
      throw error
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    isImpersonating,
    impersonatedClient,
    login,
    register,
    logout,
    startImpersonation,
    stopImpersonation,
    updateProfile,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}