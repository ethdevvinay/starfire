# Star Fire Service & CCTV System - React Website

A premium, production-ready React website for Star Fire Service & CCTV System featuring modern UI/UX, 3D animations, and a comprehensive admin panel.

## 🚀 Features

### Public Website

- **3D Hero Section** - Interactive 3D fire extinguisher model using React Three Fiber
- **Premium Design** - Glassmorphism effects, gradient backgrounds, and smooth animations
- **Responsive Layout** - Mobile-first design that works on all devices
- **SEO Optimized** - Comprehensive meta tags and semantic HTML
- **Product Showcase** - Filterable product catalog with search functionality
- **Enquiry System** - Dynamic enquiry forms with product auto-fill
- **Contact Integration** - Multiple contact methods (phone, email, WhatsApp)

### Admin Panel

- **Secure Authentication** - JWT-based login system
- **Dashboard Analytics** - Real-time statistics and metrics
- **Enquiry Management** - Track and manage customer enquiries with status updates
- **Product Management** - Full CRUD operations for products
- **Category Management** - Organize products into categories
- **Export Functionality** - Export enquiries to CSV

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Three.js
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Pages

### Public Pages

- **Home** (`/`) - Hero section with 3D model, features, products, and services
- **About** (`/about`) - Company information, mission, vision, and values
- **Products** (`/products`) - Product catalog with search and filtering
- **Product Detail** (`/products/:id`) - Detailed product information
- **Services** (`/services`) - Service offerings
- **Contact** (`/contact`) - Contact form and information
- **Enquiry** (`/enquiry`) - Dedicated enquiry form

### Admin Pages

- **Login** (`/admin/login`) - Admin authentication
- **Dashboard** (`/admin/dashboard`) - Analytics and quick actions
- **Enquiries** (`/admin/enquiries`) - Manage customer enquiries
- **Products** (`/admin/products`) - Manage products
- **Categories** (`/admin/categories`) - Manage categories

## 🎨 Design Features

- **Fire-themed Color Palette** - Custom orange/red gradients
- **Dark Mode** - Premium dark theme throughout
- **Glassmorphism** - Modern glass-effect UI elements
- **Micro-animations** - Smooth transitions and hover effects
- **Custom Scrollbar** - Branded scrollbar design
- **Google Fonts** - Inter and Outfit font families

## 📱 Contact Information

- **Phone**: 9815884906 | 9855025731 | 9815884931
- **Email**: star.fireservice77@gmail.com
- **Address**: Ground Shop, Near Bank of Baroda, Raipur Khurd, Old Airport, Chandigarh

## 🔐 Admin Credentials (Demo)

- **Email**: admin@starfire.com
- **Password**: admin123

## 🚧 Backend Integration

The frontend is ready for backend integration. API endpoints are prepared in `src/services/api.ts`. You'll need to:

1. Set up a Node.js + Express backend
2. Configure MySQL database using the schema in `backend/database/schema.sql`
3. Implement the API endpoints defined in the backend routes
4. Update the API base URL in the frontend configuration

## 📝 Project Structure

```
starfire/
├── public/              # Static assets
│   ├── logo.png
│   ├── favicon.png
│   └── fire_extinguisher.glb
├── src/
│   ├── admin/          # Admin panel components
│   │   ├── components/
│   │   ├── pages/
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── components/     # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CTASection.tsx
│   │   ├── StatsCard.tsx
│   │   └── 3DModelViewer.tsx
│   ├── pages/          # Public pages
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   └── Enquiry.tsx
│   ├── services/       # API services
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Next Steps

1. **Backend Development** - Implement the Node.js + Express API
2. **Database Setup** - Create MySQL database and run migrations
3. **API Integration** - Connect frontend to backend endpoints
4. **Testing** - Add unit and integration tests
5. **Deployment** - Deploy to production server
6. **SSL Certificate** - Set up HTTPS
7. **Domain Configuration** - Point domain to server

## 📄 License

Proprietary - Star Fire Service & CCTV System

## 👨‍💻 Development

Built with ❤️ for Star Fire Service & CCTV System
