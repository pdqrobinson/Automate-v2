import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  DollarSign,
  Download,
  CreditCard,
  BarChart3,
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const ClientBilling = () => {
  // Mock billing data
  const currentBilling = {
    period: 'January 2024',
    executions: 245,
    limit: 1000,
    cost: 245.00,
    plan: 'Professional',
    dueDate: '2024-02-01',
    status: 'current'
  }

  const billingHistory = [
    { month: 'Jan 2024', executions: 245, cost: 245.00, status: 'current' },
    { month: 'Dec 2023', executions: 189, cost: 189.00, status: 'paid' },
    { month: 'Nov 2023', executions: 267, cost: 267.00, status: 'paid' },
    { month: 'Oct 2023', executions: 198, cost: 198.00, status: 'paid' },
    { month: 'Sep 2023', executions: 234, cost: 234.00, status: 'paid' },
    { month: 'Aug 2023', executions: 156, cost: 156.00, status: 'paid' }
  ]

  const usageData = [
    { name: 'Week 1', executions: 45 },
    { name: 'Week 2', executions: 62 },
    { name: 'Week 3', executions: 78 },
    { name: 'Week 4', executions: 60 }
  ]

  const costTrend = [
    { month: 'Aug', cost: 156 },
    { month: 'Sep', cost: 234 },
    { month: 'Oct', cost: 198 },
    { month: 'Nov', cost: 267 },
    { month: 'Dec', cost: 189 },
    { month: 'Jan', cost: 245 }
  ]

  const workflowUsage = [
    { name: 'Lead Generation', executions: 120, cost: 120.00 },
    { name: 'Email Campaign', executions: 85, cost: 85.00 },
    { name: 'Social Media Posting', executions: 40, cost: 40.00 }
  ]

  const usagePercentage = (currentBilling.executions / currentBilling.limit) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Usage</h1>
        <p className="text-muted-foreground">
          Track your automation usage and manage billing
        </p>
      </div>

      {/* Current Billing Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Period</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBilling.period}</div>
            <p className="text-xs text-muted-foreground">
              Due: {new Date(currentBilling.dueDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Executions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBilling.executions}</div>
            <p className="text-xs text-muted-foreground">
              of {currentBilling.limit} limit
            </p>
            <Progress value={usagePercentage} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Bill</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentBilling.cost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              $1.00 per execution
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBilling.plan}</div>
            <p className="text-xs text-muted-foreground">
              1,000 executions/month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Warning */}
      {usagePercentage > 80 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Usage Warning</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  You've used {usagePercentage.toFixed(1)}% of your monthly execution limit. 
                  Consider upgrading your plan to avoid overage charges.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Usage</CardTitle>
            <CardDescription>
              Workflow executions by week this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="executions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Trend</CardTitle>
            <CardDescription>
              Monthly costs over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                <Line type="monotone" dataKey="cost" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Usage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Usage by Workflow</CardTitle>
          <CardDescription>
            Breakdown of executions and costs by workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowUsage.map((workflow, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{workflow.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {workflow.executions} executions
                  </div>
                  <Progress 
                    value={(workflow.executions / currentBilling.executions) * 100} 
                    className="mt-2 w-full max-w-xs" 
                  />
                </div>
                <div className="text-right">
                  <div className="font-medium">${workflow.cost.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    {((workflow.executions / currentBilling.executions) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Your past invoices and payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{bill.month}</div>
                  <div className="text-sm text-muted-foreground">
                    {bill.executions} executions
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">${bill.cost.toFixed(2)}</div>
                    <Badge variant={bill.status === 'paid' ? 'default' : 'secondary'}>
                      {bill.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Invoice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientBilling