import React from 'react';


import FormContact from "./contact/form/FormContact";

import "../styles/navbar.css"


const Navbar = ({query , search}) => {
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
            <div className="form_contact_holder">
              <FormContact query={query} search={search} />
            </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;