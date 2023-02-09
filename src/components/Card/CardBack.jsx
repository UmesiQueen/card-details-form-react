import React from "react";

import "./Card.css";

function CardBack(props) {
  const { cvc } = props;
  return (
    <div className="card-back">
      <input
        key={5}
        name="cvc"
        placeholder="000"
        value={cvc}
        readOnly={true}
      />
    </div>
  );
}

export default CardBack;
