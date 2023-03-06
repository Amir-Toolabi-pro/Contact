import React from "react";

//components
import Contact from "./components/contact/Contact";
import Navbar from "./components/Navbar";
import ShowInfoContact from "./components/contact/cards/ShowInfoContact";
import EditContact from "./components/contact/cards/EditContact";

//Router
import { Route, Routes } from "react-router-dom";
import AddContact from "./components/contact/cards/AddContact";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/addContact" element={<AddContact />} />
        <Route path="/showcontact/:contactShowId" element={<ShowInfoContact />} />
        <Route path="/Editcontact/:contactEditId" element={<EditContact />} />
      </Routes>
    </>
  );
};

export default App;
