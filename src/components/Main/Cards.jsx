import React from "react";

const Cards = ({ title, src, cardLoad }) => {
  return (
    <div onClick={()=>{
      cardLoad(title);
    }}
      className="card">
      <p>{title}</p>
      <img src={src} />
    </div>
  );
};

export default Cards;
