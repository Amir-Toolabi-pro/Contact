import React from 'react';

//style
import "../../../styles/formcontact.css"

const FormContact = ({filterContacts , query}) => {
  return (
    <>
      <form className="form_nav" dir="ltr" >
        <span className="input-group-text " id="basic-addon1" >
          <i className="fas fa-search" />
        </span>
        <input value={query} onChange={filterContacts} className="form-control" type="text" dir="rtl" placeholder="جستوجو مخاطب" aria-label="search" aria-describedby="basic-addon1" />
      </form>
    </>
  );
}

export default FormContact;