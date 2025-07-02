import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true,
        unique : true,
    },
    author : {
        type : String ,
        required : false,
    },
    genre : {
        type : String ,
        required : true,
    },
    publishedYear : {
        type : Number,
        required : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
} , {timestamps : true});


const Book = mongoose.model('Book',bookSchema);

export default Book;