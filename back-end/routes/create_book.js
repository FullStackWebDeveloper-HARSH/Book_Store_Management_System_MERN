const express = require('express');

const router = express.Router();


const Book = require("../models/book");

// below codes are for current date 
const { format } = require('date-fns');   //3
const curd= new Date()   //1
// curd is object of Date()
// format(object, jis_format_me_date_chaiyey)
const today= format(curd,'yyyy-MM-dd')   //2


router.post('/addbook',async(req,res)=>{
    try {
        
            // newBook is object of Book()
    const newBook= new Book({
        // storing data
        // left side book_name is field name given in database.
        // req.body means clint ke through hm jo request bhenge vo yha receive hogi
        // req.body means request ki jo body hai vo uske andr se jo text box ki jo field hai book_name usse bhejne wale hain
        // right side book_name is field of text box 
        // remember book_name, book_author jo hm req.body ke andr rkh rhe hain vo form ke andr jo text box ke name honge vo hain 
        book_name:req.body.book_name,
        book_author:req.body.book_author,
        book_price:req.body.book_price,
        // instalml dependency for data:  npm install date-fns 
        book_publish_date:today
        // status by default enable aa rha hai isily usme koi changes nhi honge
    })

    const saveBook = await newBook.save()
    // ab jo bhi response milega execute hone pr jise hmne saveBook variable save kiya hai usko send kr denge as a json format
    res.json(saveBook)


    } catch (error) {
        console.log(error); 
    }
})



// -> jb bhi mujhe MERN ke andr data ko read krawana hai sbse pehla kaam mujhe ye krna pdega ki mujhe mere server ke andr data ko read krwane ke 
//      liye ek nya root create krna pdega.
// -> aap route ke andr new file create kr skte hain ya fir isifile ke andr kr skte hain. Here we are using this file for another route 

// app.js hai usme change krne ki jrurt nhi hai kyuki hmne /viewbook ka route create krke rkha hua hai i.e. app.use('/api', createBookRouter);
// agr mai nya router create krta to app.js me hme ek aur route create krna pdta 
router.get("/viewbook",async(req,res)=>{
    try {
        // Book is a variable in which we have imported our Model that book.js
        // jaise hmne find() likha hme data mil jayega
        const books = await Book.find()
        // ab jo data mil rha hai usko ab send krna hai 
        res.status(200).json(books)
    } catch (error) {
        // iska matlab hai ki mujhe yha pr kuch error mil rhi hai uss error ko mai as a response form send kr rhe hu, vo mujhe kha pr mil skti hai vo mujhe 
        //      mil skti hai clint ke oopr bhi

        res.status(500).json({"error":error})
    }
})






// creating url to fetch data from database
// /viewbook already diya hai whi yha pr pass kr rhe hain
// same as react we are passing :id 
router.get('/viewbook/:id', async(req,res)=>{
    try {
            // dynamic id which was generated has been stored in :id and params is used to fetch that dynamic id from url
            // Book is a variable in which we have imported our Model that book.js
            const books = await Book.findById(req.params.id)
            res.status(200).json(books)
    } catch (error) {
       res.status(500).json({"error":error}) 
    }
})





// when we want to update data we will use put method 
// id se pta chlega kaun se data ko update krna hai
router.put('/updatebook/:id',async(req,res)=>{
        try {
            // hme kya krna hai hme jo data milega usse update krna hai
            const books = await Book.findByIdAndUpdate(
                // param ke through jo id mil rhi hai vo id ke data ko update krna hai
                // below means data kaun sa update krna hai
                // we can say that params me jo id mil rhi hai is data ko update krna hai
                req.params.id,
                // next is mujhe kaunse data ko update krwana hai
                // req ke through, body ke through jo data milenge un data ko update krwana hai
                // isme jo data hai usse update krna hai
                req.body,
                // new data jo mil rha hai usse true krna hai
                // When you set { new: true }, it means that you want Mongoose to return the modified document rather than the original one. This is useful when you want to get the updated data after performing an update operation.
                {new:true}

               

            )
            // jo data update hua hai usse pass kr rhe hain that is new data jo dala hai
            res.status(200).json(books)
        } catch (error) {
            console.error(error);
        }
})

// to delete data
// agr data ko delete krna hai to jo hmara clint hai uske andr ek link create krni pdegi as well as server ke andr function bnana pdega jo data ko delte kr paye 
router.delete('/deletebook/:id',async(req,res)=>{
    try {
        // delete us record krna hai jiski id mujhe parameter ke through mil rhi hai
        const books= await Book.findByIdAndDelete(req.params.id)
        //sending response
        res.status(200).json(books) 
        // ab hm frontend me jayenge aur ye jo route bna hai usse wha call krenge 
    } catch (error) {
      console.error(error);  
    }
})


module.exports = router


// /updatebook/:id route

// Let's break down the code:

// res.params.id: This looks like a part of an Express.js route handler where params is an object containing parameters in the URL, and id is one of those parameters. It's often used to retrieve the value of a URL parameter, like an identifier for a resource.

// req.body: This represents the body of the HTTP request. In a POST or PUT request, data is often sent in the request body. This line suggests that you're likely using the data from the request body, which is commonly used to update or create a resource in a database.

// { new: true }: This is an option for the findOneAndUpdate or findByIdAndUpdate methods in Mongoose. When you set { new: true }, it means that you want Mongoose to return the modified document rather than the original one. This is useful when you want to get the updated data after performing an update operation.

// In this example, when a PUT request is made to the '/update/:id' endpoint, it will attempt to find the document with the specified ID, update it with the data from the request body, and then send the modified document as the response. The { new: true } option ensures that the response contains the updated document.


