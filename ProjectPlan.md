Name: Rishav Choudhary

Project : Precision Agriculture Platform

Tech Stack: Java Full Stack (React, Spring Boot, MySQL)

1. Problem Statement
Traditional farming relies on guesswork, causing wasted resources, poor crop yields, and unnoticed soil damage. Farmers lack easy, real-time visibility into crucial field data like moisture, temperature, and pH levels to make smart decisions.

2. Problem Solution
This Precision Agriculture Platform provides a centralized digital dashboard where users can manage farms, fields, and crops based on simulated environmental data. The system allows farm owners to track soil and crop health, automate data entry schedules, and manage different agricultural parameters to optimize farming efficiency.

3. High-Level Architecture
The application uses a standard three-tier full-stack architecture to separate user interface logic from business processing and data storage:

┌─────────────────────────────────────────────────────────┐
│                 FRONTEND (Top Layer)                    │
│      React.js / HTML5 / CSS3 (User Dashboards)           │
└────────────────────────────┬────────────────────────────┘
                             │ (REST API / JSON Data)
   ▼
┌─────────────────────────────────────────────────────────┐
│                BACKEND (Middle Layer)                   │
│       Spring Boot MVC / Spring Data JPA (Java)          │
└────────────────────────────┬────────────────────────────┘
                             │ (JDBC Connections)
                             ▼
┌─────────────────────────────────────────────────────────┐
│               DATABASE (Storage Layer)                  │
│               MySQL Relational Database                 │
└─────────────────────────────────────────────────────────┘

4. Deep Architecture: Database Schema
User Entity

id (INT, Primary Key, Auto Increment)
username (VARCHAR)
password (VARCHAR)
type / role (ENUM: 'ADMIN', 'FARM_MANAGER', 'GUEST')
dob (DATE)

-- Farm Entity

id (INT, Primary Key, Auto Increment)
farm_name (VARCHAR)
geo_location (VARCHAR - Latitude/Longitude coordinates)
owner_id (INT, Foreign Key referencing User Table)

--Crop Entity

id (INT, Primary Key, Auto Increment)
crop_name (VARCHAR - e.g., Rice, Wheat, Corn)
farm_id (INT, Foreign Key referencing Farm Table)
status (VARCHAR - e.g., Growing, Harvested)

5. Backend Implementation Scope (Spring Boot)
Farm Management API:

POST /api/farms — Create a new farm layout with geo-locations.
GET /api/farms — Fetch all registered farms.
GET /api/farms/{id} — Fetch specific details of a farm.
PUT /api/farms/{id} — Update farm location or name.
DELETE /api/farms/{id} — Remove a farm from tracking.

Crop Management API:

POST /api/crops — Add new crop data linked to a specific farm.
GET /api/crops/farm/{farmId} — Retrieve all crops active on a specific farm.
PUT /api/crops/{id} — Update crop lifecycle growth logs.
DELETE /api/crops/{id} — Delete a crop record.

6. Frontend UI Layout Scope (React)
User Authentication / Landing View: A clean dashboard interface optimized by user roles (Admin, Farm Manager, or Guest) restricting views based on permissions.

Farms Dashboard Page: A screen displaying a grid or table list of all tracked farms, including metadata like geo-location coordinates.

Crop & Management Modals:
An "Add User" form layout.
An "Add Farm" popup input form.
An "Add Crop Data" dynamic table configuration page to input soil thresholds.

7. Step-by-Step Implementation Roadmap (Sprints)

1.Step 1: Database Setup & Entities:  Sprint 1 - Foundations.Create the MySQL database schemas on our local machines.Write the Java JPA Entity classes for User, Farm, and Crop inside the Spring Boot backend project.Verify the table relationships (One-to-Many connections between Users, Farms, and Crops).

2.Step 2: Backend CRUD Development:Sprint 2 - Core Engine.Build the Spring Data Repository interfaces for database actions.Code the Service layers to handle the business rules.Implement and test the REST Controllers (POST, GET, PUT, DELETE endpoints) using Postman.

3.Step 3: Frontend Component Assembly:Sprint 3 - UI Development.Create the base React layout structure.Develop the Farm Dashboard grid view and forms ("Add Farm", "Add Crop").Integrate Axios / Fetch API into React to connect our frontend interface directly to the Spring Boot endpoints.

4.Step 4: Role Restrictions & Integration Testing:Sprint 4 - Polish & Review.Implement simple frontend routing logic to display different panels based on user types (Admin vs Guest).Run an end-to-end test: Add a user, assign a farm, link a crop, and verify it saves in the MySQL tables correctly.Push the finalized code branch and create a clean Pull Request into the main branch.