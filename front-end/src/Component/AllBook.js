// component to display data

import { useEffect, useState } from "react";
import axios from 'axios';

 const AllBook=()=>
{
    // using empty array because ab hmare paas multiple data fetch hoke aane wala hai us data ko hme display krana hai
    //useState me hm data store krate hain
    const[bookData, setBookData]=useState([]);

    // taking useEffect because we want to fetch data 
    // taking array as dependency beacause jo data fetch krenge vo array form me ayega 
    useEffect(()=>{
        getbook();
    },[]) 

    const getbook=async()=>{
              // then function data lane me help krega 
              axios.get('http://localhost:5000/api/viewbook').then((response)=>{
                // ab hme jo bhi data mil rha hai usse hme setBookData ke andr set krana hai
                // yha pr hme response mil rha hai aur uske andr data hai
                setBookData(response.data);
            }).then(error=>{
                console.error(error);
            })
            // hmare pass ab data aa chuka hai ab is data ko hme display krana hai

}
// hmne router me delete method bnaya hai usme /deletebook nam ka route create kiya hai uske oopr id pass kra rhe hain..aur id kha se milegi vo id mujhe jo axios me dynamic id pass kr rhe hain vo id backend me jayegi aur jise params ke through fetch krenge 
const deletebook =async(id)=>{
    axios.delete(`http://localhost:5000/api/deletebook/${id}`)
    // jb ,ai is tarike se mai data ko delete krau to vapas bhi mujhe data lana hai..so jo method bnai hui hai getbook() usko yha call krayenge 
    getbook();

}


    return(
        <>
             {/* displaying data */}
             <div>
                <h1>All Books</h1>
                {/* fetching data inside the table */}
                <table border={1} width={"600px"}>
                    <tr>
                        <td>Boook Name</td>
                        <td>Boook Author</td>
                        <td>Boook Price</td>     
                        <td colSpan={2}>Action</td>                   
                    </tr>
                    {/*hmne jo data bookdata ke andr fetch kra ke rkhe hain usko yha pr lana hai  */}
                    {
                        // books is a variable passed in map function
                        bookData.map(books=>(
                            <tr>

                                <td>{books.book_name}</td>
                                <td>{books.book_author}</td>
                                <td>{books.book_price}</td>

                                {/* here we are doing update data work */}
                                <td>
                                    {/* hme yha se particular location ke andr jana hai i.e. ek route ke oopr jana hai */}
                                    {/* we will create dynamic route so that data must get update */}
                                    {/* updatebook: This could be a route or an endpoint on the server (Express.js) that handles updating book information in the MongoDB database. */}
                                    {/* ${books._id}: In a MERN stack, books._id is likely the unique identifier (usually an ObjectId) of a specific book in the MongoDB database. */}
                                    {/* Putting them together, updatebook/${books._id} could be part of a URL that is used to send a request from the React front end to the Express.js back end to update a specific book. For example, if books._id is "123", the resulting URL might be something like /updatebook/123. */}
                                    {/* ab mujhe kya krna hai jb bhi mai is link ke oopr click kru to ek form bnana chaiyey..jiske oopr data display hona chaiyey..for that jaise hmne registration ka page bnaya tha vaise hi update ka page bnayenge  */}
                                    {/* This will generate dynamic id */}
                                    <a href={`updatebook/${books._id}`}>Edit</a>
                                </td>


                                <td>
                                   <a href='#' onClick={()=>deletebook(books._id)}>Delete</a>
                                </td>
                            </tr>
                        ))
                    }
                </table>

             </div>
        </>
    );
 }
 export default AllBook;

//  hmara data display ho rha hai, now what we want is want edit button, us edit ke button ke oopr mai click kru to
//      purana data ek form ke andr display ho and then hme us data ko update krna hai.