import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateBook from "./Component/CreateBook";
import AllBook from './Component/AllBook';
import UpdateBook from './Component/UpdateBook';

const App=()=>
{
    return(
        <>
          <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<CreateBook/>} />
{/* now what we want is when we write /book in url theb all books should get displayed that is what we want */}
           <Route exact path='/books' element={<AllBook/>} />

           {/* ${books._id} this will generate dynamic id */}
           {/* dynamic id jo generate hui hai ${books._id} isse vo url me :bid ke through aa rhi hai */}
           {/* and 'params' keyword is used to fetch this dynamic id from url....(go to UpdateBook.js component there we are fetching this dynamically generated id)*/}

           {/* hmari jo bhi id dynamic hone wali hai vo bid me store krwa skta hu */}
           <Route exact path='/updatebook/:bid' element={<UpdateBook/>} />
           {/* ab bid ko UpdateBook.js me le jana hai  */}

          </Routes>
          </BrowserRouter>
        </>
    );
 }
 export default App;