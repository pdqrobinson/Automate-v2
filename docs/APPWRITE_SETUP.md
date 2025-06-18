# Appwrite Backend Setup Guide

This guide will help you set up Appwrite as the backend for your Automation Control Panel.

## Prerequisites

1. An Appwrite Cloud account (https://cloud.appwrite.io) or self-hosted Appwrite instance
2. A new Appwrite project

## Step 1: Create Appwrite Project

1. Go to https://cloud.appwrite.io and create an account
2. Create a new project
3. Note down your Project ID

## Step 2: Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Appwrite configuration:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id-here
VITE_APPWRITE_DATABASE_ID=automation-db
```

## Step 3: Create Database and Collections

### Create Database
1. Go to your Appwrite console
2. Navigate to "Databases"
3. Create a new database with ID: `automation-db`

### Create Collections

Create the following collections with these exact IDs:

#### 1. Users Collection (`users`)
- **Collection ID**: `users`
- **Attributes**:
  - `userId` (string, required) - Appwrite user ID
  - `name` (string, required)
  - `email` (string, required)
  - `role` (string, required) - "admin" or "client"
  - `status` (string, required) - "active" or "inactive"
  - `company` (string, optional)
  - `phone` (string, optional)

#### 2. Clients Collection (`clients`)
- **Collection ID**: `clients`
- **Attributes**:
  - `name` (string, required)
  - `email` (string, required)
  - `company` (string, required)
  - `phone` (string, optional)
  - `status` (string, required) - "active" or "inactive"
  - `workflowCount` (integer, default: 0)
  - `lastActive` (string, optional)
  - `joinDate` (datetime, required)

#### 3. Workflows Collection (`workflows`)
- **Collection ID**: `workflows`
- **Attributes**:
  - `name` (string, required)
  - `description` (string, required)
  - `tags` (string, array) - JSON array of tags
  - `status` (string, required) - "active" or "inactive"
  - `n8nId` (string, optional)
  - `assignedClients` (string, array) - JSON array of client IDs
  - `totalRuns` (integer, default: 0)
  - `successRate` (float, default: 0)
  - `lastRun` (datetime, optional)

#### 4. Messages Collection (`messages`)
- **Collection ID**: `messages`
- **Attributes**:
  - `senderId` (string, required)
  - `recipientId` (string, required)
  - `subject` (string, required)
  - `message` (string, required)
  - `read` (boolean, default: false)
  - `senderType` (string, required) - "admin" or "client"

#### 5. Tickets Collection (`tickets`)
- **Collection ID**: `tickets`
- **Attributes**:
  - `clientId` (string, required)
  - `subject` (string, required)
  - `description` (string, required)
  - `priority` (string, required) - "low", "medium", "high", "urgent"
  - `category` (string, required)
  - `status` (string, required) - "open", "in-progress", "resolved"
  - `messages` (string) - JSON array of message objects

#### 6. Billing Collection (`billing`)
- **Collection ID**: `billing`
- **Attributes**:
  - `clientId` (string, required)
  - `period` (string, required) - e.g., "January 2024"
  - `executions` (integer, required)
  - `cost` (float, required)
  - `status` (string, required) - "current", "paid", "overdue"
  - `dueDate` (datetime, optional)

#### 7. Workflow Runs Collection (`workflow_runs`)
- **Collection ID**: `workflow_runs`
- **Attributes**:
  - `workflowId` (string, required)
  - `clientId` (string, required)
  - `status` (string, required) - "success", "failed", "running"
  - `executionTime` (integer, optional) - in milliseconds
  - `errorMessage` (string, optional)
  - `inputData` (string, optional) - JSON string
  - `outputData` (string, optional) - JSON string

## Step 4: Set Permissions

For each collection, set the following permissions:

### Users Collection
- **Create**: Users (for profile creation)
- **Read**: Users (users can read their own profile)
- **Update**: Users (users can update their own profile)
- **Delete**: None

### Other Collections
- **Create**: Users (authenticated users can create)
- **Read**: Users (authenticated users can read)
- **Update**: Users (authenticated users can update)
- **Delete**: Users (authenticated users can delete)

## Step 5: Authentication Settings

1. Go to "Auth" in your Appwrite console
2. Enable "Email/Password" authentication
3. Disable email verification for development (optional)
4. Set session length as needed

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Try registering a new account
3. Check if the user profile is created in the database
4. Test login functionality

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your domain is added to the platform settings in Appwrite
2. **Permission Denied**: Check collection permissions
3. **Collection Not Found**: Verify collection IDs match exactly
4. **Environment Variables**: Ensure all required env vars are set

### Adding Your Domain:

1. Go to your Appwrite project settings
2. Add your development domain (e.g., `http://localhost:5173`)
3. Add your production domain when deploying

## Next Steps

Once Appwrite is set up:

1. The app will automatically use real authentication
2. All data will be stored in Appwrite collections
3. You can view and manage data through the Appwrite console
4. Set up webhooks for real-time updates (optional)

## Security Considerations

1. Use proper permissions for production
2. Enable email verification for production
3. Set up proper rate limiting
4. Use environment variables for sensitive data
5. Regularly backup your database