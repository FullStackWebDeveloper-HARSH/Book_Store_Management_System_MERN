const mongoose = require('mongoose');
// creating database of of bookstore
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")


//to check whether databse is connected or not
// if connected then arrow function will run 
mongoose.connection.on('connected',()=>{
    console.log("Connected to mongoDB");
})
// If error will come then below code will run
mongoose.connection.on('error',(err)=>{
    console.err("Connection Error", err);
})



module.exports = mongoose;