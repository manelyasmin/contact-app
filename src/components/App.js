import React,{useState,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import api from "../api/contacts";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import UpdateContact from "./UpdateContact";
function App() {
  const [contacts,setContacts]=useState([]);
  const LOCAL_STORAGE_KEY="contacts";
  const [searchTerm,setSearchTerm]=useState("");
  const[searchResult,setSearchResult]=useState([]);
  const addContactHandler= async(contact) => {
   const request={
     id:uuidv4(),
     ...contact
   }


   const response=await api.post("/contacts",request);
  setContacts([...contacts,response.data]);
  /*   setContacts([...contacts, { id:uuidv4() , ...contact}]);
    console.log(contact) */
  }

const searchHandler=(searchTerm)=>{
  setSearchTerm(searchTerm);
  if(searchTerm!=="") {
    const newContactList=contacts.filter(
      
      (contact)=>{
        
      return Object.values(contact)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      }
    )
    setSearchResult(newContactList)
  }
  else{
    setSearchResult(contacts)
  }
}
  const updateContactHandler=async(contact)=>{
    const response=await api.put(`/contacts/${contact.id}`,contact);
    const {id,name,email}=response.data;
    setContacts(
      contacts.map((contact)=>{
return contact.id=== id ? {...response.data} :contact
    })
    );
  };

  const removeContactHandler=async (id)=>{
    await api.delete(`/contacts/${id}`);
    const newContactList=contacts.filter((contact) =>{
        return contact.id !== id ;
      }
    )
  setContacts(newContactList);
  }
//retriee contacts
const retrieveContacts=async()=>{
  const response=await api.get("/contacts");
  return response.data;

}

  useEffect(()=>{
/*     const retriveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveContacts) setContacts(retriveContacts)
 */
 const getAllContacts=async()=>{
   const allContacts=await retrieveContacts();
   if(allContacts) setContacts(allContacts)
 }
 getAllContacts();
  },[]);



   useEffect(()=>{
    //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));

  },[contacts])
  

 
 

  return (
    <div className="ui container">
     
      <Router>
      {/* <Header/>
       */}<Routes>
      <Route path="/" exact 
      element={<ContactList  
      contacts={searchTerm.length<1 ? 
      contacts : searchResult} 
      getContactId={removeContactHandler} 
      term={searchTerm} searchKeyword={searchHandler}/>}></Route>
     
       <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>}></Route>
       <Route path="/contact/:id" element ={<ContactDetail/>}/>
      
      <Route path="/edit"  element={<UpdateContact  updateContactHandler={updateContactHandler} />}></Route>
     
      </Routes>

      </Router>
  </div>
  );
}

export default App;

