import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Image as ImageIcon,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { Product } from "../../types";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: 0,
    description: "",
    image: "",
    price: 0,
    is_featured: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category_id: product.category_id || categories[0]?.id || 0,
        description: product.description,
        image: product.image,
        price: (product as any).price || 0,
        is_featured: (product as any).is_featured || 0,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        category_id: categories[0]?.id || 0,
        description: "",
        image: "",
        price: 0,
        is_featured: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("image", imageFile);

    try {
      const response = await fetch(
        "http://localhost:5000/api/upload/product-image",
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      }
      return null;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageUrl = formData.image;

    if (imageFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        alert("Failed to upload image. Please try again.");
        return;
      }
    } else if (!editingProduct && !formData.image) {
      // If adding a new product and no file is selected and no URL is provided
      alert("Please select an image or provide an image URL.");
      return;
    }

    const url = editingProduct
      ? `http://localhost:5000/api/products/${editingProduct.id}`
      : "http://localhost:5000/api/products";
    const method = editingProduct ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: finalImageUrl }),
      });
      if (response.ok) {
        fetchProducts();
        setIsModalOpen(false);
        setImageFile(null);
        setImagePreview("");
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          fetchProducts();
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar activePage="products" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Product Management
            </h1>
            <p className="text-gray-400">
              Add, edit, or remove products from your catalog
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-fire-500/20 rounded-lg text-white focus:outline-none focus:border-fire-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card group hover:border-fire-500/30 transition-all duration-300"
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="mb-2">
                <span className="text-xs bg-fire-500/20 text-fire-400 px-2 py-1 rounded-full uppercase font-bold tracking-wider">
                  {product.category_name}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500/20 transition-all flex items-center justify-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-400">No products found</p>
          </div>
        )}

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
                className="relative w-full max-w-lg glass border border-fire-500/20 rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Product Name
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
                      Category
                    </label>
                    <select
                      value={formData.category_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category_id: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-dark-800 border border-fire-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fire-500"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured === 1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_featured: e.target.checked ? 1 : 0,
                        })
                      }
                      className="w-4 h-4 bg-dark-800 border-fire-500/20 rounded text-fire-500 focus:ring-fire-500"
                    />
                    <label
                      htmlFor="is_featured"
                      className="text-sm font-medium text-gray-400"
                    >
                      Featured Product (show on homepage)
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Product Image
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        {(imagePreview || formData.image) && (
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-fire-500/20">
                            <img
                              src={imagePreview || formData.image}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-fire-500 hover:text-fire-500 transition-colors"
                          >
                            <div className="flex items-center space-x-2 text-gray-400">
                              <ImageIcon size={20} />
                              <span>
                                {uploading ? "Uploading..." : "Choose Image"}
                              </span>
                            </div>
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Supported formats: JPG, PNG, WEBP
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full bg-dark-800 border border-fire-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fire-500 resize-none"
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
                      {editingProduct ? "Update" : "Save"}
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

export default ProductManagement;
