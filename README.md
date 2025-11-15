# Integrated Academic Insights Portal (IAIP)

The Integrated Academic Insights Portal (IAIP) is a full–stack academic management and analytics system developed as a DBMS project. It provides an end-to-end solution for managing academic data such as students, faculty, departments, courses, attendance, assessments, final results, and semester-wise GPA.

The system is built using:
- MySQL (15-table normalized schema)
- Flask (REST API backend)
- React + TypeScript (Vite frontend)

IAIP replaces manual Excel-based processes with a structured, scalable, and data-driven digital portal.

---

## Overview

IAIP centralizes all core academic workflows into one unified platform. It manages:

- Student and faculty information  
- Department and course structures  
- Semester-wise course offerings  
- Student enrollments  
- Subject-wise attendance tracking  
- Internal and external assessments  
- Final results and grade computation  
- GPA analytics and performance trends  

The platform follows a clean three-tier architecture with separation between frontend, backend, and database layers.

---

## Features

### Academic Management
- Student information management  
- Faculty information management  
- Departments and course catalog  
- Semester-wise course offerings  
- Student course enrollments  

### Academic Insights
- Subject-wise attendance tracking  
- Internal and external assessment components  
- Computation of final marks and grades  
- GPA calculation per semester  
- Performance analytics and report views  

### Role-Based Access
- Admin  
- Faculty  
- Student  

### Tech Stack
Frontend: React, TypeScript, Vite  
Backend: Python (Flask)  
Database: MySQL (XAMPP)  
Tools: mysql-connector-python, Node.js, npm  

---

## System Architecture
```md
![System Architecture](assets/architecture.png)
