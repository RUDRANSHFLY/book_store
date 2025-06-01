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
    price : {
        type : Number ,
        required : true,
    },
    publishedDate : {
        type : Date,
        required : true,
    }
} , {timestamps : true});


const Book = mongoose.model('Book',bookSchema);

export default Book;