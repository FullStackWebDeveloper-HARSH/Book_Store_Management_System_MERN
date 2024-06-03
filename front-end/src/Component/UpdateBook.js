 import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

 
 const UpdateBook=()=>
{
// {/* //  In Node.js, "params" typically refers to the parameters passed to a route handler.
//  When you create a route handler in Node.js, you can define parameters to accept values
//  the route is accessed.          */}

//     {/* App.js me jo name pass kiya hai whi name yha pr dena hai that is bid */}

//   bid ko yha laa rhe hain app.js se Update.js me 
//   isse aakpi jo bhi id hai vo yha pr mil jayegi
         const {bid} = useParams();

// form submit krne ke bad hm redirect or we can say that we want to nevigate to the display page 
// created variable for navigation
        const navigate= useNavigate();

         const formFieldSet=
         {
                 width:'300px',
                 padding:'10px',
                 margin:'auto',
                 borderRadius:'10px'
         }
         



         const[bookData, setBookData] = useState({
            // useState ka name kaise rkhna hai, jo aapne textbox ka name diya hai waisa hi same name yha de dedo jisse aapka kaam aasan ho jaye
        
              'book_name':'',
              'book_author':'',
              'book_price':''
        
        })
        
        //now jb textbox ke andr kuch type kre uski value change hoke is particuler useState ke andr store honi chaiyey
        // it is event thats why passing e as a object
        const handleInputChange=(e)=>{
            // jo bhi event jha bhi call ho rhi hai, like event agr call ho rhi hai first text box ke andr uska name agr hai  book_name, to name ke 
            // oopr uski value aa jayegi, aur uske arde jo bhi type krunga uski value, value ke andr store ho jayegi
            const {name,value} = e.target;
        
            // ab ye jo bhi data aa rha hai usse set krna hai
            setBookData({
                //isse kya ho jayega, aapki jo bhi value hai agr aapka book name mil rha hai name ke andr to uski jo value hai vo useState me defined("book_name:''") me save ho jayegi. 
                // Same above described logic is used for book_author and book_price
                // ab hme is function ko call krana hai..we will call in input using onChange event 
                ...bookData,
                [name]:value
            });
        }
    
// to fetch data from back end we are using useEffect 
//  res.status(200).json(books)  ... isse json format me data send kiye hain front-end ko now using useEffect to fetch that data 
useEffect(()=>{
        // fetching data with the help of axios
        // using get method because server me bhi get method use kre hain 
        // ${bid} passing id...now route has completely become dynamic
        axios.get(`http://localhost:5000/api/viewbook/${bid}`).then(response=>{
                    //   jo response milege usse setBookData ke andr store kra rhe hain
                    setBookData({
                        ...bookData,
                        'book_name':response.data.book_name,
                        'book_author':response.data.book_author,
                        'book_price':response.data.book_price
        
                    })
        }).then(error=>{
            console.log(error);
        })
},[])

const handleFormSubmit=async(e)=>{
    // jo bhi default hoga usse prevent krna hai
        e.preventDefault();
        try {
            // response is variable 
            // bookData jo mil rha hai usse is url me post kr rhe hain
            const response = await axios.put(`http://localhost:5000/api/updatebook/${bid}`,bookData) 
            // iske bad hme response milega..to response me jo data milega usse print kra rhe hain
            console.log(response.data)

            // useState ke andr hme jo bhi data mil rha hai usse clear kr rhe hain taki saare text boxes ki value clear ho jayegi
            setBookData({
                'book_name':'',
                'book_author':'',
                'book_price':''

            })
            // navigate krke /books url wale page me jana chahte hain
      navigate('/books')
        } catch (error) {
            console.error(error); 
        }
}

    return(
        <>

      {/* Check krna hai ki ye id mil rhi hai ki nhi we are checking*/}
      {/* <div>  {bid} </div>  */}

      <fieldset style={formFieldSet}>
                <legend>Update Book</legend>
                    <tr>
                        <td>Book Name</td>
                        <td>
                            <input type="text" name="book_name" value={bookData.book_name} onChange={handleInputChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Book Author</td>
                        <td>
                            <input type="text" name="book_author" value={bookData.book_author} onChange={handleInputChange}/>
                        </td>
                    </tr>

                    <tr>
                        <td>Book Price</td>
                        <td>
                            <input type="text" name="book_price" value={bookData.book_price} onChange={handleInputChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center">
                            < input type="button" value={"Update Book"} name="AddBook" onClick={handleFormSubmit}/>
                        </td>
                    </tr>

                

            </fieldset>

        </>
    );
 }
 export default UpdateBook;
// ab ye jo form bn gya hai isme ab data lana hai..iske liye hmara jo form bna hua hai usme data ko fetch krana hai jo hmko backend se lana pdega. so go to backend create_book.js(we are doing route related work in this single file)

