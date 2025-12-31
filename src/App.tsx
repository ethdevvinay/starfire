import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import EnquiryManagement from "./admin/pages/EnquiryManagement";
import ProductManagement from "./admin/pages/ProductManagement";
import CategoryManagement from "./admin/pages/CategoryManagement";
import ContactEnquiryManagement from "./admin/pages/ContactEnquiryManagement";

function App() {
  return (
    <div className="min-h-screen bg-dark-950 relative overflow-x-hidden">
      {/* Dynamic Background Decorations */}
      <div className="bg-blob top-[-10%] left-[-10%]" />
      <div className="bg-blob bottom-[-10%] right-[-10%] animation-delay-2000" />
      <div className="bg-blob top-[40%] right-[-15%] blur-[120px] opacity-30" />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <Products />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <>
              <Navbar />
              <ProductDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <Services />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/enquiry"
          element={
            <>
              <Navbar />
              <Enquiry />
              <Footer />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/enquiries" element={<EnquiryManagement />} />
        <Route
          path="/admin/contact-enquiries"
          element={<ContactEnquiryManagement />}
        />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
      </Routes>
    </div>
  );
}

export default App;
