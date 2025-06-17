import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import ClientLayout from './client/ClientLayout'
import ClientHome from './client/ClientHome'
import ClientCommunication from './client/ClientCommunication'
import ClientBilling from './client/ClientBilling'

const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ClientLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <Routes>
        <Route path="/" element={<Navigate to="/client/home" replace />} />
        <Route path="/home" element={<ClientHome />} />
        <Route path="/communication" element={<ClientCommunication />} />
        <Route path="/billing" element={<ClientBilling />} />
      </Routes>
    </ClientLayout>
  )
}

export default ClientDashboard