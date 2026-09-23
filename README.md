# TaskFlow Manager Application (MERN Stack)

> **Job Name:** Develop a TaskFlow Manager Application where a user can manage their daily tasks.  
> **Standard:** MERN Stack Web Development Assessment — Specification Sheet-1  
> **Live Site:** [https://taskflow-manager-shakib.netlify.app/](https://taskflow-manager-shakib.netlify.app/)  
> **GitHub Repository:** [https://github.com/devshakibhasan/taskflow-manager](https://github.com/devshakibhasan/taskflow-manager)  
> **Author / Created By:** Md. Shakib Hasan Patwary ([@devshakibhasan](https://github.com/devshakibhasan))  

---

## 📌 Project Overview

TaskFlow Manager is a full-stack MERN application developed for managing daily tasks with a clean, responsive, and minimalist user experience. The application provides complete CRUD operations, real-time status updates, filtering, search, and persistent storage in MongoDB.

---

## 🛡️ OSH & Standard Operating Procedures

In compliance with workplace safety standards:
- [x] Followed Occupational Safety and Health (OSH) guidelines.
- [x] Maintained appropriate posture and PPE as applicable.
- [x] Verified electrical connections and computer peripherals prior to operation.
- [x] Utilized standard development toolkits (VSCode, Node.js runtime, Git).
- [x] Safe project backup and commit procedures executed.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite 8 | Single Page Application with component-based state management |
| **Styling** | Tailwind CSS v4 | Clean, minimal, mobile-first responsive design |
| **Backend** | Node.js + Express 5 | RESTful API server with centralized error handling |
| **Database** | MongoDB + Mongoose 9 | Document database with schema validation and pre-save hooks |
| **HTTP Client** | Axios | Async data exchange between React and Express |
| **Notifications**| React-Toastify | Instant user feedback on create, update, and delete actions |

---

## 📐 Frontend Architecture (Part A)

Component hierarchy adhering strictly to Specification Sheet Part A:

```
src/
├── components/
│   ├── TaskForm.jsx      # Task creation and inline edit form (input + button)
│   ├── TaskList.jsx      # List container mapping tasks with empty state handling
│   ├── TaskItem.jsx      # Individual task row (toggle complete, edit, delete)
│   ├── Header.jsx        # Minimalist sticky navigation with status indicator
│   ├── Footer.jsx        # Unobtrusive footer
│   └── Icons.jsx         # Lightweight SVG icons
├── pages/
│   └── Home.jsx          # Central dashboard orchestrating state (useState) and passing props
├── layouts/
│   └── MainLayout.jsx    # Root shell wrapper
├── index.css             # Tailwind CSS v4 directives
└── main.jsx              # React DOM mounting with React Router
```

### Key Frontend Features:
- **Props-Driven**: Data and callback handlers (`onToggle`, `onEdit`, `onDelete`, `onSubmit`) flow cleanly via props.
- **State Management**: Centralized with `useState` and optimized with `useMemo`.
- **Instant UI Updates**: Adding or deleting tasks immediately reflects without page reloads.
- **Visual Completion Feedback**: Completed tasks display a checked circle indicator, strikethrough text, and muted styling.
- **Responsive Layout**: Seamlessly shifts from mobile touch-friendly views to desktop layouts.

---

## 🔌 Backend REST API Specification (Part B)

Base URL: `http://localhost:4000` or `http://localhost:4000/api`

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **POST** | `/tasks` | Create a new task (`{ title }`) | `201 Created`, `400 Bad Request` |
| **GET** | `/tasks` | Retrieve all tasks (sorted latest first) | `200 OK` |
| **GET** | `/tasks/:id` | Retrieve single task by ID | `200 OK`, `404 Not Found` |
| **PUT** | `/tasks/:id` | Update title or mark status as `completed` | `200 OK`, `400 Bad Request` |
| **DELETE** | `/tasks/:id` | Delete specific task | `200 OK`, `404 Not Found` |

### Consistent JSON Format:
```json
{
  "id": "6ab36df15e621bee0ff6c96b",
  "title": "Complete MERN project assessment",
  "status": "pending",
  "createdAt": "2026-09-23T06:13:05.577Z",
  "updatedAt": "2026-09-23T06:13:05.577Z"
}
```

### Validation & Error Handling:
- Empty titles are blocked with HTTP `400 Bad Request` (`"Task title is required"`).
- Invalid MongoDB IDs return HTTP `400 Bad Request` (`"Invalid or missing Task ID"`).
- Non-existent tasks return HTTP `404 Not Found`.

---

## 🗄️ Database Schema (Part C)

Defined with Mongoose in `backend/models/task.js`:

```javascript
{
  title: { type: String, required: true, trim: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  timestamps: true // Automatically generates createdAt and updatedAt
}
```

- **Persistence**: Persists tasks across server reboots.
- **Dual Compatibility**: Provides bidirectional mapping between `title` ⇄ `name` and `status` (`pending`/`completed`) ⇄ `isComplete` (`no`/`yes`).

---

## 🚀 Running the Project Locally

### Prerequisites:
- Node.js (v18+)
- MongoDB installed locally and running on port `27017` (or MongoDB Atlas URI)

### 1. Backend Setup:
```bash
cd backend
npm install
npm run dev
```
Server will run on: **`http://localhost:4000`**

### 2. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```
UI will run on: **`http://localhost:5173`**

---

## 📋 Assessment Requirement Checklist

- [x] **Part A - Frontend**:
  - [x] React + Vite app created
  - [x] Tailwind CSS layout and responsive design
  - [x] `TaskForm` component implemented
  - [x] `TaskList` component implemented
  - [x] `TaskItem` component implemented
  - [x] State management with `useState`
  - [x] Data passing via `props`
  - [x] Strikethrough & checked visual status
- [x] **Part B - Backend**:
  - [x] Express.js server running with middleware (`express.json()`, `cors`)
  - [x] `POST /tasks` implemented
  - [x] `GET /tasks` implemented
  - [x] `PUT /tasks/:id` implemented (mark completed / edit)
  - [x] `DELETE /tasks/:id` implemented
  - [x] Empty title and invalid ID validation
  - [x] Consistent JSON format (`{ id, title, status, createdAt }`)
- [x] **Part C - Database**:
  - [x] MongoDB connection via Mongoose
  - [x] Task Schema with timestamps & validation
  - [x] Full CRUD operations operational
  - [x] Error handling for invalid IDs
- [x] **Part D - Integration & Deliverables**:
  - [x] Full client-server communication verified
  - [x] Git version control initialized ([GitHub Repo](https://github.com/devshakibhasan/taskflow-manager))
  - [x] Live public deployment ([Live Netlify Site](https://taskflow-manager-shakib.netlify.app/))
  - [x] Complete documentation provided
