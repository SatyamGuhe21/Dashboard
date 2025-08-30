"use client"

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  BsCloudRain,
  BsSun,
  BsCloud,
  BsSnow,
  BsArrowUpShort,
  BsThermometer,
  BsPeopleFill,
  BsChevronLeft,
} from "react-icons/bs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

const baseWeatherSales = [
  { date: "25/05", temp: 22, sales: 1200, weather: "sunny", forecast: 1350, rain: 0 },
  { date: "26/05", temp: 18, sales: 980, weather: "rainy", forecast: 1100, rain: 7 },
  { date: "27/05", temp: 25, sales: 1450, weather: "sunny", forecast: 1500, rain: 0 },
  { date: "28/05", temp: 15, sales: 850, weather: "cloudy", forecast: 950, rain: 0 },
  { date: "29/05", temp: 28, sales: 1600, weather: "sunny", forecast: 1650, rain: 0 },
  { date: "30/05", temp: 12, sales: 750, weather: "rainy", forecast: 800, rain: 10 },
  { date: "31/05", temp: 20, sales: 1100, weather: "cloudy", forecast: 1200, rain: 0 },
]

function WeatherImpact() {
  const [days] = useState(14)
  const data = useMemo(() => {
    // extend to 14 days by looping sample
    const out = []
    for (let i = 0; i < days; i++) {
      const src = baseWeatherSales[i % baseWeatherSales.length]
      out.push({ ...src, date: `${String(i + 1).padStart(2, "0")}/06` })
    }
    return out
  }, [days])

  const weatherAgg = useMemo(() => {
    const map = {}
    data.forEach((d) => {
      map[d.weather] = map[d.weather] || { weather: d.weather, sales: 0 }
      map[d.weather].sales += d.sales
    })
    return Object.values(map)
  }, [data])

  const getIcon = (w) => {
    switch (w) {
      case "sunny":
        return <BsSun className="weather-icon sunny" />
      case "rainy":
        return <BsCloudRain className="weather-icon rainy" />
      case "cloudy":
        return <BsCloud className="weather-icon cloudy" />
      case "snowy":
        return <BsSnow className="weather-icon snowy" />
      default:
        return <BsSun className="weather-icon" />
    }
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h2>Weather Forecasting & Sales Impact</h2>
        <Link to="/" className="glass-button" title="Back to dashboard">
          <BsChevronLeft /> Back
        </Link>
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Overview</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-icon green">
              <BsArrowUpShort />
            </div>
            <div className="metric-content">
              <h4>Expected Uplift</h4>
              <p>+14%</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon blue">
              <BsThermometer />
            </div>
            <div className="metric-content">
              <h4>Avg Temp</h4>
              <p>{Math.round(data.reduce((s, d) => s + d.temp, 0) / data.length)}°C</p>
            </div>
          </div>
          <div className="metric-item">
            <div className="metric-icon purple">
              <BsPeopleFill />
            </div>
            <div className="metric-content">
              <h4>Staff Needed</h4>
              <p>+3 on warm days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h3>Sales vs Forecast</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#667eea" strokeWidth={3} />
              <Line type="monotone" dataKey="forecast" stroke="#f093fb" strokeDasharray="5 5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Temperature vs Sales</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4facfe" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#43e97b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#43e97b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="temp" stroke="#4facfe" fill="url(#temp)" />
              <Area type="monotone" dataKey="sales" stroke="#43e97b" fill="url(#sales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h3>Sales by Weather Type</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={weatherAgg}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="weather" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>14-Day Forecast</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 12,
            }}
          >
            {data.map((d, i) => (
              <div key={i} className="forecast-day">
                <div className="forecast-date">{d.date}</div>
                {getIcon(d.weather)}
                <div className="forecast-temp">{d.temp}°C</div>
                <div className="forecast-sales">
                  <span>Sales: ${d.sales}</span>
                  <span className="forecast-prediction">Est: ${d.forecast}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default WeatherImpact
