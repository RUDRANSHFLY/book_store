import { Router } from "express";
import createBooks from "../controller/create-books.js";
import getBooks from "../controller/get-books.js";
import updateBook from "../controller/update-book.js";
import deleteBook from "../controller/delete-book.js";

export const bookRouter = Router();

bookRouter.get("/books", (req, res) => {
  return getBooks(req, res);
});

bookRouter.post("/books", (req, res) => {
  return createBooks(req, res);
});

bookRouter.put("/books/:id", (req, res) => {
  const { id } = req.params; 
  return updateBook(req,res,id)
});

bookRouter.delete("/books/:id", (req, res) => {
  return deleteBook(req,res)
});
