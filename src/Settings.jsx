"use client"

import { useState } from "react"

function Settings() {
  // General Settings
  const [companyName, setCompanyName] = useState("Restaurant & Bar Management")
  const [currency, setCurrency] = useState("USD")
  const [language, setLanguage] = useState("English")
  const [timezone, setTimezone] = useState("UTC-5 (Eastern Time)")

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [lowStockAlerts, setLowStockAlerts] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(true)

  const handleSaveSettings = (settingType) => {
    alert(`${settingType} settings saved successfully!`)
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>SETTINGS</h3>
      </div>

      {/* General Settings Section */}
      <div className="chart-card" style={{ marginBottom: "20px" }}>
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "24px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          General Settings
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ minWidth: "300px" }}>
              <label htmlFor="companyName" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>

            <div style={{ minWidth: "200px" }}>
              <label htmlFor="currency" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ minWidth: "200px" }}>
              <label htmlFor="language" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div style={{ minWidth: "300px" }}>
              <label htmlFor="timezone" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Timezone
              </label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
                <option value="UTC-6 (Central Time)">UTC-6 (Central Time)</option>
                <option value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</option>
                <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
              </select>
            </div>
          </div>

          <div>
            <button
              style={{
                backgroundColor: "#4dabf7",
                color: "white",
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => handleSaveSettings("General")}
            >
              Save General Settings
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="chart-card">
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "24px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          Notification Settings
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="emailNotifications"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              style={{ marginRight: "10px", width: "18px", height: "18px" }}
            />
            <label htmlFor="emailNotifications" style={{ fontWeight: "bold" }}>
              Email Notifications
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="smsNotifications"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
              style={{ marginRight: "10px", width: "18px", height: "18px" }}
            />
            <label htmlFor="smsNotifications" style={{ fontWeight: "bold" }}>
              SMS Notifications
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="lowStockAlerts"
              checked={lowStockAlerts}
              onChange={() => setLowStockAlerts(!lowStockAlerts)}
              style={{ marginRight: "10px", width: "18px", height: "18px" }}
            />
            <label htmlFor="lowStockAlerts" style={{ fontWeight: "bold" }}>
              Low Stock Alerts
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="orderNotifications"
              checked={orderNotifications}
              onChange={() => setOrderNotifications(!orderNotifications)}
              style={{ marginRight: "10px", width: "18px", height: "18px" }}
            />
            <label htmlFor="orderNotifications" style={{ fontWeight: "bold" }}>
              Order Notifications
            </label>
          </div>

          <div style={{ marginTop: "15px" }}>
            <button
              style={{
                backgroundColor: "#4dabf7",
                color: "white",
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleSaveSettings("Notification")}
            >
              Save Notification Settings
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Settings
