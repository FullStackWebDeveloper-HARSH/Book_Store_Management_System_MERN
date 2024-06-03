// here in models we have all schemas of data base
// Here we are creating structure of the table 
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    // book_name:String....in this case it will also work but we are doing in different way
    book_name:{
        type:String,
        // required means hme ye compulsory add krna hai ki nhi. it can be true or false.
        //      agr hme required nhi hai to hm required:false kr skte hain
        required:true,

    },
    book_author:{
        type:String,
        required:true,
    },
    book_price:{
        type:Number,
        required:true,
    },
    book_publish_date:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        // passing two values enable and disable 
        enum:['enable', 'disable'],
        // setting default value 
        default:'enable'
    }
    
}); 

// bookSchema is Schama name 
// bs_book is table name 
module.exports = mongoose.model('bs_books', bookSchema)