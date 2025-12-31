import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Package, FolderTree, TrendingUp } from "lucide-react";
import AdminSidebar from "./components/AdminSidebar";
import StatsCard from "../components/StatsCard";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalProducts: 0,
    totalCategories: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Fetch Stats
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching admin stats:", err));

    // Fetch Recent Enquiries
    fetch("/api/admin/enquiries/recent")
      .then((res) => res.json())
      .then((data) => setRecentEnquiries(data))
      .catch((err) => console.error("Error fetching recent enquiries:", err));
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar activePage="dashboard" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={MessageSquare}
            value={stats.totalEnquiries}
            label="Total Enquiries"
            growth="+12% this month"
          />
          <StatsCard
            icon={TrendingUp}
            value={stats.newEnquiries}
            label="New Enquiries"
            growth="Last 7 days"
            color="green"
          />
          <StatsCard
            icon={Package}
            value={stats.totalProducts}
            label="Total Products"
          />
          <StatsCard
            icon={FolderTree}
            value={stats.totalCategories}
            label="Categories"
          />
        </div>

        {/* Recent Enquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Enquiries</h2>
            <button
              onClick={() => navigate("/admin/enquiries")}
              className="text-fire-400 hover:text-fire-300 text-sm font-medium"
            >
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-fire-500/20">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="border-b border-fire-500/10 hover:bg-dark-800 transition-colors"
                  >
                    <td className="py-3 px-4 text-white">{enquiry.name}</td>
                    <td className="py-3 px-4 text-gray-400">
                      {enquiry.product_name ||
                        enquiry.subject ||
                        "Contact Enquiry"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          enquiry.status === "new"
                            ? "bg-blue-500/20 text-blue-400"
                            : enquiry.status === "contacted"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/admin/enquiries")}
            className="card text-left hover:border-fire-500/50 transition-all"
          >
            <MessageSquare size={32} className="text-fire-500 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Manage Enquiries
            </h3>
            <p className="text-gray-400 text-sm">
              View and respond to customer enquiries
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/admin/products")}
            className="card text-left hover:border-fire-500/50 transition-all"
          >
            <Package size={32} className="text-fire-500 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Manage Products
            </h3>
            <p className="text-gray-400 text-sm">
              Add, edit, or remove products
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/admin/categories")}
            className="card text-left hover:border-fire-500/50 transition-all"
          >
            <FolderTree size={32} className="text-fire-500 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Manage Categories
            </h3>
            <p className="text-gray-400 text-sm">Organize product categories</p>
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
