"use client"

import { Link } from "react-router-dom"
import { useMemo } from "react"
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts"
import { BsCalendar3, BsGraphUp, BsGeoAlt, BsChevronLeft } from "react-icons/bs"

const eventImpactData = [
  { month: "Jan", musicEvents: 2, foodEvents: 1, sportsEvents: 3, salesIncrease: 25 },
  { month: "Feb", musicEvents: 1, foodEvents: 2, sportsEvents: 2, salesIncrease: 18 },
  { month: "Mar", musicEvents: 3, foodEvents: 1, sportsEvents: 4, salesIncrease: 35 },
  { month: "Apr", musicEvents: 2, foodEvents: 3, sportsEvents: 2, salesIncrease: 28 },
  { month: "May", musicEvents: 4, foodEvents: 2, sportsEvents: 3, salesIncrease: 42 },
  { month: "Jun", musicEvents: 3, foodEvents: 4, sportsEvents: 5, salesIncrease: 55 },
]

const upcomingEvents = [
  { name: "Summer Music Festival", date: "June 15-17", impact: "High", type: "Music", distance: "0.5 km" },
  { name: "Food & Wine Expo", date: "June 22-24", impact: "Very High", type: "Food", distance: "0.2 km" },
  { name: "Local Marathon", date: "June 8", impact: "Medium", type: "Sports", distance: "1.2 km" },
  { name: "Art Gallery Opening", date: "June 12", impact: "Low", type: "Cultural", distance: "0.8 km" },
]

function EventsImpact() {
  const totals = useMemo(() => {
    const months = eventImpactData.length
    return {
      totalEvents: eventImpactData.reduce((s, m) => s + m.musicEvents + m.foodEvents + m.sportsEvents, 0) || 0,
      avgImpact: Math.round(eventImpactData.reduce((s, m) => s + m.salesIncrease, 0) / months),
      radius: "2km",
    }
  }, [])

  return (
    <main className="main-container">
      <div className="main-title">
        <h2>Nearby Events & Impact Analysis</h2>
        <Link to="/" className="glass-button" title="Back to dashboard">
          <BsChevronLeft /> Back
        </Link>
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Overview</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-icon purple">
              <BsCalendar3 />
            </div>
            <div className="metric-content">
              <h4>Total Events</h4>
              <p>{totals.totalEvents}</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon green">
              <BsGraphUp />
            </div>
            <div className="metric-content">
              <h4>Average Impact</h4>
              <p>+{totals.avgImpact}%</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon blue">
              <BsGeoAlt />
            </div>
            <div className="metric-content">
              <h4>Tracking Radius</h4>
              <p>{totals.radius}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h3>Event Impact on Sales</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={eventImpactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="musicEvents" fill="#667eea" name="Music" />
              <Bar dataKey="foodEvents" fill="#f093fb" name="Food" />
              <Bar dataKey="sportsEvents" fill="#43e97b" name="Sports" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Historical Sales Increase</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={eventImpactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="salesIncrease" stroke="#4facfe" strokeWidth={3} name="Sales Increase %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Upcoming Events</h3>
        <div className="events-grid">
          {upcomingEvents.map((e, i) => (
            <div key={i} className="event-card">
              <div className="event-card-header">
                <div className="event-basic-info">
                  <h5>{e.name}</h5>
                  <span className={`impact-badge ${e.impact.toLowerCase().replace(" ", "-")}`}>{e.impact}</span>
                </div>
              </div>
              <div className="event-details">
                <div className="event-detail-row">
                  <BsCalendar3 />
                  <span>{e.date}</span>
                </div>
                <div className="event-detail-row">
                  <BsGeoAlt />
                  <span>{e.distance}</span>
                </div>
                <div className="event-detail-row">
                  <BsGraphUp />
                  <span>Type: {e.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default EventsImpact
