import React from 'react';


import Card from "./Card";

import "../../../styles/cardmap.css"


const CardMap = ({ persons , confirmAlertModal }) => {
  return (
    <>
      <div className="cards_holder">
        {persons.map(c => {
          return <Card confirmAlertModal={() => confirmAlertModal(c.id , c.fullname)} contact={c} key={c.id} />
        })}
      </div>
    </>
  );
}

export default CardMap;