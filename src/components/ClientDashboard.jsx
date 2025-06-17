import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import ClientLayout from './client/ClientLayout'
import ClientHome from './client/ClientHome'

const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ClientLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <Routes>
        <Route path="/" element={<Navigate to="/client/home" replace />} />
        <Route path="/home" element={<ClientHome />} />
      </Routes>
    </ClientLayout>
  )
}

export default ClientDashboard

