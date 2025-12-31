import { Link } from "react-router-dom";
import {
  Home,
  Package,
  MessageSquare,
  Mail,
  FolderTree,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminSidebarProps {
  activePage?: string;
}

const AdminSidebar = ({ activePage = "dashboard" }: AdminSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/admin/dashboard",
      key: "dashboard",
    },
    {
      icon: MessageSquare,
      label: "Product Enquiries",
      path: "/admin/enquiries",
      key: "enquiries",
    },
    {
      icon: Mail,
      label: "Contact Enquiries",
      path: "/admin/contact-enquiries",
      key: "contact-enquiries",
    },
    {
      icon: Package,
      label: "Products",
      path: "/admin/products",
      key: "products",
    },
    {
      icon: FolderTree,
      label: "Categories",
      path: "/admin/categories",
      key: "categories",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass rounded-lg text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -300 }}
          className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass border-r border-fire-500/20 p-6 z-40 ${
            isOpen ? "block" : "hidden lg:block"
          }`}
        >
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/logo.png"
              alt="Star Fire Service"
              className="h-12 w-auto mb-2"
            />
            <h2 className="text-lg font-bold gradient-text">Admin Panel</h2>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = activePage === item.key;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-fire-500 text-white"
                      : "text-gray-400 hover:bg-dark-700 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="absolute bottom-6 left-6 right-6 flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </motion.aside>
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};

export default AdminSidebar;
