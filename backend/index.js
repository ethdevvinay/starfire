const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve React App
app.use(express.static(path.join(__dirname, '../dist')));

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/products/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
    connection.release();
});

// API Endpoints


// Image Upload Endpoint
app.post('/api/upload/product-image', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Return the file path
        const imageUrl = `/uploads/products/${req.file.filename}`;
        res.json({
            message: 'Image uploaded successfully',
            imageUrl: imageUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Get all categories with product count
app.get('/api/categories', (req, res) => {
    const query = 'SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) as productCount FROM categories c';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Add a category
app.post('/api/categories', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (err, result) => {
        if (err) {
            console.error('Error adding category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Category added successfully', id: result.insertId });
    });
});

// Update a category
app.put('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, id], (err, result) => {
        if (err) {
            console.error('Error updating category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Category updated successfully' });
    });
});

// Delete a category
app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM categories WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting category:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Category deleted successfully' });
    });
});

// Get all products
app.get('/api/products', (req, res) => {
    const categoryId = req.query.category_id;
    const isFeatured = req.query.is_featured;

    let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id';
    let params = [];

    if (categoryId || isFeatured) {
        query += ' WHERE';
        if (categoryId) {
            query += ' p.category_id = ?';
            params.push(categoryId);
        }
        if (isFeatured) {
            if (categoryId) query += ' AND';
            query += ' p.is_featured = ?';
            params.push(isFeatured === 'true' ? 1 : 0);
        }
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Add a product
app.post('/api/products', (req, res) => {
    const { name, category_id, description, image, price, is_featured } = req.body;
    const query = 'INSERT INTO products (name, category_id, description, image, price, is_featured) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, category_id, description, image, price || 0, is_featured || 0], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Product added successfully', id: result.insertId });
    });
});

// Update a product
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, category_id, description, image, price, is_featured } = req.body;
    const query = 'UPDATE products SET name = ?, category_id = ?, description = ?, image = ?, price = ?, is_featured = ? WHERE id = ?';
    db.query(query, [name, category_id, description, image, price || 0, is_featured || 0, id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Product updated successfully' });
    });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

// Get all enquiries
app.get('/api/enquiries', (req, res) => {
    const query = 'SELECT * FROM enquiries ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching enquiries:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Update enquiry status
app.put('/api/enquiries/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required.' });
    }

    const query = 'UPDATE enquiries SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating enquiry:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Enquiry updated successfully' });
    });
});

// Delete enquiry
app.delete('/api/enquiries/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM enquiries WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting enquiry:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Enquiry deleted successfully' });
    });
});

// Submit enquiry
app.post('/api/enquiries', (req, res) => {
    const { name, email, phone, company, subject, product_name, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const query = 'INSERT INTO enquiries (name, email, phone, company, subject, product_name, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, company, subject, product_name, message], (err, result) => {
        if (err) {
            console.error('Error submitting enquiry:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Enquiry submitted successfully!', id: result.insertId });
    });
});

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const query = 'SELECT * FROM admin_users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];

        try {
            // Compare hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                res.json({
                    message: 'Login successful',
                    token: 'mock-jwt-token',
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (compareError) {
            console.error('Error comparing passwords:', compareError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Contact Enquiries CRUD Operations
// Get all contact enquiries
app.get('/api/contact-enquiries', (req, res) => {
    const query = 'SELECT * FROM contact_enquiries ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching contact enquiries:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Submit contact enquiry
app.post('/api/contact-enquiries', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const query = 'INSERT INTO contact_enquiries (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, subject, message], (err, result) => {
        if (err) {
            console.error('Error submitting contact enquiry:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Contact enquiry submitted successfully!', id: result.insertId });
    });
});

// Update contact enquiry status
app.put('/api/contact-enquiries/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required.' });
    }

    const query = 'UPDATE contact_enquiries SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating contact enquiry:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Contact enquiry updated successfully' });
    });
});

// Delete contact enquiry
app.delete('/api/contact-enquiries/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM contact_enquiries WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting contact enquiry:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Contact enquiry deleted successfully' });
    });
});

// Admin Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const stats = {};

        const [enquiries] = await db.promise().query('SELECT COUNT(*) as total FROM enquiries');
        stats.totalEnquiries = enquiries[0].total;

        const [newEnquiries] = await db.promise().query("SELECT COUNT(*) as total FROM enquiries WHERE status = 'new'");
        stats.newEnquiries = newEnquiries[0].total;

        const [products] = await db.promise().query('SELECT COUNT(*) as total FROM products');
        stats.totalProducts = products[0].total;

        const [categories] = await db.promise().query('SELECT COUNT(*) as total FROM categories');
        stats.totalCategories = categories[0].total;

        res.json(stats);
    } catch (err) {
        console.error('Error fetching admin stats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Recent Enquiries
app.get('/api/admin/enquiries/recent', (req, res) => {
    const query = "SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching recent enquiries:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Serve React App for any other route (SPA Fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
