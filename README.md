# Finetech Core Backend💼

Finetech Core Backend is a highly secure, transaction-safe banking engine built with Node.js and Express. It features a professional, MVC-inspired directory architecture managing authentication layers, dynamic bank account provisioning, double-entry financial bookkeeping logic, and automated transaction communication alerts.

This project now also includes a modern React frontend built with Vite, Tailwind CSS, React Router, Redux Toolkit, Axios, and a glassmorphism banking UI. The frontend connects with the backend authentication APIs and provides login/signup flow, protected dashboard routing, and a base structure for banking features like account creation, balance checking, transactions, and initial funds.

---

## ✨ Features

* **🔐 Session Security & Isolation:** User registration, password encryption via `bcryptjs`, and secure session tracking via signed `jsonwebtoken` (JWT) passed through HTTP-Only cookies using `cookie-parser`.

* **📊 Account Management:** Middleware-protected routes to dynamically provision user bank accounts and retrieve real-time account balances.

* **💸 Atomic Transaction Layer:** Ledger transfer systems built to manage credits, debits, and a centralized system initialization account safely without database or balance state fragmentation.

* **📧 Automated Notifications:** Embedded `nodemailer` communication layer to alert users when critical financial events occur.

* **🗃️ Persistent Data Management:** Structured schemas utilizing `mongoose` to maintain strict validation definitions for users, financial accounts, and ledgers.

* **🎨 Modern Frontend UI:** A stylish React-based glassmorphism interface for login, signup, and dashboard screens.

* **🧭 Client-Side Routing:** Page navigation using `react-router-dom`, including login, signup, and dashboard routes.

* **🧠 Beginner-Friendly Redux Toolkit Setup:** Simple Redux reducers are used to store user data, loading state, success messages, and backend errors.

* **🌐 API Integration:** Frontend communicates with backend APIs using Axios and supports cookie-based authentication through `withCredentials`.

---

## 🚀 Getting Started (Step-by-Step)

Follow these instructions to clone, configure, and boot the complete banking project locally.

