import React from "react";

import "./Card.css";

function CardFront(props) {
  const inputs = [
    {
      id: 1,
      name: "name",
      placeholder: "JANE APPLESEED",
      value: props.name,
    },
    {
      id: 2,
      name: "number",
      placeholder: "0000 0000 0000 0000",
      value: props.number,
    },
    {
      id: 3,
      name: "mm",
      placeholder: "00",
      value: props.mm,
    },
    {
      id: 4,
      name: "yy",
      placeholder: "00",
      value: props.yy,
    },
  ];

  return (
    <div className="card-front">
      <img src="/images/card-logo.svg" alt="card-logo" className="logo" readOnly={true}/>
      {inputs.map((input) => {
        return <input key={input.id} {...input} />;
      })}
      <span>/</span>
    </div>
  );
}

export default CardFront;
