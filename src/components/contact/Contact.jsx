
import Navbar from "../Navbar";
import AddContact from "./cards/AddContact";
import CardMap from "./cards/CardMap";

import "../../styles/contact.css"
import { useState } from "react";
import NotFound from "./cards/NotFound";
import Spinner from "../Spinner";

const Contact = () => {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar />

      {loading ?
        undefined :
        <AddContact />
      }

      {loading ?
        <Spinner /> :
        <section className="contact_body" >
          {contacts.length > 0 ?
            <CardMap /> :
            <NotFound />
          }
        </section>
      }

    </>
  );
}

export default Contact;