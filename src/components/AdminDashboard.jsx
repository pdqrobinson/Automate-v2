import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import AdminLayout from './admin/AdminLayout'
import AdminHome from './admin/AdminHome'
import AdminClients from './admin/AdminClients'
import AdminWorkflows from './admin/AdminWorkflows'
import AdminSettings from './admin/AdminSettings'

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/home" replace />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/clients" element={<AdminClients />} />
        <Route path="/workflows" element={<AdminWorkflows />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminDashboard

// Add a new function to customize client dashboards
function customizeClientDashboard(clientId, layout, widgets) {
  // Logic to customize the dashboard layout and widgets for a specific client
  console.log(`Customizing dashboard for client ${clientId}`);
  // Placeholder for actual implementation
}

// Example usage of the new function
customizeClientDashboard('client123', 'grid', ['widget1', 'widget2']);

