import Book from "../model/book-schema.js";

export default async function deleteBook(req, res) {
  try {
      const { id } = req.params;
      console.log(`Request URL: ${req.url}, Request Method: ${req.method} ID : ${id}`);

    const deletedBook = await Book.findByIdAndDelete(id);

    if(!deletedBook){
        console.log("Book not Found");
        
        return res.status(404).json({sucess : false , message : "Book not Found"})
    }

    console.log(`Book Deleted for id : ${id}`);
    
    return res.status(200).json({
        success : true,
        message : `Book Deleted for id : ${id} `
    })
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
