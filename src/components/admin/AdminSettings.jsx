import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Save, 
  TestTube, 
  Key, 
  User, 
  Bell, 
  Shield,
  Database,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // n8n Configuration
    n8nApiKey: '••••••••••••••••',
    n8nBaseUrl: 'https://n8n.example.com',
    n8nWebhookUrl: 'https://webhook.example.com',
    
    // Admin Profile
    adminName: 'Admin User',
    adminEmail: 'admin@example.com',
    adminPhone: '+1 (555) 123-4567',
    
    // Notifications
    emailNotifications: true,
    workflowFailureAlerts: true,
    clientRequestAlerts: true,
    systemMaintenanceAlerts: false,
    
    // Security
    sessionTimeout: '24',
    requireMFA: false,
    auditLogging: true,
    
    // System
    maxWorkflowRuns: '1000',
    dataRetentionDays: '90',
    backupFrequency: 'daily'
  })

  const [connectionStatus, setConnectionStatus] = useState('untested')
  const [isTesting, setIsTesting] = useState(false)

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTestConnection = async () => {
    setIsTesting(true)
    setConnectionStatus('testing')
    
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% success rate for demo
      setConnectionStatus(success ? 'success' : 'error')
      setIsTesting(false)
    }, 2000)
  }

  const handleSaveSettings = () => {
    // Simulate saving settings
    alert('Settings saved successfully!')
  }

  const getConnectionStatusBadge = () => {
    switch (connectionStatus) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>
      case 'error':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>
      case 'testing':
        return <Badge variant="secondary"><Activity className="w-3 h-3 mr-1 animate-spin" />Testing...</Badge>
      default:
        return <Badge variant="outline"><AlertTriangle className="w-3 h-3 mr-1" />Not Tested</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your system settings and integrations
        </p>
      </div>

      <Tabs defaultValue="n8n" className="space-y-6">
        <TabsList>
          <TabsTrigger value="n8n">n8n Integration</TabsTrigger>
          <TabsTrigger value="profile">Admin Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="n8n" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                n8n Configuration
              </CardTitle>
              <CardDescription>
                Configure your n8n instance connection and API settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="n8n-url">n8n Base URL</Label>
                <Input
                  id="n8n-url"
                  value={settings.n8nBaseUrl}
                  onChange={(e) => handleInputChange('n8nBaseUrl', e.target.value)}
                  placeholder="https://your-n8n-instance.com"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="n8n-api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="n8n-api-key"
                    type="password"
                    value={settings.n8nApiKey}
                    onChange={(e) => handleInputChange('n8nApiKey', e.target.value)}
                    placeholder="Enter your n8n API key"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleTestConnection}
                    disabled={isTesting}
                  >
                    <TestTube className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">Connection Status:</span>
                  {getConnectionStatusBadge()}
                </div>
              </div>
              const handleSaveCredentials = () ={'>'} {
                // Logic to securely save n8n credentials
                alert('Credentials saved successfully!')
              }
              
              <div className="grid gap-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  value={settings.n8nWebhookUrl}
                  onChange={(e) => handleInputChange('n8nWebhookUrl', e.target.value)}
                  placeholder="https://webhook.site/your-webhook-id"
                />
                <p className="text-xs text-muted-foreground">
                  This URL will receive workflow execution notifications
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Admin Profile
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="admin-name">Full Name</Label>
                <Input
                  id="admin-name"
                  value={settings.adminName}
                  onChange={(e) => handleInputChange('adminName', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="admin-email">Email Address</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="admin-phone">Phone Number</Label>
                <Input
                  id="admin-phone"
                  value={settings.adminPhone}
                  onChange={(e) => handleInputChange('adminPhone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Workflow Failure Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when workflows fail
                  </p>
                </div>
                <Switch
                  checked={settings.workflowFailureAlerts}
                  onCheckedChange={(checked) => handleInputChange('workflowFailureAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Client Request Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when clients request new automations
                  </p>
                </div>
                <Switch
                  checked={settings.clientRequestAlerts}
                  onCheckedChange={(checked) => handleInputChange('clientRequestAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Maintenance Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about system maintenance and updates
                  </p>
                </div>
                <Switch
                  checked={settings.systemMaintenanceAlerts}
                  onCheckedChange={(checked) => handleInputChange('systemMaintenanceAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Multi-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require MFA for admin login
                  </p>
                </div>
                <Switch
                  checked={settings.requireMFA}
                  onCheckedChange={(checked) => handleInputChange('requireMFA', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log all admin actions for security auditing
                  </p>
                </div>
                <Switch
                  checked={settings.auditLogging}
                  onCheckedChange={(checked) => handleInputChange('auditLogging', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure system limits and data management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="max-runs">Maximum Workflow Runs per Day</Label>
                <Input
                  id="max-runs"
                  type="number"
                  value={settings.maxWorkflowRuns}
                  onChange={(e) => handleInputChange('maxWorkflowRuns', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="retention-days">Data Retention Period (days)</Label>
                <Input
                  id="retention-days"
                  type="number"
                  value={settings.dataRetentionDays}
                  onChange={(e) => handleInputChange('dataRetentionDays', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <select
                  id="backup-frequency"
                  value={settings.backupFrequency}
                  onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}

export default AdminSettings

