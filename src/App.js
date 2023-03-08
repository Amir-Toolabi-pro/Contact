import React, { useEffect, useState } from "react";

//components
import Contact from "./components/contact/Contact";
import Navbar from "./components/Navbar";
import ShowInfoContact from "./components/contact/cards/ShowInfoContact";
import EditContact from "./components/contact/cards/EditContact";

//Router
import { Route, Routes } from "react-router-dom";
import AddContact from "./components/contact/cards/AddContact";

//axios
import axios from "axios";


const App = () => {

  const [contacts, setContacts] = useState([]);
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{

    const fetchData = async ()=>{

      try{
        setLoading(true);

        const {data: contactsData} = await axios.get("http://localhost:9000/contacts");
        const {data: groupData} = await axios.get("http://localhost:9000/groups");
        setContacts(contactsData);
        // console.log(contacts);
        setGroup(groupData);
        
        setLoading(false);
      }catch(err){
        console.log(err);
        setLoading(false);
      }

    }
    fetchData();

  },[]);


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Contact contacts = {contacts} loading = {loading} />} />
        <Route path="/addContact" element={<AddContact />} />
        <Route path="/showcontact/:contactShowId" element={<ShowInfoContact />} />
        <Route path="/Editcontact/:contactEditId" element={<EditContact />} />
      </Routes>
    </>
  );
};

export default App;
