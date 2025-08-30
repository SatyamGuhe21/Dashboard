"use client"

import { Link } from "react-router-dom"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { BsPeopleFill, BsClockHistory, BsAward, BsChevronLeft } from "react-icons/bs"

const staffScheduleData = [
  { time: "6:00", kitchen: 3, service: 2, management: 1, total: 6 },
  { time: "8:00", kitchen: 4, service: 3, management: 1, total: 8 },
  { time: "10:00", kitchen: 5, service: 4, management: 2, total: 11 },
  { time: "12:00", kitchen: 8, service: 6, management: 2, total: 16 },
  { time: "14:00", kitchen: 6, service: 5, management: 2, total: 13 },
  { time: "16:00", kitchen: 5, service: 4, management: 1, total: 10 },
  { time: "18:00", kitchen: 9, service: 7, management: 2, total: 18 },
  { time: "20:00", kitchen: 8, service: 6, management: 2, total: 16 },
  { time: "22:00", kitchen: 4, service: 3, management: 1, total: 8 },
]

const laborPlanningData = [
  { day: "Mon", predicted: 85, actual: 88, staff: 12 },
  { day: "Tue", predicted: 92, actual: 90, staff: 14 },
  { day: "Wed", predicted: 78, actual: 79, staff: 10 },
  { day: "Thu", predicted: 105, actual: 103, staff: 16 },
  { day: "Fri", predicted: 120, actual: 123, staff: 18 },
  { day: "Sat", predicted: 140, actual: 145, staff: 20 },
  { day: "Sun", predicted: 95, actual: 97, staff: 15 },
]

const roster = [
  { name: "John Smith", role: "Chef", shift: "Morning", efficiency: 95 },
  { name: "Sarah Johnson", role: "Server", shift: "Evening", efficiency: 88 },
  { name: "Mike Wilson", role: "Sous Chef", shift: "Morning", efficiency: 92 },
  { name: "Emma Davis", role: "Server", shift: "Evening", efficiency: 85 },
  { name: "Alex Brown", role: "Manager", shift: "Night", efficiency: 90 },
]

function LaborPlanning() {
  return (
    <main className="main-container">
      <div className="main-title">
        <h2>Labor Planning & Optimization</h2>
        <Link to="/" className="glass-button" title="Back to dashboard">
          <BsChevronLeft /> Back
        </Link>
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Overview</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-icon blue">
              <BsPeopleFill />
            </div>
            <div className="metric-content">
              <h4>Active Staff</h4>
              <p>24</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon purple">
              <BsClockHistory />
            </div>
            <div className="metric-content">
              <h4>Efficiency</h4>
              <p>89%</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon green">
              <BsAward />
            </div>
            <div className="metric-content">
              <h4>Avg Rating</h4>
              <p>4.6</p>
            </div>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h3>Daily Staff Schedule</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={staffScheduleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="kitchen" stackId="1" stroke="#667eea" fill="#667eea" />
              <Area type="monotone" dataKey="service" stackId="1" stroke="#f093fb" fill="#f093fb" />
              <Area type="monotone" dataKey="management" stackId="1" stroke="#43e97b" fill="#43e97b" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Weekly Labor vs Demand</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={laborPlanningData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="predicted" fill="#4facfe" name="Predicted Demand" />
              <Bar dataKey="actual" fill="#43e97b" name="Actual Traffic" />
              <Bar dataKey="staff" fill="#f093fb" name="Staff Scheduled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Roster</h3>
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Shift</th>
                <th>Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.role}</td>
                  <td>{r.shift}</td>
                  <td>{r.efficiency}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default LaborPlanning
