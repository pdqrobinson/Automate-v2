import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Label } from '@/components/ui/label'
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Play,
  Users,
  RefreshCw,
  Download,
  Tag,
  Activity,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const AdminWorkflows = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    tags: '',
    n8nId: ''
  })

  // Mock workflow data
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Lead Generation',
      description: 'Automated lead capture and qualification system',
      tags: ['sales', 'automation'],
      status: 'active',
      n8nId: 'wf_001',
      assignedClients: 3,
      totalRuns: 245,
      successRate: 96.7,
      lastRun: '2 hours ago',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Email Campaign',
      description: 'Personalized email marketing automation',
      tags: ['marketing', 'email'],
      status: 'active',
      n8nId: 'wf_002',
      assignedClients: 5,
      totalRuns: 189,
      successRate: 94.2,
      lastRun: '1 hour ago',
      createdDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'Data Sync',
      description: 'Synchronize data between CRM and marketing tools',
      tags: ['integration', 'data'],
      status: 'inactive',
      n8nId: 'wf_003',
      assignedClients: 2,
      totalRuns: 67,
      successRate: 89.5,
      lastRun: '2 days ago',
      createdDate: '2024-01-20'
    },
    {
      id: 4,
      name: 'Social Media Posting',
      description: 'Automated social media content distribution',
      tags: ['social', 'content'],
      status: 'active',
      n8nId: 'wf_004',
      assignedClients: 4,
      totalRuns: 156,
      successRate: 98.1,
      lastRun: '30 minutes ago',
      createdDate: '2024-02-15'
    }
  ])

  // Mock client data for assignment
  const clients = [
    { id: 1, name: 'John Smith', company: 'Acme Corp' },
    { id: 2, name: 'Sarah Johnson', company: 'TechStart Inc' },
    { id: 3, name: 'Mike Chen', company: 'Global Solutions' },
    { id: 4, name: 'Emily Davis', company: 'Innovation Labs' }
  ]

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleAddWorkflow = () => {
    const workflow = {
      id: workflows.length + 1,
      ...newWorkflow,
      tags: newWorkflow.tags.split(',').map(tag => tag.trim()),
      status: 'active',
      assignedClients: 0,
      totalRuns: 0,
      successRate: 0,
      lastRun: 'Never',
      createdDate: new Date().toISOString().split('T')[0]
    }
    setWorkflows([...workflows, workflow])
    setNewWorkflow({ name: '', description: '', tags: '', n8nId: '' })
    setIsAddDialogOpen(false)
  }

  const handleTestWorkflow = (workflow) => {
    // Simulate workflow test
    alert(`Testing workflow: ${workflow.name}\n\nThis would trigger a test run with placeholder data.`)
  }

  const handleSyncN8n = () => {
    // Simulate n8n sync
    alert('Syncing with n8n...\n\nThis would fetch the latest workflows from your n8n instance.')
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">
            Manage your n8n workflows and client assignments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSyncN8n}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync n8n
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Workflow
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Workflow</DialogTitle>
                <DialogDescription>
                  Create a new workflow or import from n8n
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input
                    id="workflow-name"
                    value={newWorkflow.name}
                    onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                    placeholder="Lead Generation"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="workflow-description">Description</Label>
                  <Textarea
                    id="workflow-description"
                    value={newWorkflow.description}
                    onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                    placeholder="Automated lead capture and qualification system"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="workflow-tags">Tags (comma-separated)</Label>
                  <Input
                    id="workflow-tags"
                    value={newWorkflow.tags}
                    onChange={(e) => setNewWorkflow({...newWorkflow, tags: e.target.value})}
                    placeholder="sales, automation, leads"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="workflow-n8nid">n8n Workflow ID (optional)</Label>
                  <Input
                    id="workflow-n8nid"
                    value={newWorkflow.n8nId}
                    onChange={(e) => setNewWorkflow({...newWorkflow, n8nId: e.target.value})}
                    placeholder="wf_001"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddWorkflow}>Add Workflow</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Total: {workflows.length}</span>
          <span>Active: {workflows.filter(w => w.status === 'active').length}</span>
        </div>
      </div>

      {/* Workflows Table */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow List</CardTitle>
          <CardDescription>
            All workflows and their performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clients</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{workflow.name}</div>
                      <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {workflow.description}
                      </div>
                      {workflow.n8nId && (
                        <div className="text-xs text-muted-foreground">
                          n8n: {workflow.n8nId}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {workflow.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(workflow.status)}
                      <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                        {workflow.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{workflow.assignedClients}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{workflow.totalRuns} runs</div>
                      <div className="text-muted-foreground">
                        {workflow.successRate}% success
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{workflow.lastRun}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleTestWorkflow(workflow)}>
                          <Play className="mr-2 h-4 w-4" />
                          Test Workflow
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedWorkflow(workflow)
                            setIsAssignDialogOpen(true)
                          }}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Assign to Client
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Activity className="mr-2 h-4 w-4" />
                          View Logs
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assign Workflow Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Workflow to Client</DialogTitle>
            <DialogDescription>
              Select a client to assign the workflow "{selectedWorkflow?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client-select">Select Client</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name} - {client.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAssignDialogOpen(false)}>
              Assign Workflow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminWorkflows

