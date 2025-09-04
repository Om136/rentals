# 🏠 Rental Platform

A modern, full-stack rental marketplace platform built with React and Node.js, featuring location-based search, secure payments, and comprehensive item management.

## ✨ Features

### 🔍 **Advanced Search & Discovery**
- **Smart Location-Based Search** - Find items near you with radius filtering
- **Real-time Search Suggestions** - Intelligent autocomplete with recent searches
- **Multi-Category Filtering** - Filter by Home, Vehicles, Electronics, Photography, Clothing, Furniture, Tools, Sports
- **Flexible Rent/Buy Options** - Toggle between rental and purchase items
- **Advanced Sorting** - Sort by date, price, title, or distance
- **Smart Filter Management** - Visual filter chips with easy removal

### 💳 **Secure Payment System**
- **Stripe Integration** - Industry-standard payment processing
- **Dual Payment Modes** - Support for both rental and purchase transactions
- **Test Mode Ready** - Pre-configured for development and testing
- **Payment Confirmation** - Real-time payment status updates
- **Secure Checkout** - PCI DSS compliant payment forms

### 📱 **User Experience**
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Built with Radix UI and shadcn/ui
- **Interactive Maps** - Location picking and visualization
- **Image Management** - Cloudinary integration for optimized images
- **Real-time Updates** - Socket.io for live notifications

### 🔐 **Authentication & Security**
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Role-based access control
- **Password Encryption** - Bcrypt for secure password hashing
- **Session Management** - Automatic token refresh and validation

### 🛠 **Item Management**
- **Easy Listing** - Intuitive item creation and editing
- **Image Uploads** - Multiple image support with optimization
- **Inventory Tracking** - Manage availability and pricing
- **Enhanced Empty States** - Helpful guidance for new users

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Vite** - Lightning-fast build tool and dev server
- **React Router 6** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Stripe React** - Payment components
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database with PostGIS
- **Stripe API** - Payment processing
- **Cloudinary** - Image storage and optimization
- **JWT** - JSON Web Tokens for authentication
- **Socket.io** - Real-time communication
- **Multer** - File upload handling

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rental
```

### 2. Install Dependencies

**Root directory:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Environment Setup

**Backend (.env):**
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=rental_db

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Server
PORT=5000
```

**Frontend (PaymentModal.jsx):**
Update the Stripe publishable key:
```javascript
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');
```

### 4. Database Setup
```sql
CREATE DATABASE rental_db;
-- Add PostGIS extension for location features
CREATE EXTENSION postgis;
```

## 🏃‍♂️ Running the Application

### Development Mode

**Start Backend:**
```bash
cd backend
npm start
```
Server runs on http://localhost:5000

**Start Frontend:**
```bash
cd frontend
npm run dev
```
Application runs on http://localhost:5173

### Production Build

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Preview Production Build:**
```bash
npm run preview
```

## 🧪 Testing Payments

Use Stripe's test card numbers:

- **Success:** 4242 4242 4242 4242
- **Declined:** 4000 0000 0000 0002
- **Authentication Required:** 4000 0025 0000 3155

**Test Details:**
- Any future expiry date
- Any 3-digit CVC
- Any postal code

## 📁 Project Structure

```
rental/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server setup
│   │   ├── config/                # Database and service configs
│   │   ├── controllers/           # Route handlers
│   │   ├── middlewares/           # Authentication & upload
│   │   ├── models/               # Database models
│   │   ├── queries/              # Database queries
│   │   └── routes/               # API endpoints
│   └── uploads/                  # Local file storage
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/               # Route components
│   │   ├── lib/                 # Utility functions
│   │   └── utils/               # Helper functions
│   └── public/                  # Static assets
└── README.md
```

## 🌟 Key Features Deep Dive

### Location-Based Search
- Integrated geolocation API for automatic location detection
- Radius-based filtering (1km to 100km)
- Distance calculation and sorting
- Interactive location picker

### Enhanced Browse Experience
- Single-row layout combining search and filters
- Real-time filter updates with visual feedback
- Shareable URLs with filter state
- Responsive grid layout for products

### Payment Integration
- Complete Stripe checkout flow
- Support for both one-time and rental payments
- Payment intent creation and confirmation
- Error handling and user feedback

### Responsive Design
- Mobile-first responsive design
- Touch-friendly interactive elements
- Optimized for all screen sizes
- Progressive web app ready

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Items
- `GET /api/items` - Get all items with filters
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `/docs` folder
- Review the troubleshooting guide

## 🔮 Future Enhancements

- [ ] Real-time chat between users
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Social features and reviews

---

Built with ❤️ using modern web technologies
