import Book from "../model/book-schema.js";
import logger from "../util/logger.js";

export default async function updateBook(req, res) {
  const { id } = req.params;
  if (!id) {
    logger.error(`Missing fields: Id`);
    return res.status(400).json({
      error: `Missing required fields : Id`,
    });
  }
  try {
    const alreadyBookExists = await Book.findById(id);

    if (!alreadyBookExists) {
      logger.error("Book Doesn;t Exist");
      return res.status(404).json({
        success: false,
        message: "Book not Found 🗑️",
      });
    }

    const userId = req.user?.id;
    const bookUserId = alreadyBookExists.userId;

    if (String(bookUserId) !== String(userId)) {
      logger.error("Unauthorized to deleteBook");
      return res
        .status(403)
        .json({ message: "Your are not allowed to delete this book" });
    }

    const updatedData = req.body;

    console.table(updatedData);

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res
        .status(400)
        .json({ success: false, message: "Book not found" });
    }

    logger.info("Book Updated ✅");
    return res.status(201).json({
      success: "True",
      message: "Book Updated",
      data: updatedBook,
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
      logger.error("Error updating book:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
