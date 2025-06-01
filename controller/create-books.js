import Book from "../model/book-schema.js";

export default async function createBooks(req, res) {
  console.log(`Request URL: ${req.url}, Request Method: ${req.method}`);

  const { title, author, price, publishedDate } = req.body;

  if (!title || !author || !price || !publishedDate) {
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!author) missingFields.push("author");
    if (!price) missingFields.push("price");
    if (!publishedDate) missingFields.push("publishedDate");

    console.error(`Missing fields: ${missingFields.join(", ")}`);

    return res.status(400).json({
      error: `Missing required fields : ${missingFields.join(", ")}`,
    });
  }

  const data = [title, author, price, publishedDate];

  console.table(data);

  try {
    const book = new Book({
      title: title,
      author: author,
      price: price,
      publishedDate: publishedDate,
    });

    await book.save();

    console.log("New Book Add ✅");
    return res.status(201).json({
      success: "True",
      message: "New Book Addeed",
      id : book.id
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      console.log(`${field} '${value}' already exists.`);
      return res
        .status(409)
        .json({ error: `${field} '${value}' already exists.` });
    } else {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
