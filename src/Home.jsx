"use client"
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsDatabase,
  BsExclamationTriangle,
  BsTrash,
  BsCheck2Circle,
  BsArrowUpShort,
  BsArrowDownShort,
  BsCalendarCheck,
  BsGraphUp,
  BsCloudRain,
  BsSun,
  BsCloud,
  BsSnow,
  BsChevronDown,
  BsChevronUp,
  BsThermometer,
  BsDroplet,
  BsWind,
  BsEye,
  BsCalendar3,
  BsGeoAlt,
  BsStarFill,
  BsPersonCheck,
  BsClipboardCheck,
  BsBarChart,
  BsClockHistory,
  BsAward,
  BsMusicNote,
  BsCup,
  BsTrophy,
  BsCamera,
  BsFlag,
  BsRecycle,
  BsBoxSeam,
  BsDropletHalf,
  BsTree,
  BsX,
  BsPlus,
  BsDownload,
  BsExclamationCircle,
  BsCheckCircle,
  BsInfoCircle,
  BsThreeDotsVertical,
  BsPencil,
} from "react-icons/bs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const WASTE_LS_KEY = "waste:entries"

function Home() {
  const navigate = useNavigate()

  const [isWeatherExpanded, setIsWeatherExpanded] = useState(false)
  const [isEventsExpanded, setIsEventsExpanded] = useState(false)
  const [isLaborExpanded, setIsLaborExpanded] = useState(false)
  const [isWasteExpanded, setIsWasteExpanded] = useState(false)
  const [selectedWasteCategory, setSelectedWasteCategory] = useState("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState("week")

  const [selectedLocation, setSelectedLocation] = useState("South London")
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showForecastEditor, setShowForecastEditor] = useState(false)
  const [editingForecast, setEditingForecast] = useState({ type: "", value: "" })

  const locationData = {
    "South London": {
      sales: { current: 33796.1, forecast: 113109.77, percentage: 25 },
      labor: { current: 8195.93, forecast: 12997.07, percentage: 9, secondary: 14 },
    },
    "North London": {
      sales: { current: 28450.75, forecast: 95200.5, percentage: 18 },
      labor: { current: 7250.4, forecast: 11800.25, percentage: 12, secondary: 16 },
    },
    "East London": {
      sales: { current: 41200.3, forecast: 125000.8, percentage: 32 },
      labor: { current: 9800.6, forecast: 15200.9, percentage: 7, secondary: 12 },
    },
    "West London": {
      sales: { current: 35600.85, forecast: 108500.4, percentage: 22 },
      labor: { current: 8900.2, forecast: 13500.75, percentage: 15, secondary: 18 },
    },
  }

  const currentData = locationData[selectedLocation]

  // Dropdown for headers
  const [openMenu, setOpenMenu] = useState(null) // "weather" | "events" | "labor" | null

  // Waste entries (persisted)
  const [wasteEntries, setWasteEntries] = useState([])
  const [showWasteForm, setShowWasteForm] = useState(false)
  const [wasteForm, setWasteForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: "food",
    amount: "",
    unit: "lbs",
    cost: "",
    note: "",
  })
  const [wasteFilter, setWasteFilter] = useState("all")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WASTE_LS_KEY)
      if (raw) setWasteEntries(JSON.parse(raw))
    } catch {}
  }, [])

  const saveWasteEntries = (entries) => {
    setWasteEntries(entries)
    try {
      localStorage.setItem(WASTE_LS_KEY, JSON.stringify(entries))
    } catch {}
  }

  const addWasteEntry = (e) => {
    e.preventDefault()
    if (!wasteForm.amount || !wasteForm.cost) return
    const entry = {
      id: Date.now(),
      ...wasteForm,
      amount: Number(wasteForm.amount),
      cost: Number(wasteForm.cost),
    }
    const next = [entry, ...wasteEntries]
    saveWasteEntries(next)
    setShowWasteForm(false)
    setWasteForm({
      date: new Date().toISOString().slice(0, 10),
      category: "food",
      amount: "",
      unit: wasteForm.category === "beverages" ? "gallons" : "lbs",
      cost: "",
      note: "",
    })
    // Ensure section is open to show the new entry
    setIsWasteExpanded(true)
  }

  const removeWasteEntry = (id) => {
    const next = wasteEntries.filter((w) => w.id !== id)
    saveWasteEntries(next)
  }

  const filteredWasteEntries = useMemo(() => {
    return wasteEntries.filter((e) => (wasteFilter === "all" ? true : e.category === wasteFilter))
  }, [wasteEntries, wasteFilter])

  const toggleMenu = (key) => {
    setOpenMenu((curr) => (curr === key ? null : key))
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setShowLocationDropdown(false)
  }

  const handleForecastEdit = (type, currentValue) => {
    setEditingForecast({ type, value: currentValue.toString() })
    setShowForecastEditor(true)
  }

  const saveForecastEdit = () => {
    // In a real app, this would update the backend
    console.log(`[v0] Updating ${editingForecast.type} forecast to: ${editingForecast.value}`)
    setShowForecastEditor(false)
    setEditingForecast({ type: "", value: "" })
  }

  // Waste Management Data
  const wasteCategories = [
    {
      id: "food",
      name: "Food Waste",
      icon: <BsCup />,
      color: "#f093fb",
      amount: 45.2,
      unit: "lbs",
      cost: 180.8,
      trend: -8.5,
      description: "Burgers, pasta, expired ingredients, plate waste",
      items: [
        { name: "Burger patties", amount: 12.5, cost: 62.5 },
        { name: "Pasta dishes", amount: 8.7, cost: 43.5 },
        { name: "Bread & buns", amount: 15.2, cost: 45.6 },
        { name: "Vegetables", amount: 8.8, cost: 29.2 },
      ],
    },
    {
      id: "beverages",
      name: "Beverage Waste",
      icon: <BsDropletHalf />,
      color: "#667eea",
      amount: 28.7,
      unit: "gallons",
      cost: 157.4,
      trend: +12.3,
      description: "Beer, wine, whisky, soft drinks, expired beverages",
      items: [
        { name: "Craft Beer", amount: 8.5, cost: 68.0 },
        { name: "Red Wine", amount: 6.2, cost: 49.6 },
        { name: "Whisky", amount: 2.1, cost: 25.2 },
        { name: "Soft Drinks", amount: 11.9, cost: 14.6 },
      ],
    },
    {
      id: "packaging",
      name: "Packaging Waste",
      icon: <BsBoxSeam />,
      color: "#43e97b",
      amount: 22.1,
      unit: "lbs",
      cost: 44.2,
      trend: -5.2,
      description: "Bottles, cans, food containers, wrapping materials",
      items: [
        { name: "Beer bottles", amount: 8.5, cost: 17.0 },
        { name: "Wine bottles", amount: 6.2, cost: 12.4 },
        { name: "Food containers", amount: 7.4, cost: 14.8 },
      ],
    },
    {
      id: "organic",
      name: "Organic Waste",
      icon: <BsTree />,
      color: "#4facfe",
      amount: 18.9,
      unit: "lbs",
      cost: 37.8,
      trend: -15.7,
      description: "Vegetable peels, coffee grounds, compostable items",
      items: [
        { name: "Vegetable scraps", amount: 12.1, cost: 24.2 },
        { name: "Coffee grounds", amount: 6.8, cost: 13.6 },
      ],
    },
  ]

  const wasteTimelineData = [
    { date: "2025-01-01", food: 42, beverages: 25, packaging: 18, organic: 28 },
    { date: "2025-01-02", food: 38, beverages: 30, packaging: 16, organic: 25 },
    { date: "2025-01-03", food: 45, beverages: 28, packaging: 15, organic: 22 },
    { date: "2025-01-04", food: 52, beverages: 35, packaging: 20, organic: 30 },
    { date: "2025-01-05", food: 48, beverages: 32, packaging: 17, organic: 26 },
    { date: "2025-01-06", food: 41, beverages: 29, packaging: 14, organic: 21 },
    { date: "2025-01-07", food: 45, beverages: 28, packaging: 15, organic: 22 },
  ]

  const wasteReductionGoals = [
    { category: "Food Waste", current: 45.2, target: 35.0, progress: 68 },
    { category: "Beverages", current: 28.7, target: 22.0, progress: 77 },
    { category: "Packaging", current: 22.1, target: 18.0, progress: 81 },
    { category: "Organic", current: 18.9, target: 15.0, progress: 79 },
  ]

  const wasteAlerts = [
    {
      type: "warning",
      title: "High Beverage Waste Alert",
      message: "Beer and wine waste increased by 15% this week. Check storage conditions and expiry dates.",
      time: "2 hours ago",
      priority: "high",
    },
    {
      type: "success",
      title: "Food Waste Goal Progress",
      message: "Successfully reduced burger waste by 12% through better portion control.",
      time: "1 day ago",
      priority: "low",
    },
    {
      type: "info",
      title: "Recycling Pickup Scheduled",
      message: "Next bottle and can pickup is scheduled for tomorrow at 8:00 AM.",
      time: "3 hours ago",
      priority: "medium",
    },
  ]

  const wasteDisposalMethods = [
    { method: "Composting", percentage: 35, color: "#43e97b" },
    { method: "Recycling", percentage: 28, color: "#4facfe" },
    { method: "Landfill", percentage: 25, color: "#f093fb" },
    { method: "Donation", percentage: 12, color: "#667eea" },
  ]

  const data = [
    { name: "Jan", sales: 4000, revenue: 2400, profit: 2000 },
    { name: "Feb", sales: 3000, revenue: 1398, profit: 1800 },
    { name: "Mar", sales: 2000, revenue: 9800, profit: 2290 },
    { name: "Apr", sales: 2780, revenue: 3908, profit: 2500 },
    { name: "May", sales: 1890, revenue: 4800, profit: 2181 },
    { name: "Jun", sales: 2390, revenue: 3800, profit: 2500 },
    { name: "Jul", sales: 3490, revenue: 4300, profit: 2800 },
  ]

  const pieData = [
    { name: "Food", value: 400 },
    { name: "Beverages", value: 300 },
    { name: "Supplies", value: 200 },
    { name: "Equipment", value: 100 },
  ]

  const weatherSalesData = [
    { date: "25/05", temp: 22, sales: 1200, weather: "sunny", forecast: 1350 },
    { date: "26/05", temp: 18, sales: 980, weather: "rainy", forecast: 1100 },
    { date: "27/05", temp: 25, sales: 1450, weather: "sunny", forecast: 1500 },
    { date: "28/05", temp: 15, sales: 850, weather: "cloudy", forecast: 950 },
    { date: "29/05", temp: 28, sales: 1600, weather: "sunny", forecast: 1650 },
    { date: "30/05", temp: 12, sales: 750, weather: "rainy", forecast: 800 },
    { date: "31/05", temp: 20, sales: 1100, weather: "cloudy", forecast: 1200 },
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

  const upcomingEvents = [
    {
      name: "Summer Music Festival",
      date: "June 15-17",
      impact: "High",
      expectedIncrease: "+45%",
      type: "Music Event",
      distance: "0.5 km",
      attendance: "15,000",
      icon: <BsMusicNote />,
      historicalImpact: 42,
    },
    {
      name: "Food & Wine Expo",
      date: "June 22-24",
      impact: "Very High",
      expectedIncrease: "+65%",
      type: "Food Event",
      distance: "0.2 km",
      attendance: "25,000",
      icon: <BsCup />,
      historicalImpact: 68,
    },
    {
      name: "Local Marathon",
      date: "June 8",
      impact: "Medium",
      expectedIncrease: "+25%",
      type: "Sports Event",
      distance: "1.2 km",
      attendance: "8,000",
      icon: <BsTrophy />,
      historicalImpact: 28,
    },
    {
      name: "Art Gallery Opening",
      date: "June 12",
      impact: "Low",
      expectedIncrease: "+15%",
      type: "Cultural Event",
      distance: "0.8 km",
      attendance: "3,000",
      icon: <BsCamera />,
      historicalImpact: 18,
    },
  ]

  const eventImpactData = [
    { month: "Jan", musicEvents: 2, foodEvents: 1, sportsEvents: 3, salesIncrease: 25 },
    { month: "Feb", musicEvents: 1, foodEvents: 2, sportsEvents: 2, salesIncrease: 18 },
    { month: "Mar", musicEvents: 3, foodEvents: 1, sportsEvents: 4, salesIncrease: 35 },
    { month: "Apr", musicEvents: 2, foodEvents: 3, sportsEvents: 2, salesIncrease: 28 },
    { month: "May", musicEvents: 4, foodEvents: 2, sportsEvents: 3, salesIncrease: 42 },
    { month: "Jun", musicEvents: 3, foodEvents: 4, sportsEvents: 5, salesIncrease: 55 },
  ]

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

  const staffPerformanceData = [
    { name: "John Smith", efficiency: 95, tasks: 24, rating: 4.8, shift: "Morning" },
    { name: "Sarah Johnson", efficiency: 88, tasks: 22, rating: 4.6, shift: "Evening" },
    { name: "Mike Wilson", efficiency: 92, tasks: 26, rating: 4.7, shift: "Morning" },
    { name: "Emma Davis", efficiency: 85, tasks: 20, rating: 4.5, shift: "Evening" },
    { name: "Alex Brown", efficiency: 90, tasks: 23, rating: 4.6, shift: "Night" },
  ]

  const laborMetrics = [
    { metric: "Efficiency", value: 89, target: 85, color: "#43e97b" },
    { metric: "Attendance", value: 94, target: 90, color: "#667eea" },
    { metric: "Productivity", value: 87, target: 80, color: "#f093fb" },
    { metric: "Satisfaction", value: 91, target: 85, color: "#4facfe" },
  ]

  const COLORS = ["#667eea", "#f093fb", "#4facfe", "#43e97b"]

  const getWeatherIcon = (weather) => {
    switch (weather) {
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

  const getEventIcon = (type) => {
    switch (type) {
      case "Music Event":
        return <BsMusicNote className="event-type-icon music" />
      case "Food Event":
        return <BsCup className="event-type-icon food" />
      case "Sports Event":
        return <BsTrophy className="event-type-icon sports" />
      case "Cultural Event":
        return <BsCamera className="event-type-icon cultural" />
      default:
        return <BsFlag className="event-type-icon" />
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <BsExclamationCircle style={{ color: "#f093fb" }} />
      case "success":
        return <BsCheckCircle style={{ color: "#43e97b" }} />
      case "info":
        return <BsInfoCircle style={{ color: "#4facfe" }} />
      default:
        return <BsInfoCircle />
    }
  }

  const getTotalWaste = () => {
    // Base categories + sum of persisted entries (convert only matching units)
    const baseTotal = wasteCategories.reduce((total, category) => total + category.amount, 0)
    const entriesTotal = wasteEntries.reduce((sum, e) => {
      // Add only 'lbs' to lbs-like categories; beverages tracked separately (gallons) won't be added to lbs
      if (e.unit === "lbs") return sum + e.amount
      return sum
    }, 0)
    return (baseTotal + entriesTotal).toFixed(1)
  }

  const getTotalCost = () => {
    const baseCost = wasteCategories.reduce((total, category) => total + category.cost, 0)
    const entriesCost = wasteEntries.reduce((sum, e) => sum + (e.cost || 0), 0)
    return (baseCost + entriesCost).toFixed(2)
  }

  const getFilteredWasteData = () => {
    if (selectedWasteCategory === "all") {
      return wasteTimelineData
    }
    return wasteTimelineData.map((item) => ({
      date: item.date,
      [selectedWasteCategory]: item[selectedWasteCategory],
    }))
  }

  const handleWasteRecordedClick = () => {
    setIsWasteExpanded(true)
  }

  const HeaderMenu = ({ id, onOpenDetails, onToggle, isExpanded }) => {
    return (
      <div style={{ position: "relative" }}>
        <button
          className="glass-button"
          onClick={(e) => {
            e.stopPropagation()
            toggleMenu(id)
          }}
          aria-haspopup="menu"
          aria-expanded={openMenu === id}
          title="Options"
        >
          <BsThreeDotsVertical /> Options
        </button>
        {openMenu === id && (
          <div
            role="menu"
            style={{
              position: "absolute",
              right: 0,
              marginTop: 8,
              background: "var(--background-solid)",
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              padding: 8,
              minWidth: 180,
              zIndex: 20,
              border: "1px solid var(--glass-border)",
            }}
          >
            <button
              className="glass-button"
              onClick={(e) => {
                e.stopPropagation()
                onOpenDetails()
                setOpenMenu(null)
              }}
              style={{ width: "100%", marginBottom: 6, display: "flex", justifyContent: "space-between" }}
            >
              Open details <span>↗</span>
            </button>
            <button
              className="glass-button"
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
                setOpenMenu(null)
              }}
              style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
            >
              {isExpanded ? "Collapse" : "Expand"} <span>{isExpanded ? "▾" : "▸"}</span>
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h2>Dashboard Overview</h2>
        <div className="header-actions">
          <div className="header-date">
            <BsCalendarCheck className="icon" />
            <span>July 6, 2025</span>
          </div>
          <div className="relative">
            <div className="header-icon">
              <BsFillBellFill className="icon" />
              <span className="notification-badge">3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="location-sales-labor-section">
        {/* Location with Dropdown */}
        <div className="location-container">
          <div className="location-card clickable" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
            <BsGeoAlt className="location-icon" />
            <span className="location-text">{selectedLocation}</span>
            <BsChevronDown className={`dropdown-arrow ${showLocationDropdown ? "rotated" : ""}`} />
          </div>

          {showLocationDropdown && (
            <div className="location-dropdown">
              {Object.keys(locationData).map((location) => (
                <div
                  key={location}
                  className={`location-option ${location === selectedLocation ? "selected" : ""}`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <BsGeoAlt className="location-option-icon" />
                  <span>{location}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sales and Labor Cards - No Gap */}
        <div className="sales-labor-container">
          {/* Sales Card */}
          <div className="prediction-card sales-card">
            <div className="prediction-header">
              <h3>Sales</h3>
              <div className="prediction-indicator positive">
                <BsArrowUpShort />
                <span>{currentData.sales.percentage}%</span>
              </div>
            </div>
            <div className="prediction-main-value">
              €{currentData.sales.current.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="prediction-forecast">
              <span className="forecast-label">Forecast</span>
              <span
                className="forecast-value editable"
                onClick={() => handleForecastEdit("sales", currentData.sales.forecast)}
              >
                €{currentData.sales.forecast.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                <BsPencil className="edit-icon" />
              </span>
            </div>
          </div>

          {/* Labor Card */}
          <div className="prediction-card labor-card">
            <div className="prediction-header">
              <h3>Staff </h3>
              <div className="prediction-indicator negative">
                <BsArrowUpShort />
                <span>+{currentData.labor.percentage}%</span>
              </div>
            </div>
            <div className="prediction-main-value">
              €{currentData.labor.current.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="prediction-secondary-value">{currentData.labor.secondary}%</div>
            <div className="prediction-forecast">
              <span className="forecast-label">Forecast</span>
              <span
                className="forecast-value editable"
                onClick={() => handleForecastEdit("labor", currentData.labor.forecast)}
              >
                €{currentData.labor.forecast.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                <BsPencil className="edit-icon" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {showForecastEditor && (
        <div className="modal-overlay" onClick={() => setShowForecastEditor(false)}>
          <div className="forecast-editor-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit {editingForecast.type === "sales" ? "Sales" : "Staff "} Forecast</h3>
              <button className="close-button" onClick={() => setShowForecastEditor(false)}>
                <BsX />
              </button>
            </div>
            <div className="modal-body">
              <label>Forecast Value (€)</label>
              <input
                type="number"
                value={editingForecast.value}
                onChange={(e) => setEditingForecast({ ...editingForecast, value: e.target.value })}
                className="forecast-input"
                step="0.01"
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowForecastEditor(false)}>
                Cancel
              </button>
              <button className="save-button" onClick={saveForecastEdit}>
                Save Forecast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waste Management Section */}
      {isWasteExpanded && (
        <div className="waste-management-section">
          <div className="waste-header">
            <div className="waste-title">
              <BsRecycle className="waste-main-icon" />
              <div>
                <h3>Waste Management & Sustainability</h3>
                <p>Food & Beverage waste tracking and environmental impact analysis</p>
              </div>
            </div>
            <div className="waste-controls">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="glass-button"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="glass-button" onClick={() => window.print()}>
                <BsDownload /> Export Report
              </button>
              <button className="glass-button" onClick={() => setIsWasteExpanded(false)} title="Close">
                <BsX />
              </button>
            </div>
          </div>

          <div className="waste-content">
            {/* Waste Overview Cards */}
            <div className="waste-overview">
              <div className="waste-summary-cards">
                <div className="waste-summary-card">
                  <BsTrash className="waste-summary-icon" />
                  <div className="waste-summary-details">
                    <h4>Total Waste</h4>
                    <div className="waste-summary-number">{getTotalWaste()}</div>
                    <p>lbs this period</p>
                  </div>
                </div>
                <div className="waste-summary-card">
                  <span className="waste-summary-icon" style={{ fontSize: "24px" }}>
                    €
                  </span>
                  <div className="waste-summary-details">
                    <h4>Cost Impact</h4>
                    <div className="waste-summary-number">€{getTotalCost()}</div>
                    <p>total cost</p>
                  </div>
                </div>
                <div className="waste-summary-card">
                  <BsRecycle className="waste-summary-icon" />
                  <div className="waste-summary-details">
                    <h4>Recycled</h4>
                    <div className="waste-summary-number">63%</div>
                    <p>of total waste</p>
                  </div>
                </div>
                <div className="waste-summary-card">
                  <BsTree className="waste-summary-icon" />
                  <div className="waste-summary-details">
                    <h4>Carbon Saved</h4>
                    <div className="waste-summary-number">2.4</div>
                    <p>tons CO2 equiv</p>
                  </div>
                </div>
              </div>

              {/* Waste Alerts */}
              <div className="waste-alerts">
                <h4>
                  <BsExclamationTriangle /> Waste Alerts
                </h4>
                <div className="alerts-list">
                  {wasteAlerts.map((alert, index) => (
                    <div key={index} className={`alert-item ${alert.priority}`}>
                      <div className="alert-icon">{getAlertIcon(alert.type)}</div>
                      <div className="alert-content">
                        <h5>{alert.title}</h5>
                        <p>{alert.message}</p>
                        <span className="alert-time">{alert.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waste Categories Grid */}
            <div className="waste-categories-section">
              <h4>
                <BsBarChart /> Food & Beverage Waste Breakdown
              </h4>
              <div className="waste-categories-grid">
                {wasteCategories.map((category) => (
                  <div key={category.id} className="waste-category-card">
                    <div className="category-header">
                      <div className="category-icon" style={{ backgroundColor: category.color }}>
                        {category.icon}
                      </div>
                      <div className="category-info">
                        <h5>{category.name}</h5>
                        <p>{category.description}</p>
                      </div>
                    </div>
                    <div className="category-metrics">
                      <div className="metric-row">
                        <span className="metric-label">Amount:</span>
                        <span className="metric-value">
                          {category.amount} {category.unit}
                        </span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">Cost Impact:</span>
                        <span className="metric-value">€{category.cost}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-label">Trend:</span>
                        <span className={`metric-value ${category.trend > 0 ? "negative" : "positive"}`}>
                          {category.trend > 0 ? <BsArrowUpShort /> : <BsArrowDownShort />}
                          {Math.abs(category.trend)}%
                        </span>
                      </div>
                    </div>

                    {/* Detailed Items Breakdown */}
                    <div className="category-items">
                      <h6>Top Items:</h6>
                      {category.items.map((item, idx) => (
                        <div key={idx} className="item-row">
                          <span className="item-name">{item.name}</span>
                          <span className="item-amount">
                            {item.amount} {category.unit}
                          </span>
                          <span className="item-cost">€{item.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Waste Charts */}
            <div className="waste-charts-grid">
              <div className="waste-chart-card">
                <div className="chart-header">
                  <h4>Waste Timeline Tracking</h4>
                  <div className="chart-filters">
                    <select
                      value={selectedWasteCategory}
                      onChange={(e) => setSelectedWasteCategory(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Categories</option>
                      <option value="food">Food Waste</option>
                      <option value="beverages">Beverages</option>
                      <option value="packaging">Packaging</option>
                      <option value="organic">Organic</option>
                    </select>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getFilteredWasteData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    {selectedWasteCategory === "all" ? (
                      <>
                        <Line type="monotone" dataKey="food" stroke="#f093fb" strokeWidth={3} name="Food Waste" />
                        <Line type="monotone" dataKey="beverages" stroke="#667eea" strokeWidth={3} name="Beverages" />
                        <Line type="monotone" dataKey="packaging" stroke="#43e97b" strokeWidth={3} name="Packaging" />
                        <Line type="monotone" dataKey="organic" stroke="#4facfe" strokeWidth={3} name="Organic" />
                      </>
                    ) : (
                      <Line
                        type="monotone"
                        dataKey={selectedWasteCategory}
                        stroke={wasteCategories.find((c) => c.id === selectedWasteCategory)?.color || "#667eea"}
                        strokeWidth={3}
                        name={wasteCategories.find((c) => c.id === selectedWasteCategory)?.name || "Waste"}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="waste-chart-card">
                <h4>Disposal Methods Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={wasteDisposalMethods}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ method, percentage }) => `${method} ${percentage}%`}
                    >
                      {wasteDisposalMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recorded Waste Entries (Persisted) */}
            <div className="waste-goals-section">
              <h4>
                <BsClipboardCheck /> Recorded Waste Entries
              </h4>

              <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <select
                  className="glass-button"
                  value={wasteFilter}
                  onChange={(e) => setWasteFilter(e.target.value)}
                  title="Filter by category"
                >
                  <option value="all">All</option>
                  <option value="food">Food</option>
                  <option value="beverages">Beverages</option>
                  <option value="packaging">Packaging</option>
                  <option value="organic">Organic</option>
                </select>
                <span className="text-gradient" style={{ fontWeight: 700 }}>
                  Total entries: {filteredWasteEntries.length}
                </span>
              </div>

              {filteredWasteEntries.length === 0 ? (
                <div className="goal-card">No recorded entries yet.</div>
              ) : (
                <div className="user-table-container">
                  <table className="user-table" style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Cost</th>
                        <th>Note</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWasteEntries.map((e) => (
                        <tr key={e.id}>
                          <td>{e.date}</td>
                          <td style={{ textTransform: "capitalize" }}>{e.category}</td>
                          <td>
                            {e.amount} {e.unit}
                          </td>
                          <td>€{e.cost.toFixed(2)}</td>
                          <td>{e.note || "-"}</td>
                          <td>
                            <button className="action-btn delete" onClick={() => removeWasteEntry(e.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="waste-actions">
              <h4>
                <BsClipboardCheck /> Quick Actions
              </h4>
              <div className="waste-actions-grid">
                <div className="waste-action-card" onClick={() => setShowWasteForm(true)}>
                  <BsPlus className="action-icon" />
                  <div className="action-content">
                    <h5>Record Waste</h5>
                    <p>Log new food/beverage disposal entry</p>
                  </div>
                </div>
                <div className="waste-action-card">
                  <BsRecycle className="action-icon" />
                  <div className="action-content">
                    <h5>Schedule Pickup</h5>
                    <p>Arrange bottle & can collection service</p>
                  </div>
                </div>
                <div className="waste-action-card">
                  <BsBarChart className="action-icon" />
                  <div className="action-content">
                    <h5>Generate Report</h5>
                    <p>Create detailed waste analytics</p>
                  </div>
                </div>
                <div className="waste-action-card">
                  <BsTree className="action-icon" />
                  <div className="action-content">
                    <h5>Sustainability Tips</h5>
                    <p>View waste reduction recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal: Record Waste */}
            {showWasteForm && (
              <div
                role="dialog"
                aria-modal="true"
                onClick={() => setShowWasteForm(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 50,
                  padding: 16,
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "100%",
                    maxWidth: 520,
                    background: "var(--background-solid)",
                    borderRadius: 16,
                    border: "1px solid var(--glass-border)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                    padding: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 className="section-title" style={{ margin: 0, borderBottom: "none" }}>
                      Record Waste
                    </h3>
                    <button className="glass-button" onClick={() => setShowWasteForm(false)}>
                      <BsX />
                    </button>
                  </div>

                  <form onSubmit={addWasteEntry} style={{ display: "grid", gap: 12, marginTop: 12 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label>Date</label>
                        <input
                          type="date"
                          required
                          value={wasteForm.date}
                          onChange={(e) => setWasteForm((f) => ({ ...f, date: e.target.value }))}
                          className="glass-button"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div>
                        <label>Category</label>
                        <select
                          className="glass-button"
                          value={wasteForm.category}
                          onChange={(e) =>
                            setWasteForm((f) => ({
                              ...f,
                              category: e.target.value,
                              unit: e.target.value === "beverages" ? "gallons" : "lbs",
                            }))
                          }
                          style={{ width: "100%" }}
                        >
                          <option value="food">Food</option>
                          <option value="beverages">Beverages</option>
                          <option value="packaging">Packaging</option>
                          <option value="organic">Organic</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label>Amount</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          required
                          placeholder="0"
                          value={wasteForm.amount}
                          onChange={(e) => setWasteForm((f) => ({ ...f, amount: e.target.value }))}
                          className="glass-button"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div>
                        <label>Unit</label>
                        <select
                          className="glass-button"
                          value={wasteForm.unit}
                          onChange={(e) => setWasteForm((f) => ({ ...f, unit: e.target.value }))}
                          style={{ width: "100%" }}
                        >
                          <option value="lbs">lbs</option>
                          <option value="gallons">gallons</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label>Cost ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          required
                          placeholder="0.00"
                          value={wasteForm.cost}
                          onChange={(e) => setWasteForm((f) => ({ ...f, cost: e.target.value }))}
                          className="glass-button"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div>
                        <label>Note</label>
                        <input
                          type="text"
                          placeholder="Optional note"
                          value={wasteForm.note}
                          onChange={(e) => setWasteForm((f) => ({ ...f, note: e.target.value }))}
                          className="glass-button"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                      <button type="button" onClick={() => setShowWasteForm(false)} className="glass-button">
                        Cancel
                      </button>
                      <button type="submit" className="glass-button" style={{ background: "rgba(67,233,123,0.2)" }}>
                        Save Entry
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Weather Forecasting Section */}
      <div className="weather-forecasting-section">
        <div className="weather-header">
          <div
            className="weather-title"
            onClick={() => navigate("/weather-impact")}
            style={{ cursor: "pointer" }}
            title="Open details page"
          >
            <BsCloudRain className="weather-main-icon" />
            <div>
              <h3>Weather Forecasting & Sales Impact</h3>
              <p>25/05/2025 - 25/06/2025</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <HeaderMenu
              id="weather"
              onOpenDetails={() => navigate("/weather-impact")}
              onToggle={() => setIsWeatherExpanded((v) => !v)}
              isExpanded={isWeatherExpanded}
            />
            <button
              className="glass-button"
              onClick={() => setIsWeatherExpanded(!isWeatherExpanded)}
              aria-expanded={isWeatherExpanded}
              title={isWeatherExpanded ? "Collapse" : "Expand"}
            >
              {isWeatherExpanded ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>

        {isWeatherExpanded && (
          <div className="weather-content">
            {/* Current Weather Overview */}
            <div className="weather-overview">
              <div className="current-weather">
                <div className="weather-card">
                  <BsSun className="current-weather-icon" />
                  <div className="weather-details">
                    <h4>Today's Weather</h4>
                    <div className="temp">24°C</div>
                    <div className="weather-stats">
                      <span>
                        <BsDroplet /> 65%
                      </span>
                      <span>
                        <BsWind /> 12 km/h
                      </span>
                      <span>
                        <BsEye /> 10km
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="weather-impact-cards">
                <div className="impact-card positive">
                  <BsArrowUpShort className="impact-icon" />
                  <div>
                    <h5>Sales Boost</h5>
                    <p>+15% expected</p>
                  </div>
                </div>
                <div className="impact-card neutral">
                  <BsThermometer className="impact-icon" />
                  <div>
                    <h5>Optimal Temp</h5>
                    <p>Perfect for dining</p>
                  </div>
                </div>
                <div className="impact-card info">
                  <BsPeopleFill className="impact-icon" />
                  <div>
                    <h5>Staff Needed</h5>
                    <p>16 recommended</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather & Sales Correlation Chart */}
            <div className="weather-charts-grid">
              <div className="weather-chart-card">
                <h4>Weather vs Sales Correlation</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weatherSalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#667eea" strokeWidth={3} name="Actual Sales" />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#f093fb"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Forecasted Sales"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="weather-chart-card">
                <h4>7-Day Weather Forecast</h4>
                <div className="forecast-grid">
                  {weatherSalesData.map((day, index) => (
                    <div key={index} className="forecast-day">
                      <div className="forecast-date">{day.date}</div>
                      {getWeatherIcon(day.weather)}
                      <div className="forecast-temp">{day.temp}°C</div>
                      <div className="forecast-sales">
                        <span>Sales: ${day.sales}</span>
                        <span className="forecast-prediction">Est: ${day.forecast}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/weather-impact" className="glass-button" title="Open full weather impact page">
                Open details ↗
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Nearby Events Section */}
      <div className="events-section-container">
        <div className="events-header">
          <div
            className="events-title"
            onClick={() => navigate("/events-impact")}
            style={{ cursor: "pointer" }}
            title="Open details page"
          >
            <BsCalendar3 className="events-main-icon" />
            <div>
              <h3>Nearby Events & Impact Analysis</h3>
              <p>Real-time event tracking and sales correlation</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <HeaderMenu
              id="events"
              onOpenDetails={() => navigate("/events-impact")}
              onToggle={() => setIsEventsExpanded((v) => !v)}
              isExpanded={isEventsExpanded}
            />
            <button
              className="glass-button"
              onClick={() => setIsEventsExpanded(!isEventsExpanded)}
              aria-expanded={isEventsExpanded}
              title={isEventsExpanded ? "Collapse" : "Expand"}
            >
              {isEventsExpanded ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>

        {isEventsExpanded && (
          <div className="events-content">
            {/* Events Overview */}
            <div className="events-overview">
              <div className="events-summary">
                <div className="summary-card">
                  <BsCalendarCheck className="summary-icon" />
                  <div className="summary-details">
                    <h4>This Month</h4>
                    <div className="summary-number">12</div>
                    <p>Events nearby</p>
                  </div>
                </div>
                <div className="summary-card">
                  <BsGraphUp className="summary-icon" />
                  <div className="summary-details">
                    <h4>Avg Impact</h4>
                    <div className="summary-number">+38%</div>
                    <p>Sales increase</p>
                  </div>
                </div>
                <div className="summary-card">
                  <BsGeoAlt className="summary-icon" />
                  <div className="summary-details">
                    <h4>Radius</h4>
                    <div className="summary-number">2km</div>
                    <p>Tracking area</p>
                  </div>
                </div>
              </div>

              <div className="events-impact-metrics">
                <div className="impact-metric">
                  <div className="metric-header">
                    <h5>High Impact Events</h5>
                    <span className="metric-value">3</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill high" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="impact-metric">
                  <div className="metric-header">
                    <h5>Medium Impact Events</h5>
                    <span className="metric-value">5</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill medium" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="impact-metric">
                  <div className="metric-header">
                    <h5>Low Impact Events</h5>
                    <span className="metric-value">4</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill low" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Charts */}
            <div className="events-charts-grid">
              <div className="events-chart-card">
                <h4>Event Impact on Sales</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={eventImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="musicEvents" fill="#667eea" name="Music Events" />
                    <Bar dataKey="foodEvents" fill="#f093fb" name="Food Events" />
                    <Bar dataKey="sportsEvents" fill="#43e97b" name="Sports Events" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="events-chart-card">
                <h4>Historical Event Performance</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={eventImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="salesIncrease"
                      stroke="#4facfe"
                      strokeWidth={3}
                      name="Sales Increase %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upcoming Events List */}
            <div className="upcoming-events">
              <h4>
                <BsCalendar3 /> Upcoming Events
              </h4>
              <div className="events-grid">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="event-card">
                    <div className="event-card-header">
                      <div className="event-icon-wrapper">{getEventIcon(event.type)}</div>
                      <div className="event-basic-info">
                        <h5>{event.name}</h5>
                        <span className={`impact-badge ${event.impact.toLowerCase().replace(" ", "-")}`}>
                          {event.impact}
                        </span>
                      </div>
                    </div>
                    <div className="event-details">
                      <div className="event-detail-row">
                        <BsCalendarCheck />
                        <span>{event.date}</span>
                      </div>
                      <div className="event-detail-row">
                        <BsGeoAlt />
                        <span>{event.distance} away</span>
                      </div>
                      <div className="event-detail-row">
                        <BsPeopleFill />
                        <span>{event.attendance} expected</span>
                      </div>
                      <div className="event-detail-row">
                        <BsGraphUp />
                        <span>{event.expectedIncrease} sales boost</span>
                      </div>
                    </div>
                    <div className="event-historical">
                      <div className="historical-label">Historical Impact</div>
                      <div className="historical-bar">
                        <div className="historical-fill" style={{ width: `${event.historicalImpact}%` }}></div>
                      </div>
                      <div className="historical-value">{event.historicalImpact}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/events-impact" className="glass-button" title="Open full events impact page">
                Open details ↗
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Labor Planning Section */}
      <div className="labor-section-container">
        <div className="labor-header">
          <div
            className="labor-title"
            onClick={() => navigate("/labor-planning")}
            style={{ cursor: "pointer" }}
            title="Open details page"
          >
            <BsPersonCheck className="labor-main-icon" />
            <div>
              <h3>Staff  Planning & Optimization</h3>
              <p>AI-driven staff scheduling and performance tracking</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <HeaderMenu
              id="labor"
              onOpenDetails={() => navigate("/labor-planning")}
              onToggle={() => setIsLaborExpanded((v) => !v)}
              isExpanded={isLaborExpanded}
            />
            <button
              className="glass-button"
              onClick={() => setIsLaborExpanded(!isLaborExpanded)}
              aria-expanded={isLaborExpanded}
              title={isLaborExpanded ? "Collapse" : "Expand"}
            >
              {isLaborExpanded ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>

        {isLaborExpanded && (
          <div className="labor-content">
            {/* Labor Overview */}
            <div className="labor-overview">
              <div className="labor-summary">
                <div className="labor-summary-card">
                  <BsPeopleFill className="labor-summary-icon" />
                  <div className="labor-summary-details">
                    <h4>Active Staff</h4>
                    <div className="labor-summary-number">24</div>
                    <p>Currently scheduled</p>
                  </div>
                </div>
                <div className="labor-summary-card">
                  <BsClockHistory className="labor-summary-icon" />
                  <div className="labor-summary-details">
                    <h4>Efficiency</h4>
                    <div className="labor-summary-number">89%</div>
                    <p>Above target</p>
                  </div>
                </div>
                <div className="labor-summary-card">
                  <BsAward className="labor-summary-icon" />
                  <div className="labor-summary-details">
                    <h4>Performance</h4>
                    <div className="labor-summary-number">4.6</div>
                    <p>Average rating</p>
                  </div>
                </div>
              </div>

              <div className="labor-metrics">
                {laborMetrics.map((metric, index) => (
                  <div key={index} className="labor-metric-item">
                    <div className="labor-metric-header">
                      <h5>{metric.metric}</h5>
                      <span className="labor-metric-value">{metric.value}%</span>
                    </div>
                    <div className="labor-metric-bar">
                      <div
                        className="labor-metric-fill"
                        style={{
                          width: `${metric.value}%`,
                          backgroundColor: metric.color,
                        }}
                      ></div>
                      <div className="labor-metric-target" style={{ left: `${metric.target}%` }}></div>
                    </div>
                    <div className="labor-metric-target-label">Target: {metric.target}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labor Charts */}
            <div className="labor-charts-grid">
              <div className="labor-chart-card">
                <h4>Daily Staff Schedule Optimization</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={staffScheduleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="kitchen"
                      stackId="1"
                      stroke="#667eea"
                      fill="#667eea"
                      name="Kitchen Staff"
                    />
                    <Area
                      type="monotone"
                      dataKey="service"
                      stackId="1"
                      stroke="#f093fb"
                      fill="#f093fb"
                      name="Service Staff"
                    />
                    <Area
                      type="monotone"
                      dataKey="management"
                      stackId="1"
                      stroke="#43e97b"
                      fill="#43e97b"
                      name="Management"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="labor-chart-card">
                <h4>Weekly Staff  vs Demand</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={laborPlanningData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="predicted" fill="#4facfe" name="Predicted Demand" />
                    <Bar dataKey="actual" fill="#43e97b" name="Actual Traffic" />
                    <Bar dataKey="staff" fill="#f093fb" name="Staff Scheduled" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Staff Performance */}
            <div className="staff-performance">
              <h4>
                <BsAward /> Staff Performance Dashboard
              </h4>
              <div className="performance-grid">
                {staffPerformanceData.map((staff, index) => (
                  <div key={index} className="performance-card">
                    <div className="performance-header">
                      <div className="staff-avatar">
                        <BsPersonCheck />
                      </div>
                      <div className="staff-info">
                        <h5>{staff.name}</h5>
                        <span className={`shift-badge ${staff.shift.toLowerCase()}`}>{staff.shift}</span>
                      </div>
                    </div>
                    <div className="performance-metrics">
                      <div className="performance-metric">
                        <div className="metric-label">Efficiency</div>
                        <div className="metric-value">{staff.efficiency}%</div>
                        <div className="metric-bar">
                          <div className="metric-bar-fill efficiency" style={{ width: `${staff.efficiency}%` }}></div>
                        </div>
                      </div>
                      <div className="performance-metric">
                        <div className="metric-label">Tasks Completed</div>
                        <div className="metric-value">{staff.tasks}</div>
                      </div>
                      <div className="performance-metric">
                        <div className="metric-label">Rating</div>
                        <div className="metric-value">
                          <BsStarFill className="star-icon" />
                          {staff.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/labor-planning" className="glass-button" title="Open full labor planning page">
                  Open Labor Planning ↗
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Stats Cards */}
      <div className="main-cards">
        <div className="card" onClick={handleWasteRecordedClick} style={{ cursor: "pointer" }}>
          <div className="card-inner">
            <div>
              <h3>WASTE RECORDED</h3>
              <p>{getTotalWaste()} lbs</p>
              <span className="stat-change positive">
                <BsArrowUpShort /> Click to view details
              </span>
            </div>
            <BsTrash className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>
              <h3>PRODUCTS</h3>
              <p>300</p>
              <span className="stat-change positive">
                <BsArrowUpShort /> 12% from last month
              </span>
            </div>
            <BsFillArchiveFill className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>
              <h3>CATEGORIES</h3>
              <p>12</p>
              <span className="stat-change positive">
                <BsArrowUpShort /> 4% from last month
              </span>
            </div>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>
              <h3>CUSTOMERS</h3>
              <p>33</p>
              <span className="stat-change negative">
                <BsArrowDownShort /> 2% from last month
              </span>
            </div>
            <BsPeopleFill className="card_icon" />
          </div>
        </div>
      </div>

      {/* Key Metrics and Recent Activity Section */}
      <div className="dashboard-grid">
        {/* Key Metrics */}
        <div className="dashboard-section">
          <h3 className="section-title">Key Metrics</h3>

          <div className="metrics-grid">
            {/* Total Inventory */}
            <div className="metric-item">
              <div className="metric-icon blue">
                <BsDatabase />
              </div>
              <div className="metric-content">
                <h4>Total Inventory</h4>
                <p>300 items</p>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="metric-item">
              <div className="metric-icon orange">
                <BsExclamationTriangle />
              </div>
              <div className="metric-content">
                <h4>Low Stock Alerts</h4>
                <p>10 items</p>
              </div>
            </div>

            {/* Total Sales */}
            <div className="metric-item">
              <div className="metric-icon green">
                <span style={{ fontSize: "20px" }}>€</span>
              </div>
              <div className="metric-content">
                <h4>Total Sales</h4>
                <p>€25,000</p>
              </div>
            </div>

            {/* Net Profit */}
            <div className="metric-item">
              <div className="metric-icon purple">
                <BsGraphUp />
              </div>
              <div className="metric-content">
                <h4>Net Profit</h4>
                <p>€15,000</p>
              </div>
            </div>

            {/* Waste Recorded duplicate kept as prominent card above */}
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="dashboard-section">
          <h3 className="section-title">Recent Activity</h3>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <BsCheck2Circle />
              </div>
              <div className="activity-content">
                <h4>Item Added to Inventory</h4>
                <p>Successfully added 20 units of Item A</p>
                <span className="activity-time">3:34 PM</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <BsCheck2Circle />
              </div>
              <div className="activity-content">
                <h4>Item Removed from Inventory</h4>
                <p>Successfully removed 15 units of Item B</p>
                <span className="activity-time">2:15 PM</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">
                <BsCheck2Circle />
              </div>
              <div className="activity-content">
                <h4>Order Completed</h4>
                <p>Order #1042 marked as completed - €156.50</p>
                <span className="activity-time">1:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="dashboard-section">
        <h3 className="section-title">Top Selling Items</h3>

        <div className="top-selling-grid">
          {/* Food */}
          <div className="top-selling-category">
            <h4>Food Items</h4>

            <div className="top-selling-items">
              <div className="top-selling-item">
                <div className="top-selling-rank">1</div>
                <div className="top-selling-info">
                  <h5>Burger</h5>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "100%" }}></div>
                  </div>
                  <div className="top-selling-stats">
                    <span>200 units</span>
                    <span>€2,400 revenue</span>
                  </div>
                </div>
              </div>

              <div className="top-selling-item">
                <div className="top-selling-rank">2</div>
                <div className="top-selling-info">
                  <h5>Pasta</h5>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "75%" }}></div>
                  </div>
                  <div className="top-selling-stats">
                    <span>150 units</span>
                    <span>€1,800 revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Beverages */}
          <div className="top-selling-category">
            <h4>Beverages</h4>

            <div className="top-selling-items">
              <div className="top-selling-item">
                <div className="top-selling-rank">1</div>
                <div className="top-selling-info">
                  <h5>Red Wine</h5>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "100%" }}></div>
                  </div>
                  <div className="top-selling-stats">
                    <span>100 bottles</span>
                    <span>€1,500 revenue</span>
                  </div>
                </div>
              </div>

              <div className="top-selling-item">
                <div className="top-selling-rank">2</div>
                <div className="top-selling-info">
                  <h5>Craft Beer</h5>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "80%" }}></div>
                  </div>
                  <div className="top-selling-stats">
                    <span>80 pints</span>
                    <span>€960 revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart-card">
          <h3>Sales Performance</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#667eea" fill="url(#colorSales)" fillOpacity={0.3} />
              <Area type="monotone" dataKey="revenue" stroke="#f093fb" fill="url(#colorRevenue)" fillOpacity={0.3} />
              <Area type="monotone" dataKey="profit" stroke="#43e97b" fill="url(#colorProfit)" fillOpacity={0.3} />
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f093fb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f093fb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#43e97b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#43e97b" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Inventory Distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  )
}

export default Home
