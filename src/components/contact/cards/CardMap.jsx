import React from 'react';


import Card from "./Card";

import "../../../styles/cardmap.css"


const CardMap = ({ persons }) => {
  return (
    <>
      <div className="cards_holder">
        {persons.map(c => {
          return <Card contact={c} key={c.id} />
        })}
      </div>
    </>
  );
}

export default CardMap;