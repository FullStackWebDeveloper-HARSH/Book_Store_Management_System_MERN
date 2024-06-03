// design create kiye 
// useState ko initial value assign kiya 
// then handleInputChange() bnaya then onChange() event me call kra diya 
// install axios 
// create handleForm() and calling in event onClick() in button


import {useState} from 'react';
import axios from 'axios';



const CreateBook=()=>
{
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
    

const handleFormSubmit=async(e)=>{
    // jo bhi default hoga usse prevent krna hai
        e.preventDefault();
        try {
            // response is variable 
            // bookData jo mil rha hai usse is url me post kr rhe hain
            const response = await axios.post('http://localhost:5000/api/addbook',bookData) 
            // iske bad hme response milega..to response me jo data milega usse print kra rhe hain
            console.log(response.data)

            // useState ke andr hme jo bhi data mil rha hai usse clear kr rhe hain taki saare text boxes ki value clear ho jayegi
            setBookData({
                'book_name':'',
                'book_author':'',
                'book_price':''

            })

        } catch (error) {
            console.error(error); 
        }
}

    return(
        <>
           <div>
            <fieldset style={formFieldSet}>
                <legend>Add Book</legend>
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
                            < input type="button" value={"Add Book"} name="AddBook" onClick={handleFormSubmit}/>
                        </td>
                    </tr>

                

            </fieldset>
           </div>
        </>
    );
 }
 export default CreateBook;

//istall kr rhe hain that is axios dependency ko kisi bhi api ko call krne ke liye use hogi

//  jb mai click krta hu button ke oopr  tb mera data jana chaiyey..lekin vo data kis ke oopr jana chaiyey ek particular url ke oopr 
// uske liye mujhe istall krna pdega axios using command: npm install axios 








//  const App=()=>
// {
//     return(
//         <>
//            <h1>Welcome to my Page</h1>
//         </>
//     );
//  }
//  export default App;