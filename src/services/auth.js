import { account, handleAppwriteError } from '../lib/appwrite'

export const authService = {
  // Create account
  async createAccount(email, password, name) {
    try {
      const response = await account.create('unique()', email, password, name)
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Login
  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password)
      return session
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const user = await account.get()
      return user
    } catch (error) {
      if (error.code === 401) {
        return null // User not authenticated
      }
      handleAppwriteError(error)
    }
  },

  // Logout
  async logout() {
    try {
      await account.deleteSession('current')
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Update user preferences (role, etc.)
  async updatePreferences(prefs) {
    try {
      const response = await account.updatePrefs(prefs)
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  }
}