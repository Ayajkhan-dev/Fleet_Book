<div align="center">

# 🚗 FleetBook

### Wedding Fleet Booking Platform for India

**Book 5–20 cars for your wedding in one click.**
Connects customers with verified local fleet operators — eliminating the chaos of booking cars one by one.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql)](https://mysql.com)
[![tRPC](https://img.shields.io/badge/tRPC-11-2596BE?style=flat-square&logo=trpc)](https://trpc.io)

</div>

---

## 📸 Screenshots

### 🏠 Home — Search Your Fleet
   Screenshot 2026-06-14 100541.png

### 🔍 Search Results — Compare Fleet Operators
<!-- APNA SCREENSHOT YAHAN DAALO -->

### 📋 Operator Detail — View Fleet & Book
<!-- APNA SCREENSHOT YAHAN DAALO -->

---

## 🎯 The Problem We Solve

When booking cars for a wedding in India:

- **Ola/Uber** → 1 driver = 1 car. Need 10 cars? Contact 10 different people.
- **Local agents** → No transparency, no tracking, no refund policy.
- **WedMeGood** → Just a directory. No instant booking, no real-time availability.

**FleetBook** lets you book an entire fleet from a single verified operator in one transaction.

---

## ✨ Features

### For Customers
- 🔍 Search fleet operators by city, date, number of cars, vehicle type
- 📊 Compare operators by price, rating, fleet size
- 🚗 View full fleet details — vehicle number, driver, price per day
- 📅 Book multiple cars in a single transaction with price calculator
- 📱 Track booking status (Pending → Confirmed → Completed)

### For Fleet Operators
- 📋 Register fleet with vehicle documents
- ✅ Accept or reject booking requests
- 📈 Dashboard with earnings, booking history, reviews
- 🚙 Manage individual vehicles — add, edit, toggle availability

### For Admin
- 🛡️ Verify and approve fleet operators (KYC review)
- 📊 Platform revenue and commission tracking
- 👥 Manage all users, operators, bookings
- ⚠️ Suspend operators with poor ratings

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, TailwindCSS, Shadcn UI |
| **Backend** | Node.js, Hono, tRPC |
| **Database** | MySQL 8 with Drizzle ORM |
| **Auth** | JWT (jose) + bcryptjs |
| **Charts** | Recharts |
| **Build** | Vite 7, esbuild |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MySQL 8.0+

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/fleetbook.git
cd fleetbook/app

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Push database schema
npm run db:push

# 5. Start development server
npm run dev
```

---

## ⚙️ Environment Variables

```env
APP_SECRET=your-super-secret-jwt-key
DATABASE_URL=mysql://user:password@localhost:3306/fleetbook
ADMIN_EMAIL=admin@fleetbook.in
ADMIN_PASSWORD=Admin@123
```

---

## 👤 Demo Accounts

| Role | Email | Password |
|---|---|---|
| Customer | ankit@email.com | any (4+ chars) |
| Operator | rajesh@sharmacars.in | any (4+ chars) |
| Admin | admin@fleetbook.in | any (4+ chars) |

---

## 📁 Project Structure
app/

├── api/                  # Backend (Node.js + tRPC)

│   ├── auth-router.ts

│   ├── bookings-router.ts

│   ├── operators-router.ts

│   └── admin-router.ts

├── db/

│   ├── schema.ts         # MySQL schema (Drizzle)

│   └── seed.ts

└── src/                  # Frontend (React)

├── pages/

├── components/

└── hooks/
---

## 🗺️ Roadmap

- [x] Customer search & booking flow
- [x] Fleet operator dashboard
- [x] Admin verification panel
- [ ] Razorpay payment integration
- [ ] SMS notifications
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

**Ayaj Khan**
B.Tech CSE (AI & ML) — IDr. A. P. J. Abdul Kalam Technical University, Lucknow, (AKTU)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ayaj%20Khan-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/ayaj-khan-b8372a316)
[![Email](https://img.shields.io/badge/Email-aimlayaj@gmail.com-D14836?style=flat-square&logo=gmail)](mailto:aimlayaj@gmail.com)

---

<div align="center">

⭐ **If you found this useful, please star the repo!**

*Built for the Indian wedding market — UP & North India focus*

</div>
