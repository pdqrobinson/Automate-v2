import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, Users, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const LoginPage = () => {
  const { login, register } = useAuth()
  const [credentials, setCredentials] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('login')

  const handleLogin = async (role) => {
    setLoading(true)
    setError('')
    
    try {
      await login(credentials.email, credentials.password)
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (role) => {
    setLoading(true)
    setError('')
    
    try {
      await register(credentials.email, credentials.password, credentials.name, role)
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin()}
                disabled={loading || !credentials.email || !credentials.password}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={credentials.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Register as:</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleRegister('admin')}
                    disabled={loading || !credentials.email || !credentials.password || !credentials.name}
                    className="flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Admin
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleRegister('client')}
                    disabled={loading || !credentials.email || !credentials.password || !credentials.name}
                    className="flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Client
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Powered by Appwrite Backend</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage