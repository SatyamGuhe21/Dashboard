"use client"

import { useState } from "react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for reports
const barSalesData = {
  overview: {
    totalSales: 5000,
    totalOrders: 250,
    bestSellingItem: "Vodka",
  },
  categories: [
    { name: "Spirits", value: 3000 },
    { name: "Beer", value: 1500 },
    { name: "Wine", value: 1000 },
  ],
  customers: {
    total: 180,
    returning: "70%",
  },
}

const restaurantSalesData = {
  overview: {
    totalSales: 8500,
    totalOrders: 320,
    bestSellingItem: "Steak",
  },
  categories: [
    { name: "Main Dishes", value: 4500 },
    { name: "Appetizers", value: 2000 },
    { name: "Desserts", value: 1200 },
    { name: "Beverages", value: 800 },
  ],
  customers: {
    total: 250,
    returning: "65%",
  },
}

// Sample chart data
const monthlySalesData = [
  { name: "Jan", bar: 4000, restaurant: 6000 },
  { name: "Feb", bar: 3000, restaurant: 5500 },
  { name: "Mar", bar: 5000, restaurant: 7000 },
  { name: "Apr", bar: 4500, restaurant: 6500 },
  { name: "May", bar: 6000, restaurant: 8000 },
  { name: "Jun", bar: 5500, restaurant: 7500 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState("bar")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const currentData = activeTab === "bar" ? barSalesData : restaurantSalesData

  const handleDownload = (reportType) => {
    alert(`Downloading ${reportType} report for ${activeTab}`)
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>{activeTab === "bar" ? "BAR" : "RESTAURANT"} REPORTS AND ANALYTICS</h3>
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
          BAR REPORT
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
          RESTAURANT REPORT
        </button>
      </div>

      {/* Date Range Selector */}
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", gap: "10px", alignItems: "center" }}
      >
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ padding: "8px", borderRadius: "20px", border: "1px solid #ccc" }}
        />
        <span>TO</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ padding: "8px", borderRadius: "20px", border: "1px solid #ccc" }}
        />
        <button
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleDownload("custom")}
        >
          <span style={{ fontSize: "18px" }}>↓</span> DOWNLOAD
        </button>
      </div>

      {/* Sales Overview Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Sales Overview</h3>
        <div style={{ padding: "20px" }}>
          <p>Total Sales: ${currentData.overview.totalSales}</p>
          <p>Total Orders: {currentData.overview.totalOrders}</p>
          <p>Best Selling Item: {currentData.overview.bestSellingItem}</p>
        </div>

        <div style={{ height: "300px", marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlySalesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={activeTab} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales by Category Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "16px" }}>Sales by Category</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ width: "50%", padding: "20px" }}>
            {currentData.categories.map((category, index) => (
              <p key={index}>
                {category.name}: ${category.value}
              </p>
            ))}
          </div>
          <div style={{ width: "50%", height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {currentData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Customer Insights Section */}
      <div className="chart-card">
        <h3 style={{ marginBottom: "16px" }}>Customer Insights</h3>
        <div style={{ padding: "20px" }}>
          <p>Total Customers: {currentData.customers.total}</p>
          <p>Returning Customers: {currentData.customers.returning}</p>
        </div>
      </div>

      {/* Download Reports Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px" }}>
        <button
          style={{
            backgroundColor: "#c8b7a6",
            color: "black",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={() => handleDownload("daily")}
        >
          daily
        </button>
        <button
          style={{
            backgroundColor: "#c8b7a6",
            color: "black",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={() => handleDownload("weekly")}
        >
          weekly
        </button>
        <button
          style={{
            backgroundColor: "#c8b7a6",
            color: "black",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={() => handleDownload("monthly")}
        >
          monthly
        </button>
        <button
          style={{
            backgroundColor: "#c8b7a6",
            color: "black",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={() => handleDownload("yearly")}
        >
          yearly
        </button>
        <button
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleDownload("selected")}
        >
          <span style={{ fontSize: "18px" }}>↓</span> DOWNLOAD
        </button>
      </div>
    </main>
  )
}

export default ReportsAnalytics
