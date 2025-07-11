# Bookstore API

A simple Node.js Express REST API for managing books, users, and authentication.

## 🔧 Tech Stack

* **Backend**: Express.js
* **Database**: MongoDB (via Mongoose)
* **Authentication**: JWT + bcrypt
* **Logging**: Winston
* **Architecture**: MVC (Model-View-Controller)

---

## 📦 .env Configuration

```env
PORT=3000
DATABASE_URL="mongodb+srv://rakafly58:x1zNiyWAvO4fB9tt@cluster0.chd0rpr.mongodb.net/bookstore"
ACCESS_TOKEN_SECRET="A1B2C3D4"
```

---

## 🚀 API Endpoints

### 1. 🔐 Register User

**POST** `/api/auth/register`

#### Request Body:

```json
{
  "userName": "leo22",
  "password": "leo22",
  "email": "leo22@gmail.com"
}
```

#### Success Response:

```json
{
  "message": "success",
  "data": {
    "userName": "leo22",
    "email": "leo22@gmail.com",
    "password": "<hashed>",
    "_id": "6865276ce277c416e1ce66d4",
    "createdAt": "2025-07-02T12:34:52.918Z",
    "updatedAt": "2025-07-02T12:34:52.918Z",
    "__v": 0
  }
}
```

#### Duplicate User:

```json
{
  "error": "userName 'leo22' already exists."
}
```

---

### 2. 🔐 Login User

**POST** `/api/auth/login`

#### Request Body:

```json
{
  "email": "leo22@gmail.com",
  "password": "leo22"
}
```

#### Success Response:

```json
{
  "message": "Login successful",
  "user": {
    "_id": "...",
    "userName": "leo22",
    "email": "leo22@gmail.com",
    "password": "<hashed>",
    ...
  },
  "token": "<JWT token>"
}
```

#### Invalid Password:

```json
{
  "error": "Invalid password"
}
```

#### User Not Found:

```json
{
  "error": "No user exist with this email"
}
```

---

### 3. 📚 Create a Book (Protected)

**POST** `/api/books`

**Headers:** `Authorization: Bearer <token>`

#### Request Body:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Philosophical",
  "publishedYear": 1988
}
```

#### Success Response:

```json
{
  "success": "True",
  "message": "New Book Addeed",
  "id": "<bookId>"
}
```

#### Duplicate Book:

```json
{
  "error": "title 'The Alchemist' already exists."
}
```

---

### 4. 📖 Get All Books (Protected)

**GET** `/api/books`

**Headers:** `Authorization: Bearer <token>`

#### Success Response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "...",
      "author": "...",
      "genre": "...",
      "publishedYear": 2000,
      "userId": "..."
    }
  ]
}
```

---

### 5. 🔍 Search Books (Protected)

**GET** `/api/books/search?genre=Love`

**Headers:** `Authorization: Bearer <token>`

#### Success Response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "68651a7052c2031114f85099",
      "title": "The Lost Horizon",
      "author": "James Hilton",
      "genre": "Love",
      "publishedYear": 2000,
      "userId": "68650dd4d4d837c0b10c9182",
      "createdAt": "2025-07-02T11:39:28.744Z",
      "updatedAt": "2025-07-02T12:29:57.145Z",
      "__v": 0
    },
    {
      "_id": "686527abe277c416e1ce66d9",
      "title": "The Alchemist",
      "author": "Paulo Coelho",
      "genre": "Love",
      "publishedYear": 2000,
      "userId": "6865276ce277c416e1ce66d4",
      "createdAt": "2025-07-02T12:35:55.509Z",
      "updatedAt": "2025-07-02T12:43:29.031Z",
      "__v": 0
    }
  ]
}
```

---

### 6. 🗑️ Delete a Book (Protected)

**DELETE** `/api/books/:id`

**Headers:** `Authorization: Bearer <token>`

#### Unauthorized Access:

```json
{
  "message": "Your are not allowed to delete this book"
}
```

#### Success:

```json
{
  "success": true,
  "message": "Book Deleted for id : <bookId>"
}
```

---

### 7. ✏️ Update a Book (Protected)

**PUT** `/api/books/:id`

**Headers:** `Authorization: Bearer <token>`

#### Request Body:

```json
{
  "genre": "Love",
  "publishedYear": 2000
}
```

#### Unauthorized Access:

```json
{
  "message": "Your are not allowed to delete this book"
}
```

#### Success:

```json
{
  "success": "True",
  "message": "Book Updated",
  "data": {
    "_id": "...",
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "genre": "Love",
    "publishedYear": 2000,
    ...
  }
}
```

---

## 🔐 Security & Logging

* **Password encryption**: bcrypt
* **JWT Auth**: All protected routes require `Bearer token`
* **Logging**: Winston logs request methods, errors, and custom info messages.

---

## 🧱 Folder Structure

```
📁 controller
📁 model
📁 routes
📁 util
📄 server.js
📄 .env
```

---

## 🛡️ Authorization Notes

* Each book belongs to a specific user.
* Users can only update or delete books they own.

---

## 📬 Contact

If you have any questions or suggestions, feel free to reach out.

---

> Built with ❤️ by Rudransh (Leo)
