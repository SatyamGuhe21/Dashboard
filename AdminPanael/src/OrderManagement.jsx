"use client"

import { useState } from "react"
import { BsPencilSquare, BsTrash } from "react-icons/bs"

// Initial orders data
const initialRestaurantOrders = [
  { id: "001", customer: "Mark Taylor", items: "Chicken Salad", quantity: 2, totalPrice: 30.0, status: "Completed" },
  { id: "002", customer: "Lucy Brown", items: "Pasta", quantity: 1, totalPrice: 15.0, status: "In Progress" },
  { id: "003", customer: "Tom White", items: "Steak", quantity: 3, totalPrice: 75.0, status: "Pending" },
]

const initialBarOrders = [
  { id: "001", customer: "John Doe", items: "Vodka, Beer", quantity: 2, totalPrice: 45.0, status: "Completed" },
  { id: "002", customer: "Jane Smith", items: "Whiskey", quantity: 1, totalPrice: 25.0, status: "In Progress" },
  { id: "003", customer: "Alice Johnson", items: "Wine", quantity: 3, totalPrice: 60.0, status: "Pending" },
]

function OrderManagement() {
  const [activeTab, setActiveTab] = useState("restaurant")
  const [restaurantOrders, setRestaurantOrders] = useState(initialRestaurantOrders)
  const [barOrders, setBarOrders] = useState(initialBarOrders)

  // Form states
  const [newCustomer, setNewCustomer] = useState("")
  const [newItems, setNewItems] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [newTotalPrice, setNewTotalPrice] = useState("")

  const handleAddOrder = () => {
    if (newCustomer && newItems && newQuantity && newTotalPrice) {
      const newOrder = {
        id: generateNewId(),
        customer: newCustomer,
        items: newItems,
        quantity: Number.parseInt(newQuantity),
        totalPrice: Number.parseFloat(newTotalPrice),
        status: "Pending",
      }

      if (activeTab === "restaurant") {
        setRestaurantOrders([...restaurantOrders, newOrder])
      } else {
        setBarOrders([...barOrders, newOrder])
      }

      // Reset form
      setNewCustomer("")
      setNewItems("")
      setNewQuantity("")
      setNewTotalPrice("")
    }
  }

  const generateNewId = () => {
    const orders = activeTab === "restaurant" ? restaurantOrders : barOrders
    const lastId = orders.length > 0 ? Number.parseInt(orders[orders.length - 1].id) : 0
    return String(lastId + 1).padStart(3, "0")
  }

  const generateReport = (reportType) => {
    alert(`Generating ${reportType} orders report`)
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>{activeTab === "restaurant" ? "RESTAURANT" : "BAR"} ORDER MANAGEMENT</h3>
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
          BAR ORDER
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
          RESTAURANT ORDER
        </button>
      </div>

      {/* Current Orders Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Current Orders</h3>
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Item(s) Ordered</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "restaurant" ? restaurantOrders : barOrders).map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.items}</td>
                  <td>{order.quantity}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.status}</td>
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

      {/* Add New Order Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Add New Order</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
          <div>
            <label htmlFor="customerName" style={{ display: "block", marginBottom: "8px" }}>
              Customer Name:
            </label>
            <input
              type="text"
              id="customerName"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label htmlFor="items" style={{ display: "block", marginBottom: "8px" }}>
              Item(s):
            </label>
            <input
              type="text"
              id="items"
              value={newItems}
              onChange={(e) => setNewItems(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label htmlFor="quantity" style={{ display: "block", marginBottom: "8px" }}>
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "80px" }}
            />
          </div>
          <div>
            <label htmlFor="totalPrice" style={{ display: "block", marginBottom: "8px" }}>
              Total Price: $
            </label>
            <input
              type="number"
              id="totalPrice"
              value={newTotalPrice}
              onChange={(e) => setNewTotalPrice(e.target.value)}
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
            onClick={handleAddOrder}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Order Reports Section */}
      <div className="chart-card">
        <h3 style={{ marginBottom: "16px" }}>Order Reports</h3>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>Generate Report:</span>
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => generateReport("Daily")}
          >
            [Daily]
          </button>
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => generateReport("Weekly")}
          >
            [Weekly]
          </button>
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => generateReport("Monthly")}
          >
            [Monthly]
          </button>
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
            [Generate]
          </button>
        </div>
      </div>
    </main>
  )
}

export default OrderManagement
