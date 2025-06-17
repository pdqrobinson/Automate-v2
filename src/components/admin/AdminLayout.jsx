import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../App'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Home, 
  Users, 
  Workflow, 
  Settings, 
  LogOut, 
  Menu,
  UserCheck,
  ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'

const AdminLayout = ({ children, sidebarOpen, setSidebarOpen }) => {
  const { user, logout, isImpersonating, stopImpersonation } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/admin/home', icon: Home },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Workflows', href: '/admin/workflows', icon: Workflow },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
  }

  const handleStopImpersonation = () => {
    stopImpersonation()
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>
      
      {isImpersonating && (
        <div className="border-b bg-yellow-50 dark:bg-yellow-900/20 p-4">
          <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
            <UserCheck className="w-4 h-4" />
            <span>Impersonating Client</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleStopImpersonation}
            className="mt-2 w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Stop Impersonation
          </Button>
        </div>
      )}
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-card">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="flex h-16 items-center gap-4 border-b bg-card px-6 lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

