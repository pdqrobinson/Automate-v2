import { useAuth } from '../../App'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Home, 
  LogOut, 
  Menu,
  ArrowLeft
} from 'lucide-react'

const ClientLayout = ({ children, sidebarOpen, setSidebarOpen }) => {
  const { user, logout, isImpersonating, impersonatedClient } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const currentUser = isImpersonating ? impersonatedClient : user

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Client Portal</h1>
      </div>
      
      {isImpersonating && (
        <div className="border-b bg-blue-50 dark:bg-blue-900/20 p-4">
          <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
            <ArrowLeft className="w-4 h-4" />
            <span>Admin Impersonation Mode</span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
            Viewing as: {currentUser?.name}
          </p>
        </div>
      )}
      
      <nav className="flex-1 space-y-1 p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary text-primary-foreground">
          <Home className="w-4 h-4" />
          Dashboard
        </div>
      </nav>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              {currentUser?.name?.charAt(0) || 'C'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
            {currentUser?.company && (
              <p className="text-xs text-muted-foreground truncate">{currentUser?.company}</p>
            )}
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
          <h1 className="text-xl font-semibold">Client Portal</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default ClientLayout

