"use client"

import { useState } from "react"
import { BsQuestionCircle, BsBook, BsHeadset, BsEnvelope, BsFileText } from "react-icons/bs"

function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")

  const faqItems = [
    {
      id: 1,
      category: "inventory",
      question: "How do I add new inventory items?",
      answer:
        'Navigate to the Inventory Management page, scroll down to the "Add New Item" section, fill in the required fields, and click the "Add Item" button.',
    },
    {
      id: 2,
      category: "orders",
      question: "How do I change the status of an order?",
      answer:
        "On the Order Management page, find the order you want to update, click the edit button (pencil icon), and select the new status from the dropdown menu.",
    },
    {
      id: 3,
      category: "reports",
      question: "Can I export reports to Excel?",
      answer:
        'Yes, on the Reports & Analytics page, select the date range and report type you want, then click the "DOWNLOAD" button. The report will be exported in Excel format.',
    },
    {
      id: 4,
      category: "suppliers",
      question: "How do I add a new supplier?",
      answer:
        'Go to the Supplier Management page, scroll to the "Add New Supplier" section, fill in all the required information, and click the "Add Supplier" button.',
    },
    {
      id: 5,
      category: "settings",
      question: "How do I change the system language?",
      answer:
        'Navigate to the Settings page, find the "Language" dropdown under General Settings, select your preferred language, and click "Save General Settings".',
    },
  ]

  const filteredFaqs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleContactSubmit = (e) => {
    e.preventDefault()
    alert("Your support request has been submitted. We will get back to you soon!")
    setContactName("")
    setContactEmail("")
    setContactMessage("")
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>HELP & SUPPORT</h3>
      </div>

      {/* Help Categories */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
        <div
          style={{
            flex: "1 1 200px",
            backgroundColor: "var(--card-1)",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => window.open("/documentation", "_blank")}
        >
          <BsBook style={{ fontSize: "40px", marginBottom: "10px" }} />
          <h3>Documentation</h3>
          <p>Browse our comprehensive guides</p>
        </div>

        <div
          style={{
            flex: "1 1 200px",
            backgroundColor: "var(--card-2)",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => window.open("/tutorials", "_blank")}
        >
          <BsFileText style={{ fontSize: "40px", marginBottom: "10px" }} />
          <h3>Tutorials</h3>
          <p>Step-by-step video tutorials</p>
        </div>

        <div
          style={{
            flex: "1 1 200px",
            backgroundColor: "var(--card-3)",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => window.open("/live-chat", "_blank")}
        >
          <BsHeadset style={{ fontSize: "40px", marginBottom: "10px" }} />
          <h3>Live Support</h3>
          <p>Chat with our support team</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="chart-card" style={{ marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "20px" }}>
          <BsQuestionCircle style={{ marginRight: "10px" }} />
          Frequently Asked Questions
        </h3>

        <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: "1",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              minWidth: "150px",
            }}
          >
            <option value="all">All Categories</option>
            <option value="inventory">Inventory</option>
            <option value="orders">Orders</option>
            <option value="reports">Reports</option>
            <option value="suppliers">Suppliers</option>
            <option value="settings">Settings</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "var(--sidebar-bg)",
                }}
              >
                <h4 style={{ marginBottom: "10px", color: "var(--card-1)" }}>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))
          ) : (
            <p>No FAQs found matching your search criteria.</p>
          )}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="chart-card">
        <h3 style={{ marginBottom: "20px" }}>
          <BsEnvelope style={{ marginRight: "10px" }} />
          Contact Support
        </h3>

        <form onSubmit={handleContactSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label htmlFor="name" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>

            <div>
              <label htmlFor="email" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                }}
              />
            </div>

            <div>
              <label htmlFor="message" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                How can we help you?
              </label>
              <textarea
                id="message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                rows={5}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--card-3)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default HelpSupport
