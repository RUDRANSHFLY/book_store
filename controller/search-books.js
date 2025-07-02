import Book from "../model/book-schema.js";

export default async function searchBooks(req, res) {

    const {genre , author , title} = req.query;
    const filter = {}
    if(genre) filter.genre = {$regex : new RegExp(genre,"i") }
    if(author) filter.genre = {$regex : new RegExp(author,"i") }
    if(title) filter.genre = {$regex : new RegExp(title,"i") }

  try {
    const books = await Book.find(filter)
    return res.status(200).json({"success" : true , "data" : books })
  } catch (error) {
    console.error("Error searching book", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
