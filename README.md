# Lost & Found Item Management System

A complete MERN (MongoDB, Express, React, Node.js) stack application designed for college or community environments to help users report and track lost or found items with a modern SaaS-style interface.

## ✨ Features

- **User Authentication**: Secure Login and Registration using JWT and bcryptjs.
- **Modern Dashboard**: Clean, professional UI with real-time welcoming and item overviews.
- **Full CRUD Functionality**: Users can Create, Read, Update, and Delete their own reported items.
- **Search & Filtering**: Real-time search by item name or description.
- **Responsive Design**: Fully functional on mobile, tablet, and desktop devices.
- **Secure Architecture**: Protected routes ensuring users can only modify their own data.
- **Professional Aesthetics**: Built with React-Bootstrap, Lucide-React icons, and custom CSS animations.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Axios, Bootstrap, React-Bootstrap, Lucide Icons, React-Toastify.
- **Backend**: Node.js, Express.js, JWT, Mongoose.
- **Database**: MongoDB (Atlas/Local).
- **Styling**: Custom CSS (SaaS theme), Glassmorphism effects.

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd Lost&Found_System
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file with:
   # PORT=5000
   # MONGO_URI=your_mongodb_uri
   # JWT_SECRET=your_secret_key
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   # Create a .env file with:
   # VITE_API_URL=http://localhost:5000
   npm run dev
   ```

## 📸 Screenshots

*(Add your screenshots here after deployment)*

## 📄 License

This project is licensed under the MIT License.
