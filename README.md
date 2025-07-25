## 🙋‍♀️ Customer Usage Guide

The Customer App allows users to browse available workshops, book sessions, and track their bookings through a personal dashboard.

---

### ✅ Live App Access (Recommended)

1. Ensure the **backend** is running and connected (see [Setup Instructions](https://github.com/Mekin-jema/workshop-booking-backend)).

2. Open the Customer App:  
   👉 [https://workshop-booking-customer.vercel.app/](https://workshop-booking-customer.vercel.app/)

3. From here, users can:
   - 🔎 Browse all available workshops
   - 📝 Register and log in as a customer
   - 📅 Book available sessions
   - 📊 View their total bookings from the dashboard

---

### 🛠️ Method 2: Local Setup (From Scratch)

If you want to run the customer app locally:

#### 1. Clone the Repository

```bash
git clone https://github.com/Mekin-jema/workshop-booking-customer.git
cd workshop-booking-customer
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Add Environment Variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

#### 4. Start the Development Server

```bash
npm run dev
```

> 🚀 App will run at: [http://localhost:3000](http://localhost:3000)

---

### 👤 What Can Customers Do?

- 🔍 View all available workshops
- 🧾 Book any workshop that has open time slots
- 📊 Track total bookings in their personal dashboard

---