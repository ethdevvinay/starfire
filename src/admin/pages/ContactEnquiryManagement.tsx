import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  X,
  Phone,
  Mail,
  Clock,
  Eye,
  Trash2,
  MessageSquare,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { Enquiry } from "../../types";

const ContactEnquiryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = () => {
    fetch("/api/contact-enquiries")
      .then((res) => res.json())
      .then((data) => {
        setEnquiries(data);
      })
      .catch((err) => console.error("Error fetching contact enquiries:", err));
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const name = enquiry.name || "";
    const email = enquiry.email || "";
    const phone = enquiry.phone || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || enquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id: number, newStatus: Enquiry["status"]) => {
    try {
      const response = await fetch(`/api/contact-enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchEnquiries();
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteEnquiry = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        const response = await fetch(`/api/contact-enquiries/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchEnquiries();
          setSelectedEnquiry(null);
        }
      } catch (err) {
        console.error("Error deleting enquiry:", err);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar activePage="contact-enquiries" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Contact Enquiry Management
          </h1>
          <p className="text-gray-400">
            Manage enquiries from the Contact page
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>

            {/* Export Button */}
            <button className="btn-primary flex items-center space-x-2">
              <Download size={20} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Enquiries Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-fire-500/20">
                <th className="text-left py-3 px-4 text-gray-400 font-medium whitespace-nowrap">
                  Name & Company
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Subject
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Date
                </th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className="border-b border-fire-500/10 hover:bg-dark-800/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white font-bold">{enquiry.name}</p>
                      {enquiry.company && (
                        <p className="text-fire-400/80 text-xs font-medium uppercase tracking-wider">
                          {enquiry.company}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="text-gray-300">{enquiry.email}</p>
                      <p className="text-gray-500">{enquiry.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white bg-white/5 border border-white/5 px-3 py-1 rounded-md text-sm">
                      {enquiry.subject || "General Enquiry"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        enquiry.status === "new"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : enquiry.status === "contacted"
                          ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                          : "bg-green-500/20 text-green-400 border border-green-500/30"
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-xs italic">
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className="p-2 bg-fire-500/10 text-fire-500 rounded-lg hover:bg-fire-500 hover:text-white transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEnquiries.length === 0 && (
            <div className="text-center py-12 text-gray-500 italic">
              No matching contact enquiries found
            </div>
          )}
        </motion.div>

        {/* Enquiry Detail Modal */}
        <AnimatePresence>
          {selectedEnquiry && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEnquiry(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl glass border border-fire-500/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-fire-500 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-fire-500/20">
                    {selectedEnquiry.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedEnquiry.name}
                    </h2>
                    <p className="text-fire-400 font-medium">
                      {selectedEnquiry.company || "Individual Customer"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail size={18} className="text-fire-500" />
                      <span>{selectedEnquiry.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Phone size={18} className="text-fire-500" />
                      <span>{selectedEnquiry.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Clock size={18} className="text-fire-500" />
                      <span>
                        {new Date(selectedEnquiry.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-300 font-bold">
                      <MessageSquare size={18} className="text-fire-500" />
                      <span>
                        {selectedEnquiry.subject || "General Enquiry"}
                      </span>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 uppercase font-black mb-2 tracking-widest">
                        Status
                      </p>
                      <div className="flex gap-2">
                        {["new", "contacted", "closed"].map((status) => (
                          <button
                            key={status}
                            onClick={() =>
                              updateStatus(
                                selectedEnquiry.id,
                                status as Enquiry["status"]
                              )
                            }
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                              selectedEnquiry.status === status
                                ? "bg-fire-500 text-white shadow-lg shadow-fire-500/20"
                                : "bg-dark-800 text-gray-500 hover:text-white"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 mb-8">
                  <p className="text-xs text-gray-500 uppercase font-black mb-3 tracking-widest leading-none">
                    Customer Message
                  </p>
                  <p className="text-gray-200 leading-relaxed italic">
                    "{selectedEnquiry.message}"
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${selectedEnquiry.email}`)
                    }
                    className="flex-1 btn-primary py-4 flex items-center justify-center space-x-2"
                  >
                    <Mail size={20} />
                    <span>Send Email</span>
                  </button>
                  <button
                    onClick={() => deleteEnquiry(selectedEnquiry.id)}
                    className="px-6 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ContactEnquiryManagement;
