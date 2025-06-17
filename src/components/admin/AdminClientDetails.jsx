import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  ArrowLeft,
  Settings,
  MessageSquare,
  DollarSign,
  BarChart3,
  Layout,
  Plus,
  Trash2,
  Send,
  Download,
  Eye
} from 'lucide-react'

const AdminClientDetails = () => {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  // Mock client data
  const client = {
    id: clientId,
    name: 'John Smith',
    email: 'john@acmecorp.com',
    company: 'Acme Corp',
    phone: '+1 (555) 123-4567',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    totalSpent: 2450.00,
    currentPlan: 'Professional',
    dashboardConfig: {
      layout: 'grid',
      widgets: ['workflows', 'usage', 'recent-activity', 'notifications']
    }
  }

  // Mock dashboard widgets
  const availableWidgets = [
    { id: 'workflows', name: 'Workflows Overview', description: 'Shows assigned workflows and their status' },
    { id: 'usage', name: 'Usage Statistics', description: 'Displays automation usage and metrics' },
    { id: 'recent-activity', name: 'Recent Activity', description: 'Shows recent workflow executions' },
    { id: 'notifications', name: 'Notifications', description: 'Important alerts and updates' },
    { id: 'billing', name: 'Billing Summary', description: 'Current billing period and usage' },
    { id: 'support', name: 'Support Tickets', description: 'Open support requests' }
  ]

  // Mock messages
  const messages = [
    {
      id: 1,
      from: 'admin',
      message: 'Your Lead Generation workflow has been updated with new filters.',
      timestamp: '2024-01-20 10:30 AM',
      status: 'read'
    },
    {
      id: 2,
      from: 'client',
      message: 'Can you help me set up a new automation for customer onboarding?',
      timestamp: '2024-01-19 2:15 PM',
      status: 'unread'
    },
    {
      id: 3,
      from: 'admin',
      message: 'Welcome to our automation platform! Your workflows are now active.',
      timestamp: '2024-01-15 9:00 AM',
      status: 'read'
    }
  ]

  // Mock usage data
  const usageData = [
    { month: 'Jan 2024', executions: 245, cost: 245.00, plan: 'Professional' },
    { month: 'Dec 2023', executions: 189, cost: 189.00, plan: 'Professional' },
    { month: 'Nov 2023', executions: 267, cost: 267.00, plan: 'Professional' },
    { month: 'Oct 2023', executions: 198, cost: 198.00, plan: 'Basic' }
  ]

  const [dashboardConfig, setDashboardConfig] = useState(client.dashboardConfig)

  const handleSendMessage = () => {
    // Simulate sending message
    alert(`Message sent to ${client.name}:\n\n${newMessage}`)
    setNewMessage('')
    setIsMessageDialogOpen(false)
  }

  const handleSaveDashboardConfig = () => {
    // Simulate saving dashboard configuration
    alert('Dashboard configuration saved successfully!')
    setIsCustomizeDialogOpen(false)
  }

  const toggleWidget = (widgetId) => {
    setDashboardConfig(prev => ({
      ...prev,
      widgets: prev.widgets.includes(widgetId)
        ? prev.widgets.filter(id => id !== widgetId)
        : [...prev.widgets, widgetId]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/clients')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clients
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{client.name}</h1>
          <p className="text-muted-foreground">{client.company}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Message to {client.name}</DialogTitle>
                <DialogDescription>
                  Send a direct message to the client regarding their workflows or account
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Layout className="w-4 h-4 mr-2" />
                Customize Dashboard
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Customize Client Dashboard</DialogTitle>
                <DialogDescription>
                  Configure the dashboard layout and widgets for {client.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label>Dashboard Layout</Label>
                  <Select value={dashboardConfig.layout} onValueChange={(value) => setDashboardConfig(prev => ({...prev, layout: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid Layout</SelectItem>
                      <SelectItem value="list">List Layout</SelectItem>
                      <SelectItem value="compact">Compact Layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label>Available Widgets</Label>
                  <div className="grid gap-3">
                    {availableWidgets.map((widget) => (
                      <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{widget.name}</div>
                          <div className="text-sm text-muted-foreground">{widget.description}</div>
                        </div>
                        <Switch
                          checked={dashboardConfig.widgets.includes(widget.id)}
                          onCheckedChange={() => toggleWidget(widget.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCustomizeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveDashboardConfig}>
                  Save Configuration
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="billing">Billing & Usage</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                  {client.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Last active: {client.lastActive}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${client.totalSpent.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  Current plan: {client.currentPlan}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Join Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{new Date(client.joinDate).toLocaleDateString()}</div>
                <p className="text-xs text-muted-foreground">
                  Member for {Math.floor((new Date() - new Date(client.joinDate)) / (1000 * 60 * 60 * 24))} days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dashboard Layout</CardTitle>
                <Layout className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{client.dashboardConfig.layout}</div>
                <p className="text-xs text-muted-foreground">
                  {client.dashboardConfig.widgets.length} widgets enabled
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Full Name</Label>
                  <Input value={client.name} readOnly />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={client.email} readOnly />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input value={client.company} readOnly />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={client.phone} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>
                Communication history with {client.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`p-4 rounded-lg border ${message.from === 'admin' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={message.from === 'admin' ? 'default' : 'secondary'}>
                        {message.from === 'admin' ? 'Admin' : 'Client'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Month</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">
                  Workflow executions
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Bill</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$245.00</div>
                <p className="text-xs text-muted-foreground">
                  Due in 15 days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{client.currentPlan}</div>
                <p className="text-xs text-muted-foreground">
                  $1.00 per execution
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>
                Monthly usage and billing history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageData.map((usage, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{usage.month}</div>
                      <div className="text-sm text-muted-foreground">Plan: {usage.plan}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{usage.executions} executions</div>
                      <div className="text-sm text-muted-foreground">${usage.cost.toFixed(2)}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage client account preferences and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Account Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable client access
                  </p>
                </div>
                <Switch checked={client.status === 'active'} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send workflow notifications via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>API Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow client to access API endpoints
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Billing Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify client of billing updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminClientDetails