import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { Category } from "../../types";

const CategoryManagement = () => {
  const [categories, setCategories] = useState<
    (Category & { productCount: number })[]
  >([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    (Category & { productCount: number }) | null
  >(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleOpenModal = (
    category: (Category & { productCount: number }) | null = null
  ) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingCategory
      ? `http://localhost:5000/api/categories/${editingCategory.id}`
      : "http://localhost:5000/api/categories";
    const method = editingCategory ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchCategories();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchCategories();
        }
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar activePage="categories" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Category Management
            </h1>
            <p className="text-gray-400">
              Organize and manage product categories
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-fire-500/20">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Category Name
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Products
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-fire-500/10 hover:bg-dark-800 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium">
                    {category.name}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {category.description}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-fire-500/20 text-fire-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {category.productCount} products
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="text-fire-400 hover:text-fire-300 p-2"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md glass border border-fire-500/20 rounded-2xl p-8 shadow-2xl"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Category Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-dark-800 border border-fire-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fire-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full bg-dark-800 border border-fire-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fire-500 px-4 py-2 text-white focus:outline-none focus:border-fire-500 resize-none"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 btn-primary">
                      {editingCategory ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CategoryManagement;
