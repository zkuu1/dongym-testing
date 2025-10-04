

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

import Statistic from "@/components/Statistic";
import { LogoutButton } from "@/components/Button";
import CustomerStats from "@/components/CustomerStats";
import CustomerChart from "@/components/CustomerCharts";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";





const AdminPage = async () => {
const session = await getServerSession(authOptions);

  /**
   * 🔹 Hitung Customer Growth
   */
  const totalUsers = await prisma.user.count();

  const yesterdayUsers = await prisma.user.count({
    where: {
      createdAt: {
        lt: new Date(), // semua user sebelum hari ini
        gte: new Date(new Date().setDate(new Date().getDate() - 1)), // filter kemarin
      },
    },
  });

  const growth =
    totalUsers > 0
      ? ((totalUsers - yesterdayUsers) / totalUsers * 100).toFixed(2) + "%"
      : "0%";

  const customerStats = [
    { title: "Customer Satisfaction", value: "75.55%", target: "100%" },
    {
      title: "Customer Growth",
      value: totalUsers.toLocaleString(),
      change: growth,
      changeColor:
        parseFloat(growth) >= 0 ? "text-green-500" : "text-red-500",
    },
  ];

  /**
   * 🔹 Data untuk Statistik & Dashboard
   */
  const stats = [
    {
      title: "AAPL",
      description: "Apple, Inc",
      value: "$1,232.00",
      change: "↑11.01%",
      changeColor: "text-green-500",
    },
    {
      title: "Monthly Target",
      description: "Target services at the world month",
      value: "$20K +",
    },
    {
      title: "Revenue",
      description: "Monthly revenue",
      value: "$16K",
      change: "↑",
      changeColor: "text-green-500",
    },
    {
      title: "Orders",
      description: "Total orders",
      value: "5,359",
      change: "1.08%",
      changeColor: "text-blue-500",
    },
  ];

  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 600 },
    { month: "Apr", sales: 800 },
    { month: "May", sales: 500 },
    { month: "Jun", sales: 900 },
  ];

  // Dummy data for user growth chart
  const userGrowthChart = [
    { date: "2023-05-01", count: 10 },
    { date: "2023-05-02", count: 15 },
    { date: "2023-05-03", count: 20 },
    { date: "2023-05-04", count: 25 },
    { date: "2023-05-05", count: 30 },
    { date: "2023-05-06", count: 35 },
  ];

  const recentOrders = [
    {
      id: session?.user?.id || "1",
      customer: session?.user?.name || "Guest User",
      membership: session?.user?.membershipId,
      date: "2023-05-01",
      amount: "$120.00",
      status: "Completed",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      date: "2023-05-02",
      amount: "$250.00",
      status: "Processing",
    },
    {
      id: "#ORD-003",
      customer: "Robert Johnson",
      date: "2023-05-03",
      amount: "$75.50",
      status: "Completed",
    },
    {
      id: "#ORD-004",
      customer: "Emily Davis",
      date: "2023-05-04",
      amount: "$430.00",
      status: "Shipped",
    },
    {
      id: "#ORD-005",
      customer: "Michael Wilson",
      date: "2023-05-05",
      amount: "$210.00",
      status: "Completed",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Don Gym Admin</h1>
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Quick Menu
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/"
                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/muscle"
                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Hit The Muscle
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="block px-3 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Don Gym Admin
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded bg-gray-100"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded"
                >
                  Economies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              User Profile
            </h2>
            <ul className="space-y-1">
              <LogoutButton />
            </ul>
          </div>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {/* Welcome */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="col-span-full">
              <Statistic searchParams={{
                query: undefined
              }} />
            </div>
          </div>

          {/* Customer Stats + Chart Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Customer Stats (Growth) */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CustomerStats stats={customerStats} />
              </div>
            </div>

            
             <div className="p-6">
                <CustomerChart userGrowthChart={userGrowthChart} />
            </div>
          </div>



          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Monthly Sales
              </h3>
              <div className="text-sm text-gray-500">
                5,359 <span className="text-blue-500">4.908%</span>
              </div>
            </div>
            <div className="h-64">
              <div className="flex items-end h-48 space-x-1 mt-4">
                {salesData.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-base_purple rounded-t-sm"
                      style={{ height: `${data.sales / 10}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Showing orders for {session?.user?.name || "your account"}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">5</span> of{" "}
                <span className="font-medium">24</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
