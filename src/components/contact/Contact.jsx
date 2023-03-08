
import CardMap from "./cards/CardMap";
import NotFound from "./cards/NotFound";
import Spinner from "../Spinner";
import AddContactBtn from "./cards/AddContactBtn";

import "../../styles/contact.css";


const Contact = ({contacts , loading}) => {

  return (
    <>

      {loading ?
        null :
        <AddContactBtn />
      }

      {loading ?
        <Spinner /> :
        <section className="contact_body" >
          {contacts.length > 0 ?
            <CardMap persons={contacts} /> :
            <NotFound />
          }
        </section>
      }

    </>
  );
}

export default Contact;