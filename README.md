# Task Flow

Task Flow is a dynamic web application developed as part of the **Internet Programming** course.

The system allows users to register, log in securely, and manage their own personal task list. Each user's data is stored separately in a SQLite database, ensuring privacy and persistence between sessions.

---

## Features

- User registration
- Secure login with encrypted passwords (bcrypt)
- Session-based authentication
- Personal task management
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Automatic data saving
- Responsive user interface
- SQLite database storage

---

## Technologies

### Backend
- Node.js
- Express.js
- SQLite3
- express-session
- bcrypt

### Frontend
- HTML5
- CSS3
- JavaScript (Fetch API)

---

## Project Structure

```
task-flow/
│
├── public/
│   ├── index.html
│   ├── tasks.html
│   ├── css/
│   └── js/
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── database.js
├── server.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/task-flow.git
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

Open your browser:

```
http://localhost:3000
```

---

## Security

- Passwords are securely hashed using bcrypt.
- Sessions are used for user authentication.
- Users cannot access another user's tasks.
- Protected routes prevent unauthorized access.

---

## Database

The application uses SQLite to store:

- Users
- Tasks

All user data is saved automatically and remains available after logging out.

---

## Authors

- Roaya Saed
- Partner Name

---

## Course

Internet Programming

Academic Year 2025–2026
