# Library Management API

A professional RESTful API for managing books and borrow records in a library, built with **Node.js**, **Express**, **Mongoose**, and **TypeScript** following the MVC architecture (Model-View-Controller, without View).

---

## Features

- **Book Management**
  - Add new books with validation (title, author, genre, ISBN, copies, etc.)
  - List all books with filtering, sorting.
  - Get details of a single book
- **Borrow Management**
  - Borrow books with quantity and due date validation
  - Prevent borrowing if not enough copies are available
  - Summary endpoint for total borrowed quantity per book (aggregation)
- **Validation & Error Handling**
  - Mongoose schema validation and custom middleware (e.g., due date must be in the future)
- **MVC Structure**
  - Organized codebase with separate folders for models, controllers and interfaces

---

## Live Server

You can try the API live here:  
**[https://library-management-l2a3.vercel.app/](https://library-management-l2a3.vercel.app/)**

---


## Project Structure

```
src/
  app/
    controllers/   # Route handlers (business logic)
    interfaces/    # TypeScript interfaces for models
    models/        # Mongoose schemas and models
  server.ts        # Entry point
  app.ts           # Express app setup
.env               # Environment variables
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud)

---

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your MongoDB connection string:

```
DB_URL=mongodb://localhost:27017/librarydb
PORT=9000
```

### 4. Build the Project

```sh
npm run build
# or
yarn build
```

### 5. Start the Server

```sh
npm start
# or
yarn start
```

For development with auto-reload:

```sh
npm run dev
# or
yarn dev
```

---

## API Endpoints

### Books

- `POST   /api/books` &mdash; Add a new book
- `GET    /api/books` &mdash; List all books (supports filter, sort, limit)
- `GET    /api/books/:bookId` &mdash; Get details of a book

### Borrow

- `POST   /api/borrow` &mdash; Borrow a book
- `GET    /api/borrow` &mdash; Get borrowed books summary (aggregation)

---

## Technologies Used

- **Node.js** & **Express** for server and routing
- **TypeScript** for type safety
- **Mongoose** for MongoDB ODM and schema validation

---

## Notes

- The project follows the MVC pattern (no view layer, as it's an API).
- All validation and business logic are handled in models and controllers.
- Error responses are consistent and informative.

---

##