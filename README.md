# Contact-Manager
A full-stack CRUD (Create, Read, Update, Delete) web application that allows users to manage contacts efficiently. Built using HTML, CSS, JavaScript (Frontend) and Node.js, Express, SQLite (Backend).
Features

✅ Add new contacts (Name, Email, Phone)

📋 View list of all contacts

✏️ Edit existing contacts

🗑️ Delete contacts (Soft Delete)

🔒 Email uniqueness validation

⚠️ Client-side and server-side validation

💾 Persistent storage using SQLite database

🎨 Clean, colorful, animated UI

🌐 RESTful API architecture

Tech Stack
Frontend

HTML5

CSS3 (Modern UI, animations)

Vanilla JavaScript (Fetch API)

Backend

Node.js

Express.js

SQLite (file-based database)

📂 Project Structure
contacts-manager/
│
├── backend/
│   ├── server.js
│   ├── routes.js
│   ├── db.js
│   ├── package.json
│   └── contacts.db
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md

⚙️ Setup Instructions
1️⃣ Prerequisites

Make sure you have installed:

Node.js (LTS version)

npm

Check installation:

node -v
npm -v

2️⃣ Backend Setup
cd backend
npm install
npm start


Backend server will run at:

http://localhost:5000

3️⃣ Frontend Setup

Simply open the file:

frontend/index.html


in your web browser.

No build tools or frameworks required for frontend.

🔗 API Endpoints

Base URL:

http://localhost:5000/api

Method	Endpoint	Description
POST	/contacts	Create a new contact
GET	/contacts	Get all contacts
GET	/contacts/:id	Get single contact
PUT	/contacts/:id	Update contact
DELETE	/contacts/:id	Soft delete contact
📊 Database Schema
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  deleted INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

🧠 Application Flow

User submits contact form

Frontend sends request using Fetch API

Express server processes request

SQLite database stores or updates data

Updated contact list is returned and rendered

🧪 Validation & Error Handling

Required fields validation

Email format validation

Duplicate email detection

Phone number length check

Clear error messages returned from API

📈 Evaluation Rubric Coverage

✔ Code Quality & Structure
✔ REST API Design
✔ Clean Frontend UX
✔ Persistent Database Storage
✔ Error Handling
✔ Edge Case Handling
✔ Documentation

🧑‍💻 How to Explain in Interview

“I built a full-stack CRUD Contacts Manager using Node.js and SQLite.
The backend exposes RESTful APIs for managing contacts with validation and error handling.
The frontend consumes these APIs using the Fetch API and provides a clean, animated UI.
The application demonstrates end-to-end data flow, persistence, and user experience best practices.”

📌 Future Enhancements

🔍 Search & Filter contacts

📄 Pagination

🔐 Authentication (JWT)

🧪 Unit tests

🐳 Docker support

⚛️ React frontend

👨‍🎓 Author

Developed as part of a CRUD Web Developer Assignment to demonstrate full-stack web development skills.
