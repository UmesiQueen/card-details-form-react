import React from "react";

import CardBack from "./CardBack";
import CardFront from "./CardFront";
import "./Card.css";

function Card(props) {
  return (
    <div className="card">
      <CardBack cvc={props.cvc} />
      <CardFront {...props} />
    </div>
  );
}

export default Card;
