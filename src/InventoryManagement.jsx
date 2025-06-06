"use client"

import { useState } from "react"
import { BsPencilSquare, BsTrash } from "react-icons/bs"

// Initial inventory data
const initialRestaurantInventory = [
  { id: "001", name: "Chicken", category: "Meat", quantity: 50, unitPrice: 5.0, totalValue: 250.0 },
  { id: "002", name: "Lettuce", category: "Vegetables", quantity: 30, unitPrice: 1.0, totalValue: 30.0 },
  { id: "003", name: "Olive Oil", category: "Condiments", quantity: 10, unitPrice: 10.0, totalValue: 100.0 },
  { id: "004", name: "Rice", category: "Grains", quantity: 100, unitPrice: 2.0, totalValue: 200.0 },
]

const initialBarInventory = [
  { id: "001", name: "Vodka", category: "Spirits", quantity: 100, unitPrice: 15.0, totalValue: 1500.0 },
  { id: "002", name: "Red Wine", category: "Wine", quantity: 50, unitPrice: 20.0, totalValue: 1000.0 },
  { id: "003", name: "Beer", category: "Beer", quantity: 200, unitPrice: 5.0, totalValue: 1000.0 },
  { id: "004", name: "Whiskey", category: "Spirits", quantity: 75, unitPrice: 25.0, totalValue: 1875.0 },
]

function InventoryManagement() {
  const [activeTab, setActiveTab] = useState("restaurant")
  const [restaurantInventory, setRestaurantInventory] = useState(initialRestaurantInventory)
  const [barInventory, setBarInventory] = useState(initialBarInventory)

  const [newItemName, setNewItemName] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")

  const handleAddItem = () => {
    if (newItemName && newItemCategory && newItemQuantity && newItemPrice) {
      const newItem = {
        id: generateNewId(),
        name: newItemName,
        category: newItemCategory,
        quantity: Number.parseInt(newItemQuantity),
        unitPrice: Number.parseFloat(newItemPrice),
        totalValue: Number.parseInt(newItemQuantity) * Number.parseFloat(newItemPrice),
      }

      if (activeTab === "restaurant") {
        setRestaurantInventory([...restaurantInventory, newItem])
      } else {
        setBarInventory([...barInventory, newItem])
      }

      setNewItemName("")
      setNewItemCategory("")
      setNewItemQuantity("")
      setNewItemPrice("")
    }
  }

  const generateNewId = () => {
    const inventory = activeTab === "restaurant" ? restaurantInventory : barInventory
    const lastId = inventory.length > 0 ? Number.parseInt(inventory[inventory.length - 1].id) : 0
    return String(lastId + 1).padStart(3, "0")
  }

  const generateReport = (reportType) => {
    alert(`Generating ${reportType} report for ${activeTab} inventory`)
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>{activeTab === "restaurant" ? "RESTAURANT" : "BAR"} INVENTORY MANAGEMENT</h3>
      </div>

      {/* Tab buttons */}
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
          BAR INVENTORY
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
          RESTAURANT INVENTORY
        </button>
      </div>

      {/* Current Inventory Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Current {activeTab === "restaurant" ? "Restaurant" : "Bar"} Inventory</h3>
        <div className="user-table-container" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="user-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "restaurant" ? restaurantInventory : barInventory).map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>${item.unitPrice.toFixed(2)}</td>
                  <td>${item.totalValue.toFixed(2)}</td>
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

      {/* Add New Item Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Add New Item</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
          <div>
            <label htmlFor="itemName" style={{ display: "block", marginBottom: "8px" }}>Item Name:</label>
            <input
              type="text"
              id="itemName"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label htmlFor="category" style={{ display: "block", marginBottom: "8px" }}>Category:</label>
            <input
              type="text"
              id="category"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label htmlFor="quantity" style={{ display: "block", marginBottom: "8px" }}>Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "80px" }}
            />
          </div>
          <div>
            <label htmlFor="unitPrice" style={{ display: "block", marginBottom: "8px" }}>Unit Price: $</label>
            <input
              type="number"
              id="unitPrice"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "80px" }}
              step="0.01"
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
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Inventory Reports Section */}
      <div className="chart-card">
        <h3 style={{ marginBottom: "16px" }}>Inventory Reports</h3>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>Generate Report:</span>
          <button style={buttonStyle} onClick={() => generateReport("Daily")}>Daily</button>
          <button style={buttonStyle} onClick={() => generateReport("Weekly")}>Weekly</button>
          <button style={buttonStyle} onClick={() => generateReport("Monthly")}>Monthly</button>
          <button style={buttonStyle} onClick={() => generateReport("Custom Date")}>Custom Date</button>
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

export default InventoryManagement;
