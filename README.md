# FarmVerse — Precision Agriculture Platform

Welcome to **FarmVerse**, a full-stack Precision Agriculture SaaS platform designed to empower farmers, farm managers, experts, and administrators with real-time farm monitoring, crop health analytics, and interactive soil/weather telemetry.

---

## 📂 Project Structure

The project has been cleaned and reorganized into a professional, root-level layout:

```text
Farmverse_Project/
├── BackEnd/                   # Spring Boot (Java) REST API
│   ├── src/                   # MVC Layers (Controller, Service, Repository, Entity, security)
│   └── pom.xml                # Maven Dependencies
├── FrontEnd/                  # Premium React + Vite (Tailwind v4) App
│   ├── src/                   # Role dashboards, Recharts analytics, Contexts, and API modules
│   └── package.json           # Vite and Tailwind config
├── .gitignore                 # Root git rules ignoring build outputs & logs
├── README.md                  # Main developer setup guide (this file)
├── ProjectPlan.md             # Consolidated team roadmap & database schema
├── TODO.md                    # Active task list & bug tracking
├── BACKEND_DOCUMENTATION.md   # Comprehensive Spring Boot REST API guide
└── FRONTEND_DOCUMENTATION.md  # Detailed React view, route, and state guide
```

---

## ⚡ Quick Start

### 1. Backend Setup (Spring Boot)

The backend is built with **Java 17**, **Spring Boot**, **Spring Security (JWT)**, and a **MySQL** database.

1. **Pre-requisites:**
   - Make sure Java JDK 17+ and Maven are installed.
   - Kill any process on port `8080` (the default backend port):
     ```cmd
     FOR /F "tokens=5" %P IN ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') DO taskkill /PID %P /F
     ```

2. **Run Backend:**
   - Navigate to the `BackEnd/` directory and run:
     ```bash
     cd BackEnd
     mvn spring-boot:run
     ```
   - The backend runs at `http://localhost:8080`.

3. **CORS:**
   - CORS is preconfigured to accept requests from `http://localhost:5173` (Vite) and `http://localhost:3000`.

*For more details, check [BACKEND_DOCUMENTATION.md](file:///c:/Users/Roshni/OneDrive/Documents/Desktop/Farmverse_Project/BACKEND_DOCUMENTATION.md).*

---

### 2. Frontend Setup (React + Vite + Tailwind v4)

The frontend features a high-fidelity dashboard built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **Framer Motion**, and **Recharts**.

1. **Install Dependencies:**
   - Navigate to the `FrontEnd/` directory:
     ```bash
     cd FrontEnd
     npm install
     ```

2. **Running Modes:**

   *   **Mock / Offline Mode (Default):**
       If no base URL is defined, the app runs entirely in **Mock Mode**, using simulated state and telemetry, saving local changes in memory.
       To start:
       ```bash
       npm run dev
       ```

   *   **Connected Mode (Spring Boot Backend):**
       To connect the frontend to your running Spring Boot backend:
       - Set the environment variable `VITE_API_BASE_URL` to `http://localhost:8080` (or configure it in a `.env` file inside `FrontEnd/`).
       - Or utilize the pre-configured Vite local proxy: requests made relative to the dev server starting with `/api` will be proxied automatically.

3. **View the App:**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

*For more details, check [FRONTEND_DOCUMENTATION.md](file:///c:/Users/Roshni/OneDrive/Documents/Desktop/Farmverse_Project/FRONTEND_DOCUMENTATION.md).*

---

## 🛠️ Key Architectural Integrations

1. **Dynamic API Routing:**
   Axios calls automatically toggle between local Mock state and live HTTP endpoints depending on the presence of `VITE_API_BASE_URL`.
2. **Role-Based Access Control:**
   Secure navigation routes restrict views based on user login claims (`ADMIN`, `FARM_MANAGER`, `GUEST`, `FARMER`).
3. **Soil & Weather Telemetry:**
   High-fidelity graphs (using Recharts) visualize moisture, temperature, and yield data dynamically.
