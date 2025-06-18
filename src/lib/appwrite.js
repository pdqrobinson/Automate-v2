import { Client, Account, Databases, Query, ID } from 'appwrite'

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

// Initialize services
export const account = new Account(client)
export const databases = new Databases(client)

// Database and collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
export const COLLECTIONS = {
  USERS: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  WORKFLOWS: import.meta.env.VITE_APPWRITE_WORKFLOWS_COLLECTION_ID,
  CLIENTS: import.meta.env.VITE_APPWRITE_CLIENTS_COLLECTION_ID,
  MESSAGES: import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID,
  TICKETS: import.meta.env.VITE_APPWRITE_TICKETS_COLLECTION_ID,
  BILLING: import.meta.env.VITE_APPWRITE_BILLING_COLLECTION_ID,
  WORKFLOW_RUNS: import.meta.env.VITE_APPWRITE_WORKFLOW_RUNS_COLLECTION_ID
}

// Export Query for use in components
export { Query, ID }

// Helper function to handle Appwrite errors
export const handleAppwriteError = (error) => {
  console.error('Appwrite Error:', error)
  if (error.code === 401) {
    throw new Error('Authentication required')
  }
  if (error.code === 404) {
    throw new Error('Resource not found')
  }
  throw new Error(error.message || 'An error occurred')
}