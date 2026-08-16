# Library Management System

A responsive Library Management System prototype developed for Software Engineering 1 Module 7. The project translates the **Books entity** from the Module 6 architectural design into a working Vue.js frontend prototype.

## Student Information

- **Name:** Kurt Lawrence Salonga
- **Course and Section:** BSCS 3A
- **Subject:** Software Engineering 1
- **Module:** Module 7 - Design and Implementation

## Project Overview

The Library Management System is a web-based frontend prototype for managing book records in an organized and user-friendly interface. The system allows users to add, view, edit, delete, search, and validate book records while keeping the records available after a browser refresh through localStorage.

The implemented Module 7 scope focuses on the **Books** entity from the Module 6 system architecture. The Module 7 guide requires one manageable entity with CRUD, search, validation, and localStorage persistence. The selected Books entity uses the fields **Book ID, title, author, category, and status**.

## Problem Statement

Managing book records manually can make it difficult to keep information organized and quickly identify the availability of books. This prototype provides a centralized interface for maintaining book records and checking their current status.

## Target Users

- Library staff
- Librarians
- Users responsible for maintaining library book records

## Selected Module 6 Entity

**Primary Record:** Book

### Book Fields

| Field | Description |
|---|---|
| Book ID | Unique identifier for the book |
| Title | Title of the book |
| Author | Author of the book |
| Category | Category or classification of the book |
| Status | Current availability status: Available or Borrowed |

## Implemented Features

### 1. Create
Add a new book record using the book form.

### 2. Read
View saved book records through the collection/records section and dashboard.

### 3. Update
Edit an existing book record and save the updated information.

### 4. Delete
Remove an existing book record after confirmation.

### 5. Search
Search book records using information such as Book ID, title, author, category, or status.

### 6. Validation
Required fields are validated before a book record can be saved. Duplicate Book IDs are also checked.

### 7. localStorage Persistence
Book records are stored in browser localStorage so saved records remain available after refreshing the page.

### 8. Success and Error Feedback
The system provides clear feedback when a book is successfully added, updated, or deleted, and when an invalid or duplicate record is submitted.

### 9. Responsive User Interface
The interface is designed to remain usable on different screen sizes.

### 10. Light and Night Mode
The system provides light and night mode styling for a more comfortable user experience.

## User Interface

The interface was designed with a clean and modern library dashboard. It includes:

- Dashboard overview
- Library statistics
- Collection insights
- Availability status
- Recently added books
- Add/Edit Book form
- Book records
- Search functionality
- Side navigation menu
- Light/Night mode
- Smooth transitions and animations
- Responsive layout

## Technologies Used

- **Vue.js** - Frontend framework
- **Vite** - Development and build tooling
- **JavaScript** - Application logic and CRUD operations
- **Tailwind CSS** - Responsive interface styling
- **HTML/CSS** - Structure and custom visual design
- **localStorage** - Browser-based data persistence
- **Git** - Version control
- **GitHub** - Repository hosting
- **GitHub Actions** - Continuous-integration build check

The Module 7 guide specifies Vue.js + Vite, Tailwind CSS, JavaScript, localStorage, Git/GitHub, and GitHub Actions for the implementation. fileciteturn12file3L256-L267

## Installation and Run Instructions

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd YOUR_REPOSITORY_FOLDER
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the local application

Open the local URL displayed by Vite in your browser.

## Production Build

To verify that the application can be built successfully:

```bash
npm run build
```

The Module 7 activity also requires a GitHub Actions workflow that runs `npm ci` and `npm run build` as a production-build check. fileciteturn10file3L237-L263

## localStorage

This Module 7 prototype uses browser localStorage instead of a backend database. Book records are converted to JSON and stored in the browser. When the application starts, the saved records are retrieved and displayed again.

This approach follows the Module 7 scope, which allows the complete backend, API, and database from the Module 6 architecture to remain proposed future components. fileciteturn12file3L272-L278

## Connection Between Module 6 and Module 7

Module 6 established the proposed architecture and identified the system's main record. Module 7 continues that design by implementing the **Books entity** as a working frontend prototype.

The Library System uses **Books** as the selected entity, with Book ID, title, author, category, and status as its example fields. fileciteturn12file3L296-L301

The Module 6 architecture originally proposed a three-tier system with a frontend, application/backend layer, and database. In Module 7, the frontend portion is implemented using Vue.js, while localStorage is used for prototype persistence. The backend API and database can be implemented as future components.

## Project Structure

```text
library-management-system/
├── src/
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── BookForm.vue
│   │   └── BookList.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── public/
├── .github/
│   └── workflows/
│       └── build.yml
├── package.json
├── package-lock.json
└── README.md
```

## Testing

The following functions should be tested:

| Test | Expected Result |
|---|---|
| Add a valid book | Book is added successfully |
| Add a duplicate Book ID | Validation error is displayed |
| Edit a book | Updated information is saved |
| Delete a book | Book is removed after confirmation |
| Search a book | Matching records are displayed |
| Refresh browser | Saved records remain available |
| Switch light/night mode | Interface changes theme |
| Resize browser | Interface remains usable |
| Run production build | Vue application builds successfully |

The Module 7 guide specifically expects saved records to remain after a refresh and the interface to remain usable when resized. fileciteturn11file0L13-L15

## Screenshots

Add the required application screenshots here before final submission.

Suggested screenshots:

1. Dashboard
2. Books/Records section
3. Add Book form
4. Successful book addition
5. Edit Book form
6. Successful book update
7. Search results
8. Delete confirmation/result
9. Light mode
10. Night mode
11. Responsive/mobile view
12. GitHub repository
13. GitHub Actions successful build

## Known Limitations

- The current implementation is a frontend prototype.
- Data is stored only in browser localStorage.
- There is no connected backend API.
- There is no MongoDB/database connection in this Module 7 prototype.
- User authentication and authorization are not implemented.
- Data stored in one browser is not automatically shared with other devices or users.

## Future Improvements

Future versions may include:

- Node.js and Express backend
- MongoDB database integration
- User authentication and role-based access
- Book borrowing and return transactions
- Due-date tracking
- Multiple-user support
- Cloud-based data synchronization
- Deployment to a public hosting platform
- More advanced reporting and analytics

## Project Status

**Module 7 - Design and Implementation**

The Library Management System frontend prototype has been implemented with Vue.js, JavaScript, Tailwind CSS/custom CSS, and localStorage. The project includes CRUD operations, search, validation, responsive UI, and browser-based persistence.

The Module 7 activity requires a public GitHub repository, meaningful commit history, a successful GitHub Actions build check, screenshots, a repository link, and the completed documentation. fileciteturn12file3L287-L295
