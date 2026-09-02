# 📚 Library Management System

A modern and user-friendly **Library Management System** developed for **Software Engineering 1 – Module 7, Module 8, and Module 9** using Vue.js and Vite.

The system allows librarians to organize, manage, search, add, edit, and delete book records through a clean and responsive interface. It also includes user authentication, session persistence, automated testing, and software evolution through an approved change request.

---

## 🌐 Live System

**Access the deployed system here:**

https://kurtsalonga-07.github.io/salonga-module7-vue-system/

---

## 👤 Developer

**Kurt Lawrence Salonga**

Software Engineering 1  
Module 7 – Vue.js Library Management System  
Module 8 – Software Testing  
Module 9 – Software Evolution

---

## ✨ Features

### 📊 Dashboard

- 📊 Library dashboard
- 📚 Total book statistics
- ✅ Available book statistics
- 📖 Borrowed book statistics
- 🏷️ Category statistics
- 📈 Collection overview
- 📋 Recently added books
- 📌 Library availability status

### 📚 Book Management

- ➕ Add new books
- ✏️ Edit existing book records
- 🗑️ Delete book records
- 🔎 Search books
- 🔍 Search by Book ID
- 👤 Search by author
- 🏷️ Search by category
- 📖 Available and Borrowed status
- 🆔 Duplicate Book ID validation
- ✅ Form validation
- 🔔 Success and error notifications
- 💾 LocalStorage data persistence

### 🔐 User Authentication

- 🔑 Login page
- 📝 Register page
- 👤 Librarian account registration
- 📧 Email validation
- 🔒 Password validation
- 🔐 Password confirmation
- 👁️ Show/Hide password
- 💪 Password strength indicator
- 🌙 Authentication page theme support
- 💾 Saved user accounts using LocalStorage

### 🧑‍💻 Session Management

- 🔐 User login session
- 💾 Persistent login session using LocalStorage
- 🔄 Session restoration after page refresh
- 🚪 Logout functionality
- 🛡️ Protected library dashboard
- 🔑 Current logged-in user storage
- 🔄 Login/Register page switching

### 🧪 Software Testing

- ⚡ Vitest automated testing
- 🧩 Vue component testing
- ✅ Book creation testing
- 📋 Book display testing
- ✏️ Book update testing
- 🗑️ Book deletion testing
- 🚫 Duplicate Book ID validation testing
- 🔄 Automated regression testing

### 🌱 Software Evolution

- 📋 Change Request documentation
- 🔧 Perfective Maintenance
- 📊 Change impact analysis
- 🏗️ Architecture evaluation
- 🔄 System improvement
- 🧪 Retesting after modification
- 📈 Preservation of existing system functions

---

## 📋 Module 9 – Software Evolution

Module 9 focuses on evolving the existing Library Management System without creating a new project.

The system continues from the previous Module 7 and Module 8 implementation.

### Change Request

**Change Request ID:** CR-M9-01

**Title:** Add Active/Inactive User Filter

**Maintenance Type:** Perfective Maintenance

### Description

The change improves the usability of the existing system by allowing users to filter records according to their status while keeping the existing system functions working correctly.

### Acceptance Criteria

1. The records section provides **All, Active, and Inactive** filter options.
2. Selecting **Active** displays only records marked as Active.
3. Selecting **Inactive** displays only records marked as Inactive.
4. Selecting **All** displays all records.
5. Existing Add, Display, Edit, Delete, Search, Validation, Delete Confirmation, and Persistence functions continue to work correctly.

---

## 🧪 Module 8 – Software Testing

Vitest is used to test the major features of the existing Vue.js system.

### Automated Tests

The system currently includes five automated unit tests:

1. **Adds a new book successfully**
2. **Displays added book records in the collection**
3. **Updates an existing book successfully**
4. **Deletes a book after confirmation**
5. **Rejects a duplicate Book ID**

### Test Command

Run the automated tests using:

```bash
npm run test:run