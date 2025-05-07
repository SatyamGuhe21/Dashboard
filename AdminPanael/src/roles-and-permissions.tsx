"use client"

import { useState } from "react"
import { BsPencilSquare, BsTrash, BsPlus } from "react-icons/bs"

// Initial roles data
const initialRoles = [
  { id: "001", name: "Admin", permissions: "Full Access" },
  { id: "002", name: "Manager", permissions: "Manage Inventory, View Reports" },
  { id: "003", name: "Staff", permissions: "Input Inventory, Record Waste" },
  { id: "004", name: "Accountant", permissions: "View Financial Data, Manage Payroll" },
]

// Available permissions for checkboxes
const availablePermissions = [
  "View Inventory",
  "Edit Inventory",
  "Manage Users",
  "View Reports",
  "Manage Payroll",
  "Full Access",
]

export default function RolesAndPermissions() {
  const [roles, setRoles] = useState(initialRoles)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRolePermissions, setNewRolePermissions] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  // Add a new role
  const handleAddRole = () => {
    if (newRoleName && newRolePermissions) {
      const newId = String(roles.length + 1).padStart(3, "0")
      setRoles([...roles, { id: newId, name: newRoleName, permissions: newRolePermissions }])
      setNewRoleName("")
      setNewRolePermissions("")
    }
  }

  // Handle permission checkbox changes
  const handlePermissionChange = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission))
    } else {
      setSelectedPermissions([...selectedPermissions, permission])
    }
  }

  // Update permissions for selected role
  const handleUpdatePermissions = () => {
    if (selectedRole) {
      setRoles(
        roles.map((role) =>
          role.id === selectedRole ? { ...role, permissions: selectedPermissions.join(", ") } : role,
        ),
      )
    }
  }

  // Select a role for editing
  const handleSelectRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId)
    if (role) {
      setSelectedRole(roleId)
      setSelectedPermissions(role.permissions.split(", "))
    }
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>ROLES AND PERMISSIONS MANAGEMENT</h3>
      </div>

      {/* Roles List Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 className="mb-4">Roles List</h3>
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Role ID</th>
                <th>Role Name</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>{role.permissions}</td>
                  <td>
                    <button className="action-btn edit" onClick={() => handleSelectRole(role.id)}>
                      <BsPencilSquare />
                    </button>
                    <button className="action-btn delete">
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Role Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 className="mb-4">Add New Role</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label htmlFor="roleName" className="block mb-2">
              Role Name:
            </label>
            <input
              type="text"
              id="roleName"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="permissions" className="block mb-2">
              Permissions:
            </label>
            <input
              type="text"
              id="permissions"
              value={newRolePermissions}
              onChange={(e) => setNewRolePermissions(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <button className="bg-blue-500 text-white p-2 rounded flex items-center" onClick={handleAddRole}>
            <BsPlus className="mr-1" /> Add Role
          </button>
        </div>
      </div>

      {/* Edit Permissions Section */}
      <div className="chart-card">
        <h3 className="mb-4">Edit Permissions</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="selectRole" className="block mb-2">
              Select Role:
            </label>
            <select
              id="selectRole"
              className="p-2 border rounded"
              value={selectedRole}
              onChange={(e) => handleSelectRole(e.target.value)}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Permissions:</label>
            <div className="flex flex-wrap gap-3">
              {availablePermissions.map((permission) => (
                <label key={permission} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                  {permission}
                </label>
              ))}
            </div>
          </div>
          <button className="bg-green-500 text-white p-2 rounded mt-4" onClick={handleUpdatePermissions}>
            Update Permissions
          </button>
        </div>
      </div>
    </main>
  )
}
