import React from 'react';


import "../../../styles/card.css"

import { useNavigate } from "react-router-dom";

import prof from "../../../images/img-placeholder.png"


const Card = ({contact , removeContact}) => {

  const navigate = useNavigate()

  return (
    <>
      <div className="card">
        <div className="cardbody">
          <div className="imgcard">
            <img src={contact.photo || prof} alt="" />
          </div>
          <div className="infocard">
            <ul>
              <li>نام و نام خانوادگی: {contact.fullname}</li>
              <li>شماره تماس: {contact.mobile}</li>
              <li>آدرس ایمیل: {contact.email}</li>
            </ul>
          </div>
          <div className="btnscard">
            <button onClick={()=> navigate(`/${contact.id}`) } className="showInfo" ><i className="fa fa-eye" /></button>
            <button  onClick={()=> navigate(`/Editcontact/${contact.id}`) } className="editInfo" ><i className="fa fa-pen" /></button>
            <button onClick={removeContact} className="deleteInfo" ><i className="fa fa-trash" /></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;