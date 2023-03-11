import React from 'react';


import FormContact from "./contact/form/FormContact";

import "../styles/navbar.css"
import { useLocation } from 'react-router-dom';


const Navbar = ({ filterContacts, query }) => {

  const location = useLocation()

  return (
    <>
      <nav>
        <div className="container">
          <div className="nav_title">
            <p>
              <i className="fas fa-id-badge" />
              وب اپلیکیشن مدیریت {"  "}
              <span>مخاطبین</span>
            </p>
          </div>
          {location.pathname === "/contacts"?
            <div className="form_contact_holder">
            <FormContact query={query} filterContacts={filterContacts} />
            </div>:
            null
          }

        </div>
      </nav>
    </>
  );
}

export default Navbar;