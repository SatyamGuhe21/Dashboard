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
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpSupport />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
