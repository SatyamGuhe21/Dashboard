"use client"

import { Link, useLocation } from "react-router-dom"
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsQuestionCircle,
} from "react-icons/bs"

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const location = useLocation()

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> Dashboard
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <BsGrid1X2Fill className="icon" /> Dashboard Overview
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/users" className={location.pathname === "/users" ? "active" : ""}>
            <BsPeopleFill className="icon" /> User Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/roles" className={location.pathname === "/roles" ? "active" : ""}>
            <BsFillGrid3X3GapFill className="icon" /> Roles & Permissions
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/inventory" className={location.pathname === "/inventory" ? "active" : ""}>
            <BsFillArchiveFill className="icon" /> Inventory Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/suppliers" className={location.pathname === "/suppliers" ? "active" : ""}>
            <BsListCheck className="icon" /> Supplier Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>
            <BsMenuButtonWideFill className="icon" /> Order Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/reports" className={location.pathname === "/reports" ? "active" : ""}>
            <BsFillGearFill className="icon" /> Reports & Analytics
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
            <BsFillGearFill className="icon" /> Settings
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/help" className={location.pathname === "/help" ? "active" : ""}>
            <BsQuestionCircle className="icon" /> Help & Support
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
