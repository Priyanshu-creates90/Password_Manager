# 🔐 Password Manager

A modern, full-stack Password Manager application built using **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. It allows users to securely save, view, edit, and manage login credentials for various websites.

---

## ✨ Features

* **Save Credentials:** Add site URL, username, and password securely.
* **Show/Hide Password:** Toggle visibility for sensitive password fields using eye icons.
* **Copy to Clipboard:** Copy usernames, passwords, or URLs with a single click.
* **Edit & Delete:** Modify or remove saved password entries easily.
* **Responsive Design:** Clean, modern UI styled using Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS, PostCSS
* **Icons:** Custom SVG and PNG icons

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via native `mongodb` driver)
* **Utilities:** `dotenv`, `body-parser`, `cors`

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
DB_NAME=passop
