"use client"
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsDatabase,
  BsExclamationTriangle,
  BsCurrencyDollar,
  BsTrash,
  BsCheck2Circle,
} from "react-icons/bs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

function Home() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  return (
    <main className="main-container">
      <div className="main-title">
        <h2>Dashboard Overview</h2>
        <div className="relative">
          <BsFillBellFill className="icon text-amber-500" />
          <span className="notification-badge">1</span>
        </div>
      </div>

      {/* Key Metrics and Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Key Metrics */}
        <div className="bg-white dark:bg-sidebar-bg rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Key Metrics</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Total Inventory */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start">
              <div className="mr-3 bg-blue-100 dark:bg-blue-800/30 p-2 rounded-md">
                <BsDatabase className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Total Inventory</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">300 items</p>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg flex items-start">
              <div className="mr-3 bg-orange-100 dark:bg-orange-800/30 p-2 rounded-md">
                <BsExclamationTriangle className="text-orange-600 dark:text-orange-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-orange-800 dark:text-orange-300 font-medium">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">10 items</p>
              </div>
            </div>

            {/* Total Sales */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-start">
              <div className="mr-3 bg-green-100 dark:bg-green-800/30 p-2 rounded-md">
                <BsCurrencyDollar className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-green-800 dark:text-green-300 font-medium">Total Sales</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">$25,000</p>
              </div>
            </div>

            {/* Net Profit */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex items-start">
              <div className="mr-3 bg-purple-100 dark:bg-purple-800/30 p-2 rounded-md">
                <BsCurrencyDollar className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">Net Profit</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$15,000</p>
              </div>
            </div>

            {/* Gross Profit */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start">
              <div className="mr-3 bg-blue-100 dark:bg-blue-800/30 p-2 rounded-md">
                <BsCurrencyDollar className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Gross Profit</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">$1,000</p>
              </div>
            </div>

            {/* Waste Recorded */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-start">
              <div className="mr-3 bg-red-100 dark:bg-red-800/30 p-2 rounded-md">
                <BsTrash className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-red-800 dark:text-red-300 font-medium">Waste Recorded</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">15 lbs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="bg-white dark:bg-sidebar-bg rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Recent Activity Logs</h3>

          <div className="space-y-4">
            {/* Item Added */}
            <div className="bg-white dark:bg-sidebar-bg border border-gray-100 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold">Item Added</h4>
                <span className="text-sm text-gray-500">3:34:41 PM</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Item A added to inventory</p>
              <p className="text-green-600 dark:text-green-400 flex items-center">
                <BsCheck2Circle className="mr-1" /> Successfully added 20 units
              </p>
            </div>

            {/* Item Removed */}
            <div className="bg-white dark:bg-sidebar-bg border border-gray-100 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold">Item Removed</h4>
                <span className="text-sm text-gray-500">3:34:41 PM</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Item B removed from inventory</p>
              <p className="text-green-600 dark:text-green-400 flex items-center">
                <BsCheck2Circle className="mr-1" /> Successfully removed 15 units
              </p>
            </div>

            {/* Order Completed */}
            <div className="bg-white dark:bg-sidebar-bg border border-gray-100 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold">Order Completed</h4>
                <span className="text-sm text-gray-500">3:34:41 PM</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-1">Order #1042 marked as completed</p>
              <p className="text-green-600 dark:text-green-400 flex items-center">
                <BsCheck2Circle className="mr-1" /> Total: $156.50
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="bg-white dark:bg-sidebar-bg rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6">Top Selling Items</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Food */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-medium">Food</h4>
              <span className="text-sm text-gray-500">Units Sold</span>
            </div>

            <div className="space-y-6">
              {/* Burger */}
              <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  <span className="font-medium">Burger</span>
                  <span className="ml-auto text-amber-600 font-semibold">200 units</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>

              {/* Pasta */}
              <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  <span className="font-medium">Pasta</span>
                  <span className="ml-auto text-amber-600 font-semibold">150 units</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Beverages */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-medium">Beverages</h4>
              <span className="text-sm text-gray-500">Units Sold</span>
            </div>

            <div className="space-y-6">
              {/* Red Wine */}
              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  <span className="font-medium">Red Wine</span>
                  <span className="ml-auto text-purple-600 font-semibold">100 bottles</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>

              {/* Craft Beer */}
              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  <span className="font-medium">Craft Beer</span>
                  <span className="ml-auto text-purple-600 font-semibold">80 pints</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Original Charts Section */}
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>12</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}

export default Home
