import React, { useEffect, useState } from "react";

//components
import Contact from "./components/contact/Contact";
import Navbar from "./components/Navbar";
import ShowInfoContact from "./components/contact/cards/ShowInfoContact";
import EditContact from "./components/contact/cards/EditContact";

//Router
import { Route, Routes, useNavigate } from "react-router-dom";
import AddContact from "./components/contact/cards/AddContact";

//axios
import { getAllContacts, getAllGroups, createContact } from "./services/contactServices";

const App = () => {

  const [contacts, setContacts] = useState([]);
  const [getGroups, setGetGroups] = useState([]);
  const [getContact, setGetContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        setContacts(contactsData);
        // console.log(contacts);
        setGetGroups(groupData);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const setContactInfo = (event) => {
    setGetContact({ ...getContact, [event.target.name]: event.target.value,});
  };

  const createContactForm = async (e)=> {
    e.preventDefault();
      try{
        const {status} = await createContact(getContact);
        console.log(status);
        console.log(getContact);
        if (status === 201){
          navigate("/")
        }
      }catch(err){
        console.log(err);
      }
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Contact contacts={contacts} loading={loading} />}
        />
        <Route path="/addContact" element={<AddContact createContactForm={createContactForm} groups={getGroups} setContactInfo={setContactInfo} contact={getContact} />} />
        <Route
          path="/showcontact/:contactShowId"
          element={<ShowInfoContact />}
        />
        <Route path="/Editcontact/:contactEditId" element={<EditContact />} />
      </Routes>
    </>
  );
};

export default App;
