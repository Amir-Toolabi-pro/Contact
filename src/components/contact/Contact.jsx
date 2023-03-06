
import CardMap from "./cards/CardMap";

import "../../styles/contact.css"
import { useState } from "react";
import NotFound from "./cards/NotFound";
import Spinner from "../Spinner";
import AddContactBtn from "./cards/AddContactBtn";

const Contact = () => {

  const [contacts, setContacts] = useState([1]);
  const [loading, setLoading] = useState(false);

  return (
    <>

      {loading ?
        undefined :
        <AddContactBtn />
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