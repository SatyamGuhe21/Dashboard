"use client"

import { Link } from "react-router-dom"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { BsChevronLeft } from "react-icons/bs"

const COLORS = ["#667eea", "#f093fb", "#4facfe", "#43e97b", "#fa709a"]

const trafficDaily = [
  { day: "Mon", visitors: 1200, sessions: 1600 },
  { day: "Tue", visitors: 1350, sessions: 1750 },
  { day: "Wed", visitors: 1420, sessions: 1810 },
  { day: "Thu", visitors: 1500, sessions: 1930 },
  { day: "Fri", visitors: 1700, sessions: 2200 },
  { day: "Sat", visitors: 2100, sessions: 2600 },
  { day: "Sun", visitors: 1800, sessions: 2300 },
]

const sources = [
  { name: "Google", value: 58 },
  { name: "Direct", value: 20 },
  { name: "Referral", value: 10 },
  { name: "Social", value: 8 },
  { name: "Email", value: 4 },
]

const geo = [
  { country: "US", visitors: 1800 },
  { country: "UK", visitors: 900 },
  { country: "IN", visitors: 1200 },
  { country: "CA", visitors: 700 },
  { country: "AU", visitors: 550 },
]

const topPages = [
  { path: "/menu", views: 2400, avgTime: "02:10" },
  { path: "/reservations", views: 1900, avgTime: "01:45" },
  { path: "/specials", views: 1500, avgTime: "01:30" },
  { path: "/events", views: 1200, avgTime: "01:10" },
]

function WebsiteAnalytics() {
  const totals = {
    visitors: trafficDaily.reduce((s, d) => s + d.visitors, 0),
    sessions: trafficDaily.reduce((s, d) => s + d.sessions, 0),
    bounce: 38,
    duration: "1m 42s",
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h2>Website Analytics</h2>
        <Link to="/reports" className="glass-button" title="Back to Reports">
          <BsChevronLeft /> Back
        </Link>
      </div>

      <div className="metrics-grid" style={{ marginBottom: 30 }}>
        <div className="metric-item">
          <div className="metric-icon blue">👥</div>
          <div className="metric-content">
            <h4>Total Visitors</h4>
            <p>{totals.visitors.toLocaleString()}</p>
          </div>
        </div>
        <div className="metric-item">
          <div className="metric-icon green">📈</div>
          <div className="metric-content">
            <h4>Total Sessions</h4>
            <p>{totals.sessions.toLocaleString()}</p>
          </div>
        </div>
        <div className="metric-item">
          <div className="metric-icon purple">↩️</div>
          <div className="metric-content">
            <h4>Bounce Rate</h4>
            <p>{totals.bounce}%</p>
          </div>
        </div>
        <div className="metric-item">
          <div className="metric-icon orange">⏱</div>
          <div className="metric-content">
            <h4>Avg. Session</h4>
            <p>{totals.duration}</p>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h3>Daily Visitors & Sessions</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={trafficDaily}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke="#667eea" strokeWidth={3} />
              <Line type="monotone" dataKey="sessions" stroke="#f093fb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Traffic Sources</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={sources}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {sources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h3>Top Countries</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={geo}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#43e97b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Top Pages</h3>
          <div className="user-table-container" style={{ height: "85%", overflow: "auto" }}>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Avg Time</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p, i) => (
                  <tr key={i}>
                    <td>{p.path}</td>
                    <td>{p.views.toLocaleString()}</td>
                    <td>{p.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default WebsiteAnalytics
