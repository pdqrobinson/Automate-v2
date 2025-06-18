import { Card, CardContent } from '@/components/ui/card'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <h2 className="text-lg font-semibold text-center">Loading...</h2>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Please wait while we set up your dashboard
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoadingSpinner