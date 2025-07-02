import Book from "../model/book-schema.js";
import logger from "../util/logger.js";

export default async function createBooks(req, res) {
  const { title, author, genre, publishedYear } = req.body;
   const id = req.user?.id;

  if (!title || !author || !genre || !publishedYear || !id) {
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!author) missingFields.push("author");
    if (!genre) missingFields.push("genre");
    if (!publishedYear) missingFields.push("publishedYear");

    console.error(`Missing fields: ${missingFields.join(", ")}`);

    return res.status(400).json({
      error: `Missing required fields : ${missingFields.join(", ")}`,
    });
  }

  const data = [title, author , genre , publishedYear];

  console.table(data);

  try {
    const book = new Book({
      title: title,
      author: author,
      genre: genre,
      publishedYear: publishedYear,
      userId : id,
    });

    await book.save();

    logger.info("New Book Add ✅");
    return res.status(201).json({
      success: "True",
      message: "New Book Addeed",
      id : book.id
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      logger.error(`${field} '${value}' already exists.`);
      return res
        .status(409)
        .json({ error: `${field} '${value}' already exists.` });
    } else {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
