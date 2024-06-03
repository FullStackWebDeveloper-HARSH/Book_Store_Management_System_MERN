const express= require('express');
const bodyParser =require('body-parser');
const cors = require('cors');


const db= require('./Database/db')

// route ko add kr rhe hain app.js ke andr taki route execute ho paye 
// importing before execution of expeess
const createBookRouter = require('./routes/create_book')


// writing because our app will  create inside express
const app = express();

// jo bhi data hai use json format ke convert krne ka kaam krega 
app.use(bodyParser.json());

app.use(cors());


// creating route 
app.use('/api', createBookRouter);

// creating port
const port= process.env.PORT || 5000


app.listen(port,()=>{
    console.log(`Server running on - http://localhost:${port}`);
})