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
    <main className="main-container" style={{ overflowY: "auto", maxHeight: "none" }}>
      <div className="main-title">
        <h3>HELP & SUPPORT</h3>
      </div>

      {/* Help Categories */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
        {[{
          icon: <BsBook />, title: "Documentation", desc: "Browse our comprehensive guides", link: "/documentation", bg: "var(--card-1)"
        }, {
          icon: <BsFileText />, title: "Tutorials", desc: "Step-by-step video tutorials", link: "/tutorials", bg: "var(--card-2)"
        }, {
          icon: <BsHeadset />, title: "Live Support", desc: "Chat with our support team", link: "/live-chat", bg: "var(--card-3)"
        }].map((card, idx) => (
          <div
            key={idx}
            onClick={() => window.open(card.link, "_blank")}
            style={{
              flex: "1 1 200px",
              backgroundColor: card.bg,
              color: "white",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="chart-card" style={{ marginBottom: "30px", maxHeight: "500px", overflowY: "auto" }}>
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
              borderRadius: "4px"
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              minWidth: "150px"
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
                  backgroundColor: "var(--sidebar-bg)"
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
      <div className="chart-card" style={{ marginBottom: "60px" }}>
        <h3 style={{ marginBottom: "20px" }}>
          <BsEnvelope style={{ marginRight: "10px" }} />
          Contact Support
        </h3>

        <form onSubmit={handleContactSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {[
              {
                label: "Your Name",
                type: "text",
                value: contactName,
                onChange: setContactName,
                id: "name"
              },
              {
                label: "Email Address",
                type: "email",
                value: contactEmail,
                onChange: setContactEmail,
                id: "email"
              }
            ].map(({ label, type, value, onChange, id }) => (
              <div key={id}>
                <label htmlFor={id} style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>{label}</label>
                <input
                  type={type}
                  id={id}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  required
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "100%"
                  }}
                />
              </div>
            ))}

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
                  resize: "vertical"
                }}
              />
            </div>

            <div style={{ textAlign: "right" }}>
              <button
                type="submit"
               style={{
                backgroundColor: "#4dabf7",
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
