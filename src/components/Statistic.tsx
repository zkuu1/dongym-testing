import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateButton, EditButton, DeleteButton } from "./Button";
import { getUsers } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const Statistic = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (session.user.role !== "admin") {
    return <div className="p-6 text-red-600 font-semibold">Unauthorized</div>;
  }

  const query = searchParams?.query || "";
  const users = await getUsers(query);

  const recentOrders = users.map((u) => ({
    id: u.id,
    customer: u.name ?? "Unknown",
    role: u.role ?? "Unknown",
    membershipId: u.membershipId ?? "-",
    startDate: u.membership?.startDate || null,
    endDate: u.membership?.endDate || null,
    membershipStatus: u.membership?.status || "N/A",
    amount: "$120.00",
    status: "Completed",
      createdAt: u.createdAt, 
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        {/* <h1 className="text-lg font-semibold text-gray-800">User Statistics</h1> */}
        <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, {session?.user?.name || "Admin"}!
            </h1>
             <p className="text-gray-600">
              Here's what's happening with your business today.
            </p>
        <div className="mt-4">
          <CreateButton />
        </div>

        {/* Search form */}
        <form className="mt-4">
          <input
            type="text"
            name="query"
            placeholder="Search by name or member ID..."
            defaultValue={query}
            className="w-full md:w-1/3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Membership ID</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Membership Status</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.membershipId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {formatDate(order.startDate ? order.startDate.toDateString() : "")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                 {formatDate(order.endDate ? order.endDate.toDateString() : "")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.membershipStatus === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.membershipStatus}
                  </span>
                </td>
                <td>
                  <EditButton id={order.id} />
                  <DeleteButton id={order.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistic;
