
import Navbar from "../Navbar";
import AddContact from "./cards/AddContact";
import CardMap from "./cards/CardMap";

import "../../styles/contact.css"

const Contact = () => {
  return (
    <>
      <Navbar/>
      <AddContact/>
      <section className="contact_body" >
        <CardMap/>
      </section>
    </>
  );
}

export default Contact;