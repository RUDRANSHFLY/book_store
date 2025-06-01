import Book from "../model/book-schema.js";

export default async function getBooks(req, res) {
  console.log(`Request URL: ${req.url}, Request Method: ${req.method}`);
  try {
    const books = await Book.find()
    return res.status(200).json({"success" : true , "data" : books })
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
