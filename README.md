# Finetech Core Backend 🏦💼

Finetech Core Backend is a highly secure, transaction-safe banking engine built with Node.js and Express. It features a professional, MVC-inspired directory architecture managing authentication layers, dynamic bank account provisioning, double-entry financial bookkeeping logic, and automated transaction communication alerts.

## ✨ Features

* **🔐 Session Security & Isolation:** User registration, password encryption via `bcryptjs`, and secure session tracking via signed `jsonwebtoken` (JWT) passed through HTTP-Only cookies using `cookie-parser`.
* **📊 Account Management:** Middleware-protected routes to dynamically provision user bank accounts and retrieve real-time account balances.
* **💸 Atomic Transaction Layer:** Ledger transfer systems built to manage credits, debits, and a centralized system initialization account safely without database or balance state fragmentation.
* **📧 Automated Notifications:** Embedded `nodemailer` communication layer to alert users when critical financial events occur.
* **🗃️ Persistent Data Management:** Structured schemas utilizing `mongoose` to maintain strict validation definitions for users, financial accounts, and ledgers.

---

## 🚀 Getting Started (Step-by-Step)

Follow these instructions to clone, configure, and boot the core banking API gateway locally.

### 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
* **Node.js (v18.0.0 or higher)** (Download from [nodejs.org](https://nodejs.org/))
* **Git** (Download from [git-scm.com](https://git-scm.com/))
* A running **MongoDB** database instance (Local or Atlas cloud URI)
* An API Client (like **Postman** or **Insomnia**) to test transaction endpoints.
* MongoDB Compass Desktop App

---

### 1. Clone the Repository
Open a terminal window and download the workspace directly from your remote profile:

git clone https://github.com/chzaeem47/Finetech-core-Backend.git
cd Finetech-core-Backend

---

### 2. Install Project Dependencies
Run the install command to download your package tree—including Express 5, Mongoose 9, security utilities, and mailing helpers:

npm install

check package.json or package-lock.json for exact packages to install

---

### 3. Configure Security Environment Variables
Create a file named exactly `.env` in the root folder of your project workspace and provide your configuration secrets:

MONGOOSE_URI = your mongoose connection string
JWT_SECRET = your jwt secret
CLIENT_ID= for nodemailer client id
CLIENT_SECRET= for nodemailer client secret
REFRESH_TOKEN= for nodemailer refresh token
EMAIL_USER = for nodemailer email_user

---

### 4. Run the API Gateway Server
Boot the development server instance to connect to your database and spin up the live Express listener routing paths:

npm start

Your application will boot up locally and start listening for inbound traffic at `http://localhost:8080/`.

---

## 📁 Project Structure
Here is an overview of how the backend routes, validations, and data controllers are segmented:

```text
├── config/                # Global infrastructure configuration (Database sync)
├── controllers/           # Operational endpoint logic (Auth, Ledger handlers)
├── middleware/            # Security safeguards (JWT verifications)
├── models/                # Strict Mongoose collection validation schemas
├── routes/                # Express routing files linking targets to paths
├── .env                   # Private environment configuration credentials
├── .gitignore             # Declared paths to exclude from Git tracking
├── package.json           # Defined scripts and locked package dependencies
├── package-lock.json      
├── README.md              # Technical specifications (This file!)
└── server.js              # Central application listener configuration
```

---

### 5. Detailed API Route Map
The API routing tree is split into clear, decoupled domains. All data transactions (except public login/register routes) require an active user verification payload through the authMiddleWare validation layer:

🔐 Authentication Domain (/api/auth)

POST /api/auth/register - Registers a brand new user profile on the system.

POST /api/auth/login - Authenticates user credentials, signing and assigning a validation token.

POST /api/auth/logout - Terminates the target session cookie context cleanly or Blacklisting token

💳 Accounts Domain (/api/accounts)

POST /api/accounts/ - Provisions a secure financial bank account tied to an authenticated profile. (Requires login).

GET /api/accounts/balance/:accountId - Searches the relational data models to return current balance states safely.

💸 Transactions Domain (/api/transactions)

POST /api/transactions/ - Executes transaction data payloads (moving money securely between active user accounts).

POST /api/transactions/system/initial-funds - Administrative core path to initialize global liquidity streams or seed core system accounts.

---

### 6. Contributing
Contributions make the engineering space an amazing ecosystem to learn, iterate, and build.

•Fork the Project

•Create your Feature Branch: git checkout -b feature/AmazingBankingFeature

•Commit your Changes: git commit -m 'feat: add automated account auditing logs'

•Push to the Branch: git push origin feature/AmazingBankingFeature

•Open a Pull Request

### License
This banking project is open-source software licensed under the MIT License - see the LICENSE file for details.