import { useState } from 'react'
import { useAuth } from '../App'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, Users } from 'lucide-react'

const LoginPage = () => {
  const { login } = useAuth()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleLogin = async (role) => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: role === 'admin' ? 1 : 2,
        email: credentials.email,
        role: role,
        name: role === 'admin' ? 'Admin User' : 'Client User'
      }
      login(userData)
      setLoading(false)
    }, 1000)
  }

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Automate Control Panel</CardTitle>
          <CardDescription>
            Sign in to manage your automations and workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="client" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Client
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin('admin')}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in as Admin'}
              </Button>
            </TabsContent>
            
            <TabsContent value="client" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <Input
                  id="client-email"
                  name="email"
                  type="email"
                  placeholder="client@example.com"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-password">Password</Label>
                <Input
                  id="client-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin('client')}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in as Client'}
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo credentials: any email/password combination</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage

