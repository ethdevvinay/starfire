-- Starfire Database Schema Recovery
-- This script recreates the tables from the corrupted starfire_db.sql

CREATE DATABASE IF NOT EXISTS starfire_db;
USE starfire_db;

-- --------------------------------------------------------
-- Table structure for table `admin_users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'editor') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table structure for table `categories`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table structure for table `products`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT,
    description TEXT,
    price DECIMAL(10, 2),
    image VARCHAR(500),
    specifications JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- --------------------------------------------------------
-- Table structure for table `enquiries`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    product_name VARCHAR(255),
    message TEXT,
    status ENUM('new', 'contacted', 'closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table structure for table `enquiry_notes`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiry_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_id INT NOT NULL,
    note TEXT NOT NULL,
    staff_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- Table structure for table `email_notifications`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS email_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_id INT,
    type VARCHAR(50),
    recipient VARCHAR(100),
    status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE SET NULL
);

-- --------------------------------------------------------
-- Table structure for table `site_content`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_key VARCHAR(100) NOT NULL UNIQUE,
    content_value TEXT NOT NULL,
    page_name VARCHAR(50),
    description TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Sample Data
-- --------------------------------------------------------

INSERT INTO categories (name, description, icon) VALUES
('Fire Extinguishers', 'Premium quality fire extinguishers for all types of fires', 'Flame'),
('Fire Alarm Systems', 'Advanced fire detection and alarm systems', 'Shield'),
('CCTV Cameras', 'High-definition surveillance cameras for complete security', 'Camera'),
('Fire Hydrant Systems', 'Complete fire hydrant installation and maintenance', 'Shield');

INSERT INTO products (name, category_id, description, image, is_featured) VALUES
('ABC Dry Powder Extinguisher', 1, 'Multi-purpose dry powder extinguisher suitable for Class A, B, and C fires.', 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=500', 1),
('4MP Dome CCTV Camera', 3, '4MP HD dome camera with night vision and motion detection.', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500', 1),
('Addressable Fire Alarm Panel', 2, 'Advanced fire alarm control panel with zone monitoring.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 1);

INSERT INTO admin_users (username, password, full_name, role) VALUES
('admin', 'admin123', 'System Administrator', 'admin'); -- Note: Use hashed password in production
