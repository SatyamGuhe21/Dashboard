// Updated SupplierManagement.jsx with scroll bar in Current Suppliers section

"use client"

import { useState } from "react"
import { BsPencilSquare, BsTrash } from "react-icons/bs"

const initialRestaurantSuppliers = [
  { id: "001", name: "Fresh Produce", contactPerson: "Alice Green", phone: "321-654-9870", email: "alice@fresh.com" },
  { id: "002", name: "Dairy Suppliers", contactPerson: "Bob White", phone: "654-321-0987", email: "bob@dairy.com" },
  { id: "003", name: "Bakery Goods", contactPerson: "Carol Black", phone: "111-222-3333", email: "carol@bakery.com" },
]

const initialBarSuppliers = [
  { id: "001", name: "ABC Beverages", contactPerson: "John Smith", phone: "123-456-7890", email: "john@abc.com" },
  { id: "002", name: "XYZ Spirits", contactPerson: "Jane Doe", phone: "987-654-3210", email: "jane@xyz.com" },
  { id: "003", name: "Wine World", contactPerson: "Mary Johnson", phone: "555-123-4567", email: "mary@wineworld.com" },
]

function SupplierManagement() {
  const [activeTab, setActiveTab] = useState("restaurant")
  const [restaurantSuppliers, setRestaurantSuppliers] = useState(initialRestaurantSuppliers)
  const [barSuppliers, setBarSuppliers] = useState(initialBarSuppliers)

  const [newSupplierName, setNewSupplierName] = useState("")
  const [newContactPerson, setNewContactPerson] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newEmail, setNewEmail] = useState("")

  const handleAddSupplier = () => {
    if (newSupplierName && newContactPerson && newPhone && newEmail) {
      const newSupplier = {
        id: generateNewId(),
        name: newSupplierName,
        contactPerson: newContactPerson,
        phone: newPhone,
        email: newEmail,
      }

      if (activeTab === "restaurant") {
        setRestaurantSuppliers([...restaurantSuppliers, newSupplier])
      } else {
        setBarSuppliers([...barSuppliers, newSupplier])
      }

      setNewSupplierName("")
      setNewContactPerson("")
      setNewPhone("")
      setNewEmail("")
    }
  }

  const generateNewId = () => {
    const suppliers = activeTab === "restaurant" ? restaurantSuppliers : barSuppliers
    const lastId = suppliers.length > 0 ? Number.parseInt(suppliers[suppliers.length - 1].id) : 0
    return String(lastId + 1).padStart(3, "0")
  }

  const generateReport = (reportType) => {
    alert(`Generating ${reportType} suppliers report`)
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>{activeTab === "restaurant" ? "RESTAURANT" : "BAR"} SUPPLIER MANAGEMENT</h3>
      </div>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: activeTab === "bar" ? "#e0e0e0" : "#c8b7a6",
            marginRight: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => setActiveTab("bar")}
        >
          BAR SUPPLIER
        </button>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: activeTab === "restaurant" ? "#e0e0e0" : "#c8b7a6",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => setActiveTab("restaurant")}
        >
          RESTAURANT SUPPLIER
        </button>
      </div>

      {/* Current Suppliers Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Current Suppliers</h3>
        <div className="user-table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="user-table">
            <thead>
              <tr>
                <th>Supplier ID</th>
                <th>Supplier Name</th>
                <th>Contact Person</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "restaurant" ? restaurantSuppliers : barSuppliers).map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.contactPerson}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>
                    <button className="action-btn edit">
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

      {/* Add New Supplier Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Add New Supplier</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
          <div>
            <label htmlFor="supplierName" style={{ display: "block", marginBottom: "8px" }}>Supplier Name:</label>
            <input
              type="text"
              id="supplierName"
              value={newSupplierName}
              onChange={(e) => setNewSupplierName(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label htmlFor="contactPerson" style={{ display: "block", marginBottom: "8px" }}>Contact Person:</label>
            <input
              type="text"
              id="contactPerson"
              value={newContactPerson}
              onChange={(e) => setNewContactPerson(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label htmlFor="phone" style={{ display: "block", marginBottom: "8px" }}>Phone:</label>
            <input
              type="text"
              id="phone"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>Email:</label>
            <input
              type="email"
              id="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <button
            style={{
              backgroundColor: "#4dabf7",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              marginTop: "24px",
              cursor: "pointer",
            }}
            onClick={handleAddSupplier}
          >
            Add Supplier
          </button>
        </div>
      </div>

      {/* Supplier Reports Section */}
      <div className="chart-card">
        <h3 style={{ marginBottom: "16px" }}>Supplier Reports</h3>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>Generate Report:</span>
          <button style={buttonStyle} onClick={() => generateReport("Active Suppliers")}>Active Suppliers</button>
          <button style={buttonStyle} onClick={() => generateReport("Inactive Suppliers")}>Inactive Suppliers</button>
          <button
            style={{
              marginLeft: "auto",
              padding: "5px 15px",
              backgroundColor: "#51cf66",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => generateReport("Selected")}
          >
            Generate
          </button>
        </div>
      </div>
    </main>
  )
}

const buttonStyle = {
  padding: "5px 10px",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
}

export default SupplierManagement
