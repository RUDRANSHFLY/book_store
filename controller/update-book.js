import Book from "../model/book-schema.js";

export default async function updateBook(req, res, id){
  console.log(`Request URL: ${req.url}, Request Method: ${req.method} ID : ${id}`);

  if (!id) {
    console.error(`Missing fields: Id`);

    return res.status(400).json({
      error: `Missing required fields : Id`,
    });
  }

  const alreadyBookExists = await Book.findById(id);

  if(!alreadyBookExists){
    console.error("Book Doesn;t Exist")
  }

  const updatedData = req.body;

  console.table(updatedData);

  try {
    

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true, 
      runValidators: true,
    });

    if(!updatedBook){
        return res.status(400).json({success : false , "message" : "Book not found"})
    }

    console.log("Book Updated ✅");
    return res.status(201).json({
            "success" : "True",
            "message" : "Book Updated",
            "data" : updatedBook
    })
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
};
