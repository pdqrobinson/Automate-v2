import { databases, DATABASE_ID, COLLECTIONS, Query, ID, handleAppwriteError } from '../lib/appwrite'

export const databaseService = {
  // Users
  async createUser(userData) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        ID.unique(),
        userData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async getUser(userId) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId,
        userData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Clients
  async getClients() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CLIENTS,
        [Query.orderDesc('$createdAt')]
      )
      return response.documents
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async createClient(clientData) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CLIENTS,
        ID.unique(),
        clientData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async updateClient(clientId, clientData) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.CLIENTS,
        clientId,
        clientData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async deleteClient(clientId) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.CLIENTS,
        clientId
      )
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Workflows
  async getWorkflows() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.WORKFLOWS,
        [Query.orderDesc('$createdAt')]
      )
      return response.documents
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async createWorkflow(workflowData) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.WORKFLOWS,
        ID.unique(),
        workflowData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async updateWorkflow(workflowId, workflowData) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.WORKFLOWS,
        workflowId,
        workflowData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async deleteWorkflow(workflowId) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.WORKFLOWS,
        workflowId
      )
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Messages
  async getMessages(userId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        [
          Query.equal('recipientId', userId),
          Query.orderDesc('$createdAt')
        ]
      )
      return response.documents
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async createMessage(messageData) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        ID.unique(),
        messageData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Support Tickets
  async getTickets(userId = null) {
    try {
      const queries = [Query.orderDesc('$createdAt')]
      if (userId) {
        queries.push(Query.equal('clientId', userId))
      }
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.TICKETS,
        queries
      )
      return response.documents
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async createTicket(ticketData) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.TICKETS,
        ID.unique(),
        ticketData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async updateTicket(ticketId, ticketData) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.TICKETS,
        ticketId,
        ticketData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Billing
  async getBillingRecords(clientId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.BILLING,
        [
          Query.equal('clientId', clientId),
          Query.orderDesc('$createdAt')
        ]
      )
      return response.documents
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async createBillingRecord(billingData) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.BILLING,
        ID.unique(),
        billingData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  // Workflow Runs
  async getWorkflowRuns(workflowId = null, clientId = null) {
    try {
      const queries = [Query.orderDesc('$createdAt')]
      if (workflowId) {
        queries.push(Query.equal('workflowId', workflowId))
      }
      if (clientId) {
        queries.push(Query.equal('clientId', clientId))
      }
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.WORKFLOW_RUNS,
        queries
      )
      return response.documents
    } catch (error) {
      handleAppwriteError(error)
    }
  },

  async createWorkflowRun(runData) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.WORKFLOW_RUNS,
        ID.unique(),
        runData
      )
      return response
    } catch (error) {
      handleAppwriteError(error)
    }
  }
}