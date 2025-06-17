import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Workflow, 
  Activity, 
  TrendingUp, 
  UserPlus, 
  Plus,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const AdminHome = () => {
  // Mock data for demonstration
  const stats = {
    totalClients: 24,
    totalWorkflows: 18,
    activeWorkflows: 15,
    totalRuns: 1247,
    successRate: 94.2
  }

  const recentActivity = [
    { id: 1, action: 'Workflow assigned', client: 'Acme Corp', workflow: 'Lead Generation', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Client added', client: 'TechStart Inc', workflow: null, time: '4 hours ago', status: 'info' },
    { id: 3, action: 'Workflow failed', client: 'Global Solutions', workflow: 'Data Sync', time: '6 hours ago', status: 'error' },
    { id: 4, action: 'Credentials updated', client: 'Innovation Labs', workflow: 'Email Campaign', time: '1 day ago', status: 'success' },
  ]

  const workflowData = [
    { name: 'Mon', runs: 45, success: 42 },
    { name: 'Tue', runs: 52, success: 48 },
    { name: 'Wed', runs: 38, success: 36 },
    { name: 'Thu', runs: 61, success: 58 },
    { name: 'Fri', runs: 55, success: 52 },
    { name: 'Sat', runs: 28, success: 26 },
    { name: 'Sun', runs: 32, success: 30 },
  ]

  const clientActivityData = [
    { name: 'Acme Corp', workflows: 5 },
    { name: 'TechStart Inc', workflows: 3 },
    { name: 'Global Solutions', workflows: 4 },
    { name: 'Innovation Labs', workflows: 2 },
    { name: 'Digital Agency', workflows: 6 },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your automation management system
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Assign Workflow
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWorkflows}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeWorkflows} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRuns.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              workflows running
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Performance</CardTitle>
            <CardDescription>
              Daily workflow runs and success rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workflowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="runs" fill="#8884d8" name="Total Runs" />
                <Bar dataKey="success" fill="#82ca9d" name="Successful" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Active Clients</CardTitle>
            <CardDescription>
              Clients by number of assigned workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientActivityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="workflows" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest actions and events in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border">
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.action}</span>
                    {activity.workflow && (
                      <Badge variant="secondary">{activity.workflow}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Client: {activity.client}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminHome

// Function to generate customizable reports
const generateReport = (type) => {
  // Placeholder logic for generating reports
  console.log(`Generating ${type} report...`);
  // Implement PDF or CSV export logic here
}

// Example usage of the new function
generateReport('workflow performance');

