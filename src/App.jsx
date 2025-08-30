"use client"

import { useState } from "react"
import "./App.css"
import Header from "./header"
import Sidebar from "./Sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import UserManagement from "./UserManagement"
import RolesAndPermissions from "./RolesAndPermissions"
import InventoryManagement from "./InventoryManagement"
import SupplierManagement from "./SupplierManagement"
import OrderManagement from "./OrderManagement"
import ReportsAnalytics from "./ReportsAnalytics"
import Settings from "./Settings"
import HelpSupport from "./HelpSupport"

// New detail pages
import WeatherImpact from "./WeatherImpact"
import EventsImpact from "./EventsImpact"
import LaborPlanning from "./LaborPlanning"
import WebsiteAnalytics from "./WebsiteAnalytics"

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => setOpenSidebarToggle(!openSidebarToggle)

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/roles" element={<RolesAndPermissions />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/suppliers" element={<SupplierManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          {/* Dedicated Website Analytics page under reports */}
          <Route path="/website-analytics" element={<WebsiteAnalytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpSupport />} />

          {/* New detail routes */}
          <Route path="/weather-impact" element={<WeatherImpact />} />
          <Route path="/events-impact" element={<EventsImpact />} />
          <Route path="/labor-planning" element={<LaborPlanning />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
