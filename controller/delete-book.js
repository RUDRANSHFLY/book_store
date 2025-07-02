import Book from "../model/book-schema.js";
import logger from "../util/logger.js";

export default async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const deletedBook = await Book.findById(id);

    if (!deletedBook) {
      logger.error("Book not Found");
      return res.status(404).json({ sucess: false, message: "Book not Found" });
    }

    const bookUserId = deletedBook.userId;

    logger.info(`Book UserId : ${bookUserId} - Authenticated UserId : ${userId}`)


    if(String(bookUserId) !== String(userId)){
      logger.error("Unauthorized to deleteBook")
      return res.status(403).json({message : "Your are not allowed to delete this book"})
    }

    logger.info(`Book Deleted for id : ${id}`);

    await Book.findByIdAndDelete(id)

    return res.status(200).json({
      success: true,
      message: `Book Deleted for id : ${id} `,
    });
  } catch (error) {
    logger.error("Error deleting book", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
