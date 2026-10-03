# Sundar M — Software Developer Portfolio

A responsive, high-performance developer portfolio built with React 19, Vite, Tailwind CSS, and a Node.js Express backend with Nodemailer for secure email delivery.

## 🚀 Features

- **Modern & Hand-Crafted UI**: Dark aesthetic with Sora & Inter typography, fluid scroll reveal animations, and responsive card layouts.
- **Interactive Companion Avatar Guide**: Section-aware 3D mascot avatar giving contextual guidance.
- **Professional Contact / Hire Me Form**: Labeled inputs (Name, Email, Phone, Subject, Message) with anti-spam honeypot, rate limiting, sanitization, and inline loading/success/error alerts.
- **Backend Email Notifications**: Express API backend (`server.js`) sending Nodemailer email alerts directly to inbox with visitor `replyTo` header support and automatic confirmation receipts.
- **Render Production Ready**: Full SPA static serving + API route integration configured for single-command deploy on Render.

---

## 🛠️ Local Setup & Environment Configuration

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in your SMTP credentials in `.env`:
```env
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_RECEIVER=msundar677@gmail.com
```

> **Note for Gmail users**: Use an **App Password** generated from [Google Account Security](https://myaccount.google.com/apppasswords), not your personal account password.

---

## 💻 Running Locally

### Development Mode (Frontend + API Proxy)
In one terminal, start the Express backend:
```bash
node server.js
```
In a second terminal, start Vite dev server:
```bash
npm run dev
```

### Production Mode Test
Build the Vite frontend and run the Node server:
```bash
npm run build
npm start
```
Visit `http://localhost:5000` in your browser.

---

## 🌐 Deploying on Render

1. Log in to your [Render Dashboard](https://dashboard.render.com).
2. Create a new **Web Service** and connect your GitHub repository (`sundarm677/sundar-portfolio`).
3. Set the following options:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
4. In the **Environment Variables** tab, add your production secrets:
   - `NODE_ENV`: `production`
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `your-email@gmail.com`
   - `SMTP_PASS`: `your-app-password`
   - `CONTACT_RECEIVER`: `msundar677@gmail.com`
5. Click **Deploy Web Service**. Future pushes to `main` will automatically trigger automatic redeployments on Render.
