import { Router } from "express";
import createBooks from "../controller/create-books.js";
import getBooks from "../controller/get-books.js";
import updateBook from "../controller/update-book.js";
import deleteBook from "../controller/delete-book.js";
import authenticateToken from "../controller/authenticate-token.js";

export const bookRouter = Router();


//? ✅ Get all bokes for authenticated user
bookRouter.get("/books", authenticateToken , (req, res) => {
  return getBooks(req, res);
});


//? ✅ Create a new book
bookRouter.post("/books" , authenticateToken , (req, res) => {
  return createBooks(req, res);
});

//? ✅ Update a book by Id
bookRouter.put("/books/:id",authenticateToken, (req, res) => {
  return updateBook(req,res)
});


//? ❌ Delete a book by Id
bookRouter.delete("/books/:id", authenticateToken , (req, res) => {
  return deleteBook(req,res)
});
