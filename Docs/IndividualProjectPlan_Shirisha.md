# Individual Project Plan – Shirisha

## Project Overview
**Project Name:** FarmVerse – Precision Agriculture Platform
**Tech Stack:** React, Spring Boot, MySQL

## Project Statement
Agriculture management becomes difficult when farm and crop information is maintained manually. Managing multiple farms, updating crop records, and tracking farming activities can take a lot of time. A digital platform can simplify these tasks and improve overall farm management.

## Proposed Solution
The main objective is to develop a web-based application that helps users manage farms, crops, and user information in a simple and organized way. The system provides easy access to farm records and supports better management of agricultural activities.

## Main Features
- Secure login for different users.
- Add, edit, view, and delete farm details.
- Maintain crop records and update crop status.
- Store all information in a MySQL database.
- Easy-to-use dashboard for quick access.

## Database Design (MySQL)
- **User** – Stores user login details and role fields such as id, username, password, role, and dob.
- **Farm** – Stores farm information like id, farm_name, geo_location, owner_id
- **Crop** – Stores crop information like id, crop_name, farm_id, status

## System Modules (Backend / Spring Boot)
- **User Module** – User login, view profile, role-based access.
- **Farm Module** – Add farm, view farm, edit farm, delete farm.
- **Crop Module** – Add crop, view crop, update crop status, delete crop.

## User Interface (Frontend / React)
- **Login Screen:** Users log in using their username and password.
- **Dashboard:** Shows farms, crops, and important information in one place.
- **Management Pages:** Simple forms for managing farms and crop records.

## Development Process
1. **Phase 1:** Create the database and tables.
2. **Phase 2:** Develop backend APIs using Spring Boot.
3. **Phase 3:** Design the React frontend and connect it with the backend.
4. **Phase 4:** Test the application, fix errors, and submit the final project.

## Expected Result
The application will help users manage farm information easily, reduce manual work, improve record accuracy, and provide a simple platform for daily farm management.
