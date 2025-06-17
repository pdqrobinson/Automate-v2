import { useState } from 'react'
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
  MessageSquare,
  Plus,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  UserCheck
} from 'lucide-react'

const ClientCommunication = () => {
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    priority: 'medium',
    category: 'general',
    description: ''
  })

  // Mock tickets data
  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Help with Lead Generation Workflow',
      status: 'open',
      priority: 'high',
      category: 'workflow',
      created: '2024-01-20 10:30 AM',
      lastUpdate: '2024-01-20 2:15 PM',
      messages: [
        {
          id: 1,
          from: 'client',
          message: 'I need help setting up filters for the lead generation workflow. The current setup is capturing too many irrelevant leads.',
          timestamp: '2024-01-20 10:30 AM'
        },
        {
          id: 2,
          from: 'admin',
          message: 'I can help you with that. Let me review your current workflow configuration and suggest some improvements.',
          timestamp: '2024-01-20 2:15 PM'
        }
      ]
    },
    {
      id: 'TKT-002',
      subject: 'Billing Question',
      status: 'resolved',
      priority: 'medium',
      category: 'billing',
      created: '2024-01-18 9:00 AM',
      lastUpdate: '2024-01-18 4:30 PM',
      messages: [
        {
          id: 1,
          from: 'client',
          message: 'I have a question about my last invoice. Can you explain the charges?',
          timestamp: '2024-01-18 9:00 AM'
        },
        {
          id: 2,
          from: 'admin',
          message: 'The charges are based on workflow executions. I\'ve sent you a detailed breakdown via email.',
          timestamp: '2024-01-18 4:30 PM'
        }
      ]
    },
    {
      id: 'TKT-003',
      subject: 'New Automation Request',
      status: 'in-progress',
      priority: 'low',
      category: 'feature-request',
      created: '2024-01-15 11:00 AM',
      lastUpdate: '2024-01-19 1:00 PM',
      messages: [
        {
          id: 1,
          from: 'client',
          message: 'Can you create an automation for customer onboarding emails?',
          timestamp: '2024-01-15 11:00 AM'
        },
        {
          id: 2,
          from: 'admin',
          message: 'I\'m working on this automation. It should be ready by next week.',
          timestamp: '2024-01-19 1:00 PM'
        }
      ]
    }
  ]

  // Mock messages
  const messages = [
    {
      id: 1,
      from: 'admin',
      subject: 'Workflow Update',
      message: 'Your Lead Generation workflow has been updated with new filters as requested.',
      timestamp: '2024-01-20 3:45 PM',
      read: false
    },
    {
      id: 2,
      from: 'admin',
      subject: 'Monthly Report',
      message: 'Your monthly automation report is now available in the dashboard.',
      timestamp: '2024-01-19 10:00 AM',
      read: true
    },
    {
      id: 3,
      from: 'admin',
      subject: 'Welcome!',
      message: 'Welcome to our automation platform! Your workflows are now active and ready to use.',
      timestamp: '2024-01-15 9:00 AM',
      read: true
    }
  ]

  const handleCreateTicket = () => {
    // Simulate ticket creation
    alert(`Support ticket created!\n\nSubject: ${newTicket.subject}\nPriority: ${newTicket.priority}\nCategory: ${newTicket.category}`)
    setNewTicket({ subject: '', priority: 'medium', category: 'general', description: '' })
    setIsNewTicketDialogOpen(false)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'default'
      case 'low':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Communication</h1>
          <p className="text-muted-foreground">
            Manage support tickets and messages
          </p>
        </div>
        <Dialog open={isNewTicketDialogOpen} onOpenChange={setIsNewTicketDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Support Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Submit a new support request or question
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({...newTicket, priority: value})}>
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
                <Label htmlFor="category">Category</Label>
                <Select value={newTicket.category} onValueChange={(value) => setNewTicket({...newTicket, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Question</SelectItem>
                    <SelectItem value="workflow">Workflow Issue</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="feature-request">Feature Request</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  placeholder="Provide detailed information about your request..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewTicketDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTicket}>
                <Send className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>
              Your open and recent support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(ticket.status)}
                        <span className="font-medium">{ticket.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>#{ticket.id}</span>
                        <Badge variant={getPriorityColor(ticket.priority)} className="text-xs">
                          {ticket.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {ticket.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant={ticket.status === 'resolved' ? 'default' : 'secondary'}>
                      {ticket.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Created: {ticket.created} • Last update: {ticket.lastUpdate}
                  </div>
                  
                  <div className="space-y-2">
                    {ticket.messages.slice(-1).map((message) => (
                      <div key={message.id} className="text-sm p-2 bg-muted rounded">
                        <div className="flex items-center gap-2 mb-1">
                          {message.from === 'admin' ? <UserCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          <span className="font-medium capitalize">{message.from}</span>
                          <span className="text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <p>{message.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Conversation
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Direct messages from the admin team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`p-4 border rounded-lg ${!message.read ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-medium">{message.subject}</span>
                      {!message.read && (
                        <Badge variant="default" className="text-xs">New</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{message.message}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Reply
                    </Button>
                    {!message.read && (
                      <Button variant="ghost" size="sm">
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ClientCommunication