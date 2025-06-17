import { useState } from 'react'
import { useAuth } from '../../App'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
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
  Workflow, 
  Settings, 
  Plus, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock,
  Key,
  Send,
  TrendingUp,
  Calendar
} from 'lucide-react'

const ClientHome = () => {
  const { user, isImpersonating, impersonatedClient } = useAuth()
  const [isCredentialsDialogOpen, setIsCredentialsDialogOpen] = useState(false)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [automationRequest, setAutomationRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    tools: ''
  })

  const currentUser = isImpersonating ? impersonatedClient : user

  // Mock assigned workflows data
  const assignedWorkflows = [
    {
      id: 1,
      name: 'Lead Generation',
      description: 'Automated lead capture and qualification system',
      status: 'active',
      totalRuns: 45,
      successRate: 96.7,
      lastRun: '2 hours ago',
      nextRun: 'In 4 hours',
      credentialsConfigured: true,
      requiredCredentials: ['CRM API', 'Email Service']
    },
    {
      id: 2,
      name: 'Email Campaign',
      description: 'Personalized email marketing automation',
      status: 'active',
      totalRuns: 28,
      successRate: 94.2,
      lastRun: '1 day ago',
      nextRun: 'Tomorrow 9:00 AM',
      credentialsConfigured: false,
      requiredCredentials: ['Email Provider', 'Analytics API']
    },
    {
      id: 3,
      name: 'Social Media Posting',
      description: 'Automated social media content distribution',
      status: 'inactive',
      totalRuns: 12,
      successRate: 100,
      lastRun: '1 week ago',
      nextRun: 'Paused',
      credentialsConfigured: true,
      requiredCredentials: ['Twitter API', 'LinkedIn API', 'Facebook API']
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const handleManageCredentials = (workflow) => {
    setSelectedWorkflow(workflow)
    setIsCredentialsDialogOpen(true)
  }

  const handleSubmitRequest = () => {
    // Simulate request submission
    alert(`Automation request submitted!\n\nTitle: ${automationRequest.title}\nPriority: ${automationRequest.priority}\n\nYour request has been sent to the admin team.`)
    setAutomationRequest({ title: '', description: '', priority: 'medium', tools: '' })
    setIsRequestDialogOpen(false)
  }

  const stats = {
    totalWorkflows: assignedWorkflows.length,
    activeWorkflows: assignedWorkflows.filter(w => w.status === 'active').length,
    totalRuns: assignedWorkflows.reduce((sum, w) => sum + w.totalRuns, 0),
    avgSuccessRate: assignedWorkflows.reduce((sum, w) => sum + w.successRate, 0) / assignedWorkflows.length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {currentUser?.name}</h1>
          <p className="text-muted-foreground">
            Manage your assigned workflows and automation credentials
          </p>
        </div>
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Request Automation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request New Automation</DialogTitle>
              <DialogDescription>
                Describe the automation you need and our team will set it up for you
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="request-title">Automation Title</Label>
                <Input
                  id="request-title"
                  value={automationRequest.title}
                  onChange={(e) => setAutomationRequest({...automationRequest, title: e.target.value})}
                  placeholder="e.g., Customer Onboarding Automation"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="request-description">Description</Label>
                <Textarea
                  id="request-description"
                  value={automationRequest.description}
                  onChange={(e) => setAutomationRequest({...automationRequest, description: e.target.value})}
                  placeholder="Describe what you want to automate, the desired outcome, and any specific requirements..."
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="request-priority">Priority</Label>
                <Select value={automationRequest.priority} onValueChange={(value) => setAutomationRequest({...automationRequest, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="request-tools">Tools/Platforms Involved</Label>
                <Input
                  id="request-tools"
                  value={automationRequest.tools}
                  onChange={(e) => setAutomationRequest({...automationRequest, tools: e.target.value})}
                  placeholder="e.g., Salesforce, Mailchimp, Slack"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest}>
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <div className="text-2xl font-bold">{stats.totalRuns}</div>
            <p className="text-xs text-muted-foreground">
              All time executions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Average across workflows
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Run</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4h</div>
            <p className="text-xs text-muted-foreground">
              Lead Generation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Your Workflows</CardTitle>
          <CardDescription>
            Workflows assigned to you and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {assignedWorkflows.map((workflow) => (
              <Card key={workflow.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(workflow.status)}
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                        {workflow.status}
                      </Badge>
                      {!workflow.credentialsConfigured && (
                        <Badge variant="destructive">Credentials Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {workflow.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Runs:</span>
                        <div className="font-medium">{workflow.totalRuns}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Success Rate:</span>
                        <div className="font-medium">{workflow.successRate}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Run:</span>
                        <div className="font-medium">{workflow.lastRun}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Run:</span>
                        <div className="font-medium">{workflow.nextRun}</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleManageCredentials(workflow)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Credentials
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credentials Management Dialog */}
      <Dialog open={isCredentialsDialogOpen} onOpenChange={setIsCredentialsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Credentials - {selectedWorkflow?.name}</DialogTitle>
            <DialogDescription>
              Configure the credentials required for this workflow to run properly
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedWorkflow?.requiredCredentials.map((credential, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    <h4 className="font-medium">{credential}</h4>
                  </div>
                  <Badge variant={index === 0 ? 'default' : 'secondary'}>
                    {index === 0 ? 'Configured' : 'Not Configured'}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`credential-${index}`}>API Key / Token</Label>
                  <Input
                    id={`credential-${index}`}
                    type="password"
                    placeholder="Enter your API key or token"
                    defaultValue={index === 0 ? '••••••••••••••••' : ''}
                  />
                </div>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCredentialsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCredentialsDialogOpen(false)}>
              Save Credentials
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ClientHome

