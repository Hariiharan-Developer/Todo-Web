# 🚀 MERN Auth Controller (Authentication System)

A full-stack **MERN authentication system** with secure login, JWT authentication, OTP-based password reset, and email verification. Built with modern UI and deployed on cloud platforms.

---

## 🌐 Live Demo

- 🔗 Frontend: https://auth-controller-fsd.onrender.com
- 🔗 Backend: https://auth-controller.onrender.com
---

## ✨ Features

- 👤 User Registration & Login
- 🔐 JWT Authentication
- 🔒 Protected Routes
- 📩 Forgot Password via Email OTP
- ⏳ OTP Expiry (5 Minutes)
- 🔁 Password Reset Flow
- 🧾 Input Validation (Formik + Yup)
- 🔔 Toast Notifications
- 📱 Responsive UI
- ☁️ Cloud Deployment (Render + MongoDB Atlas)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Formik
- Yup
- React Hot Toast
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Nodemailer
- bcrypt.js

### Deployment
- Render (Backend + Frontend)
- MongoDB Atlas

---

## 🔐 Authentication Flow

1. User registers / logs in
2. JWT token is generated
3. Protected routes secured using middleware
4. Forgot password sends OTP to email
5. OTP verification (valid for 5 minutes)
6. User resets password successfully

---

## 📧 Email Service

- OTP emails sent using **Nodemailer**
- Gmail SMTP with **App Password authentication**
- Secure and reliable email delivery

---

