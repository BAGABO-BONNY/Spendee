# 💰 Spendee - Smart Expense Tracker

A modern, full-stack expense tracking application built with React and Node.js. Track your income and expenses with beautiful visualizations and comprehensive financial insights.

![Spendee Logo](Frontend/Spende/src/assets/logo%20(2).png)

## ✨ Features

### 🔐 Authentication
- Secure user registration and login
- JWT-based authentication
- Profile image upload
- Protected routes

### 📊 Dashboard
- **Summary Cards**: Total Balance, Income, and Expenses at a glance
- **Recent Transactions**: Quick access to latest income and expense records
- **Financial Overview**: Interactive pie chart showing income vs expenses distribution
- **Last 30 Days Expenses**: Line chart tracking expense trends by category
- **Last 60 Days Income**: Pie chart showing income sources breakdown
- **Detailed Breakdowns**: Category-wise expense and source-wise income analysis

### 💵 Income Management
- Add income with source, amount, description, and date
- View all income records in an organized list
- Delete income entries with hover-to-reveal delete button
- Export income data to Excel format
- Monthly income tracking

### 💸 Expense Management
- Add expenses with category, amount, description, and date
- Category-based expense tracking (Food, Transport, Shopping, Bills, Entertainment, Healthcare, Education, Other)
- View all expenses in a categorized list
- Delete expense entries with hover-to-reveal delete button
- Export expense data to Excel format
- Monthly expense tracking
- Expenses by category overview

### 📱 Responsive Design
- Fully responsive UI that works seamlessly on desktop, tablet, and mobile devices
- Mobile-friendly sidebar navigation
- Touch-optimized interactions

### 🎨 Modern UI/UX
- Beautiful gradient designs
- Smooth animations and transitions
- Interactive charts using Recharts
- Toast notifications for user feedback
- Loading states and error handling

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Chart library
- **React Hot Toast** - Toast notifications
- **Moment.js** - Date formatting
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **XLSX** - Excel file generation
- **Swagger/OpenAPI** - API documentation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Spendee
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/spende
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/spende?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=5000
CLIENT_URL=http://localhost:5173
```

**Important**: Replace `your_super_secret_jwt_key_here_make_it_long_and_random` with a secure random string.

### 3. Frontend Setup

```bash
cd Frontend/Spende
npm install
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd Backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd Frontend/Spende
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Access Swagger API Documentation

Once the backend is running, visit:
```
http://localhost:5000/api-docs
```

## 📁 Project Structure

```
Spendee/
├── Backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── swagger.js         # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── incomeController.js
│   │   ├── expenseController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── authmiddleware.js  # JWT authentication middleware
│   │   └── uploadMiddleware.js # File upload handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Income.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── incomeRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── dashboardRoutes.js
│   ├── uploads/               # Profile image uploads
│   └── server.js              # Express server setup
│
├── Frontend/
│   └── Spende/
│       ├── src/
│       │   ├── assets/        # Images and static assets
│       │   ├── components/
│       │   │   ├── inputs/    # Reusable input components
│       │   │   └── layouts/   # Layout components
│       │   ├── context/       # React Context (UserContext)
│       │   ├── pages/
│       │   │   ├── Auth/      # Login and SignUp pages
│       │   │   └── Dashboard/ # Dashboard, Income, Expense pages
│       │   └── utils/        # API paths and axios instance
│       ├── public/
│       └── index.html
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/getUser` - Get current user info
- `POST /api/v1/auth/upload-profile` - Upload profile image

### Income
- `POST /api/v1/income/add` - Add income record
- `GET /api/v1/income/all` - Get all income records
- `DELETE /api/v1/income/:id` - Delete income record
- `GET /api/v1/income/download` - Download income as Excel

### Expense
- `POST /api/v1/expense/add` - Add expense record
- `GET /api/v1/expense/all` - Get all expense records
- `DELETE /api/v1/expense/:id` - Delete expense record
- `GET /api/v1/expense/download` - Download expenses as Excel

### Dashboard
- `GET /api/v1/dashboard/data` - Get dashboard analytics and summary

**Note**: All endpoints except register and login require JWT authentication token in the Authorization header.

For detailed API documentation, visit `http://localhost:5000/api-docs` when the server is running.

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation
- CORS configuration
- Secure file upload handling

## 📊 Database Schema

### User
- `fullName` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `profileImageUrl` (String, optional)
- `timestamps` (createdAt, updatedAt)

### Income
- `userId` (ObjectId, ref: User)
- `amount` (Number, required, min: 0)
- `source` (String, required)
- `description` (String, optional)
- `date` (Date, required)
- `timestamps` (createdAt, updatedAt)

### Expense
- `userId` (ObjectId, ref: User)
- `amount` (Number, required, min: 0)
- `category` (String, required)
- `description` (String, optional)
- `date` (Date, required)
- `timestamps` (createdAt, updatedAt)

## 🎨 UI Features

- **Modern Design**: Clean, gradient-based UI with smooth animations
- **Interactive Charts**: Pie charts, line charts for data visualization
- **Responsive Layout**: Works on all screen sizes
- **Dark Mode Ready**: Can be extended with dark mode support
- **Accessibility**: Semantic HTML and ARIA-friendly components

## 🧪 Testing

To test the application:

1. Start both backend and frontend servers
2. Register a new account
3. Add some income and expense records
4. Explore the dashboard to see visualizations
5. Test export functionality
6. Try deleting records

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify the connection string format starts with `mongodb://` or `mongodb+srv://`

### Port Already in Use
- Change the `PORT` in `.env` file
- Or stop the process using the port

### CORS Errors
- Ensure `CLIENT_URL` in backend `.env` matches your frontend URL
- Check that both servers are running

### Module Not Found
- Run `npm install` in both Backend and Frontend directories
- Clear `node_modules` and reinstall if issues persist

## 📝 Environment Variables

### Backend (.env)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ for efficient expense tracking

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful chart components
- All open-source contributors

---

**Happy Tracking! 💰📊**