### 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **Node.js (v18.0.0 or higher)**
  Download from [nodejs.org](https://nodejs.org/)

* **Git**
  Download from [git-scm.com](https://git-scm.com/)

* A running **MongoDB** database instance
  You can use local MongoDB or MongoDB Atlas cloud URI.

* **MongoDB Compass Desktop App**
  Helpful for viewing users, accounts, transactions, and ledger collections.

* An API Client such as **Postman** or **Insomnia**
  Useful for testing backend endpoints.

---

## 1. Clone the Repository

Open a terminal window and download the workspace directly from your remote profile:

```bash
git clone https://github.com/chzaeem47/Finetech-core-Backend.git
cd Finetech-core-Backend
```

---

## 2. Recommended Project Structure

After adding the frontend, the project should be arranged like this:

```text
Finetech-core-Backend/
│
├── backend/               # Node.js + Express + MongoDB backend
│   ├── src/
│   │   ├── config/        # Global infrastructure configuration
│   │   ├── controllers/   # Operational endpoint logic
│   │   ├── middleware/    # JWT authentication middleware
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express route files
│   │   └── services/      # Email and helper services
│   ├── .env               # Private backend environment variables
│   ├── .env.example       # Example environment file
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/              # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/           # Axios API configuration
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux Toolkit slices
│   │   ├── pages/         # Login, Signup, Dashboard pages
│   │   ├── store/         # Redux store configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore             # Declared paths to exclude from Git tracking
├── README.md              # Complete project documentation
└── LICENSE                # Project license
```

The root folder should contain:

```text
README.md
.gitignore
LICENSE
```

The backend should keep its own:

```text
backend/package.json
backend/package-lock.json
backend/.env
backend/src/
```

The frontend should keep its own:

```text
frontend/package.json
frontend/package-lock.json
frontend/src/
frontend/public/
```

---

## 3. Install Backend Dependencies

Go inside the backend folder:

```bash
cd backend
npm install
```

This installs the backend package tree including Express, Mongoose, JWT, bcrypt, cookie-parser, nodemailer, and other required utilities.

Check `package.json` or `package-lock.json` for the exact installed packages.

---

## 4. Configure Backend Environment Variables

Create a file named exactly `.env` inside the `backend` folder:

```text
backend/.env
```

Add your private configuration values:

```env
MONGOOSE_URI=your_mongoose_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_ID=your_nodemailer_client_id

CLIENT_SECRET=your_nodemailer_client_secret

REFRESH_TOKEN=your_nodemailer_refresh_token

EMAIL_USER=your_nodemailer_email_user

PORT=3000
```

Important:

Do not push `.env` to GitHub.

Create a `.env.example` file instead, so other developers know which variables are required:

```env
MONGOOSE_URI=
JWT_SECRET=
CLIENT_ID=
CLIENT_SECRET=
REFRESH_TOKEN=
EMAIL_USER=
PORT=3000
```

---

## 5. Backend CORS Setup

Because the frontend runs on a different port, usually:

```text
http://localhost:5173
```

and the backend runs on:

```text
http://localhost:3000
```

the backend must allow frontend requests.

In your backend main server file, add CORS like this before your routes:

```js
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
```

This is important because authentication uses cookies.

---

## 6. Run the Backend Server

From the backend folder:

```bash
npm run dev
```

or:

```bash
npm start
```

Your backend should start listening at:

```text
http://localhost:3000/
```

If your backend uses another port, update the frontend Axios base URL accordingly.

---

## 7. Install Frontend Dependencies

Open a second terminal and go to the frontend folder:

```bash
cd frontend
npm install
```

This installs the React frontend dependencies such as:

```text
react
react-dom
react-router-dom
@reduxjs/toolkit
react-redux
axios
tailwindcss
lucide-react
react-icons
```

---

## 8. Configure Frontend API URL

Inside the frontend, create or check this file:

```text
frontend/src/api/api.js
```

It should look like this:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default api;
```

If your backend runs on another port, change this line:

```js
baseURL: "http://localhost:3000"
```

Example:

```js
baseURL: "http://localhost:8080"
```

---

## 9. Run the Frontend Server

From the frontend folder:

```bash
npm run dev
```

The frontend usually runs at:

```text
http://localhost:5173/
```

Now open your browser and visit:

```text
http://localhost:5173/
```

---

## 🔐 Authentication Flow

The project currently supports user registration and login.

### Signup Flow

```text
User enters name, email, password
        ↓
Frontend sends POST request to /api/auth/register
        ↓
Backend checks if email already exists
        ↓
Backend creates user
        ↓
Backend signs JWT token
        ↓
Backend stores token in cookie
        ↓
Frontend stores user data in Redux
```

### Login Flow

```text
User enters email and password
        ↓
Frontend sends POST request to /api/auth/login
        ↓
Backend checks user email
        ↓
Backend compares password
        ↓
Backend signs JWT token
        ↓
Backend stores token in cookie
        ↓
Frontend stores user data in Redux
        ↓
User can be redirected to dashboard
```

---

## 🧠 Redux Toolkit Usage

The frontend uses a simple beginner-friendly Redux Toolkit setup.

The Redux state stores:

```js
{
  user: null,
  error: null,
  message: null,
  loading: false
}
```

The main reducers are:

```js
setUser
setLoading
setMessage
setError
clearAuthState
```

The purpose of Redux here is to store important app-level data such as:

```text
logged-in user
loading state
backend error messages
success messages
```

Input values like email and password are still managed with React `useState`, because that is easier and cleaner for form handling.

---

## 🧭 Frontend Route Map

The frontend currently uses React Router.

```text
/             Login Page
/signup       Signup Page
/dashboard    Dashboard Page
```

Later, dashboard access can be protected using a `ProtectedRoute` component so users cannot open `/dashboard` without logging in.

---

## 11. Detailed API Route Map

The API routing tree is split into clear, decoupled domains. All data transactions except public login/register routes require an active user verification payload through the `authMiddleWare` validation layer.

### ➊ Authentication Domain

Base route:

```text
/api/auth
```

Routes:

```text
POST /api/auth/register
```

Registers a brand new user profile on the system.

```text
POST /api/auth/login
```

Authenticates user credentials, signing and assigning a validation token.

```text
POST /api/auth/logout
```

Terminates the target session cookie context cleanly or blacklists token.

---

### ➋ Accounts Domain

Base route:

```text
/api/accounts
```

Routes:

```text
POST /api/accounts/
```

Provisions a secure financial bank account tied to an authenticated profile.

Requires login.

```text
GET /api/accounts/balance/:accountId
```

Searches the relational data models to return current balance states safely.

Requires login.

---

### ➌ Transactions Domain

Base route:

```text
/api/transactions
```

Routes:

```text
POST /api/transactions/
```

Executes transaction data payloads, moving money securely between active user accounts.

Requires login.

```text
POST /api/transactions/system/initial-funds
```

Administrative core path to initialize global liquidity streams or seed core system accounts.

---

## 🧪 Testing the API

You can test the backend using Postman or Insomnia.

### Register User

```http
POST http://localhost:3000/api/auth/register
```

Body:

```json
{
  "name": "Ali",
  "email": "ali@example.com",
  "password": "123456"
}
```

### Login User

```http
POST http://localhost:3000/api/auth/login
```

Body:

```json
{
  "email": "ali@example.com",
  "password": "123456"
}
```

### Create Bank Account

```http
POST http://localhost:3000/api/accounts/
```

Requires authentication cookie.

### Get Account Balance

```http
GET http://localhost:3000/api/accounts/balance/:accountId
```

Requires authentication cookie.

---

## 🛡️ Security Notes

Do not commit `.env` files to GitHub.

Keep secrets private:

```text
JWT_SECRET
MongoDB URI
Email client secret
Refresh token
```

Use `.env.example` to show required variables without exposing real values.

The frontend route protection is helpful for UI safety, but real security is handled by backend middleware.

The backend authentication middleware must always protect sensitive routes like:

```text
/api/accounts
/api/transactions
```

---

## 🧯 Common Beginner Errors

### CORS Error

If you see:

```text
Access to XMLHttpRequest has been blocked by CORS policy
```

make sure backend has:

```js
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
```

and frontend Axios has:

```js
withCredentials: true
```

---

### Network Error

If Axios shows:

```text
AxiosError: Network Error
```

check:

```text
Backend server is running
Frontend baseURL matches backend port
CORS is configured correctly
MongoDB is connected
```

---

### User Saved But Frontend Shows Error

This can happen if the user is created successfully but something fails after creation.

Check:

```text
JWT_SECRET exists in .env
Email service credentials are correct
Backend console logs
```

---

### Dashboard Opens Without Login

This is normal during early development.

Later you can add protected routes so dashboard only opens after login.

---

## 🧑‍💻 GitHub Push Instructions

After arranging the full-stack folder structure, run these commands from the root folder:

```bash
git status
```

Add all changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Add full stack frontend and update project structure"
```

Push to GitHub:

```bash
git push
```

Recommended root `.gitignore`:

```gitignore
# dependencies
node_modules/

# environment files
.env
.env.local
.env.development.local
.env.production.local

# frontend build
dist/
build/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# system
.DS_Store
```

This ignores:

```text
backend/node_modules
frontend/node_modules
backend/.env
frontend/.env
```

---

## 12. Contributing

Contributions make the engineering space an amazing ecosystem to learn, iterate, and build.

* Fork the Project

* Create your Feature Branch:

```bash
git checkout -b feature/AmazingBankingFeature
```

* Commit your Changes:

```bash
git commit -m "feat: add automated account auditing logs"
```

* Push to the Branch:

```bash
git push origin feature/AmazingBankingFeature
```

* Open a Pull Request

---

## License

This banking project is open-source software licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
