
import Navbar from "../Navbar";
import AddContact from "./cards/AddContact";
import CardMap from "./cards/CardMap";

import "../../styles/contact.css"
import { useState } from "react";
import NotFound from "./cards/NotFound";

const Contact = () => {

  const [contacts , setContacts] = useState([])

  return (
    <>
      <Navbar/>
      <AddContact/>
      <section className="contact_body" >
        {contacts.length > 0 ?
          <CardMap/> :
          <NotFound/>
        }
        
      </section>
    </>
  );
}

export default Contact;