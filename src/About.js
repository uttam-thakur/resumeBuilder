import { useState, useEffect } from "react";
import firebase from "./firebase"
import "firebase/firestore";
import { Link } from "react-router-dom";
import {useRef} from "react"
import { Container, Navbar, Row, Col, Table } from "react-bootstrap";
import AddBook from "./components/AddBook";
// import BooksList from "./components/BooksList";
import {  Modal } from 'antd';

import "./App.css";
import BookDataService from "../src/services/book.services";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  
} from "firebase/firestore";
import { bookCollectionRef } from "../src/services/book.services";
import { Divider, Space, Tag,Button, Checkbox, DatePicker, Input } from "antd";
import { async } from "@firebase/util";
import Main from "./Main";
import View from "./View";


function About({ getBookId }) {
  <Divider orientation="left">Presets</Divider>;

  const aa = {
    style: {
      display: "none",
    },
    style1: {
      color: "red",
    },
  };

  const [bookId, setBookId] = useState("");
  const [books, setBooks] = useState("");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId]= useState({})

  const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');



  useEffect(() => {
    getBooks();
  }, []);

  

  const getBooks = async () => {

    const q = query(bookCollectionRef, orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // console.log("books data",books);


  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = books.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(books)
    }
}

// console.log("filterd books data",filteredResults);



  const getAll = async () => {
    // setShow(true);
    const q = query(bookCollectionRef, orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  };
  const  propData = books;
  // console.log("noomks",propData);


  const getBookss = async () => {
    setShow(true);
    const data = await BookDataService.getAllBooks();
    // console.log(data.docs);
    setBooks(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
    // const q = query(bookCollectionRef, orderBy("createdAt"));
    // const querySnapshot = await getDocs(q);
    // setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // console.log("books",books);

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };
  // console.log(books[0]?.id,"doc id");
  const getBookIdHandler = (id) => {
    // console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };

  const ViewBookId = async(id)=>{
    // console.log("view Doc",id);
    await BookDataService.getBook(id);

  }
  const editHandler=()=>{
   { books?.map((item) =>
    // getBookId(item?.id),
  // getBookId={getBookIdHandler},
  setShow(false)

    )
  }
  getBookId={getBookIdHandler}

  }
  const edit = async(id)=>{
    // console.log("edit Doc",id);
    // await BookDataService.getBook(id);

  }

  const divRef = useRef(null);

    const handlePrintt = () => {
      const printContents = divRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
  
      document.body.innerHTML = printContents;
  
      window.print();
  
      document.body.innerHTML = originalContents;
    };
    const download=(id)=>{
      setUserId({id})
      // console.log(`download ${id}`);
      // const printContents = divRef.current.innerHTML;
      // const originalContents = document.body.innerHTML;
      // document.body.innerHTML = printContents;
      // window.print();
      // document.body.innerHTML = originalContents;
    }

  return (
    <div className="App" id="pagetodownload">
      <div style={{display:userId?.id ? "none":"contents"}}>
       
        <Navbar bg="dark" variant="dark" className="header">

        <input 
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
        </Navbar>

       <div className="mb-2">
          {/* <Button variant="dark edit" onClick={getBooks}>
            See Preview
          </Button>  */}

          <Link to="/">
          <Button variant="dark edit" >
            {/* <About data={books} /> */}
             Back
          </Button>
          </Link>
        </div>
      <Table striped bordered hover size="sm">
      <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {searchInput.length > 1 ? (
                    filteredResults?.map((doc,index) => {
                      return (
                        <>
                      <tr key={doc.id}>
                      <td>{index + 1}</td>
                      <td>{doc.fullName} {doc.lastName}</td>
                      <td>{doc.email}</td>
                      <td>{doc?.status}</td>
                      <td>
                        {/* <Button
                          variant="secondary"
                          className="edit"
                          onClick={(e) => getBookId(doc.id)}
                        >
                          edit
                        </Button> */}
      <Link to={`/view/${doc.id}`}>
                        <Button
                          variant="secondary"
                          className="edit"
                          // onClick={(e) => ViewBookId(doc.id)}
                        >
                          View
                        </Button>
      </Link>
                        <Button
                          variant="secondary"
                          className="edit"
                          onClick={(e) => download(doc.id)}
                          disabled={doc.status==="Draft"}
                        >
                          Download
                        </Button>
      {/* <Link to ={`/addBook/${doc.id}`}>
                        <Button
                          variant="secondary"
                          className="edit"
                          // onClick={(e) => getBookId(doc.id)}
                          onClick={(e) => edit(doc.id)}
                        >
                          Edit
                        </Button>
      </Link> */}
                        <Button  
                          variant="danger"
                          className="delete"
                          onClick={(e) => deleteHandler(doc.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
      
                          {/* <Button onClick={handlePrintt}>print</Button> */}
                        </>
                      );
                    })
                ) : (
                   
                  books?.map &&
                    books?.map((doc, index) => {
                 
                        return (
                          <>
                        <tr key={doc.id}>
                        <td>{index + 1}</td>
                        <td>{doc.fullName} {doc.lastName}</td>
                        <td>{doc.email}</td>
                        <td>{doc?.status}</td>
                        <td>
                          {/* <Button
                            variant="secondary"
                            className="edit"
                            onClick={(e) => getBookId(doc.id)}
                          >
                            edit
                          </Button> */}
        <Link to={`/view/${doc.id}`}>
                          <Button
                            variant="secondary"
                            className="edit"
                            onClick={(e) => ViewBookId(doc.id)}
                          >
                            View
                          </Button>
        </Link>
                          <Button
                            variant="secondary"
                            className="edit"
                            onClick={(e) => download(doc.id)}
                            disabled={doc.status==="Draft"}
                          >
                            Download
                          </Button>
        {/* <Link to ={`/addBook/${doc.id}`}>
                          <Button
                            variant="secondary"
                            className="edit"
                            // onClick={(e) => getBookId(doc.id)}
                            onClick={(e) => edit(doc.id)}
                          >
                            Edit
                          </Button>
        </Link> */}
                          <Button  
                            variant="danger"
                            className="delete"
                            onClick={(e) => deleteHandler(doc.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
        
                            {/* <Button onClick={handlePrintt}>print</Button> */}
                          </>
                        );
                      // }
                    
                    })

                )}

          
        </tbody>
              </Table>

      </div>

      {/* <Modal title="Basic Modal" open={userId?.id}> */}

   <View userId = {userId} setUserId = {setUserId}/>
   {/* </Modal> */}
    </div>
  );

}

export default About;
