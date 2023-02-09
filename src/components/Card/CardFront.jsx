import React, { useEffect, useState } from "react";

import "./Card.css";

function CardFront(props) {
  const [cardBgUrl, setCardBg] = useState({});

  useEffect(() => {
    const number = String(props.number);

    number.startsWith("3")
      ? setCardBg({
          backgroundImage: "url('/images/card/amex.svg')",
          width: "3.5em",
        })
      : number.startsWith("4")
      ? setCardBg({
          backgroundImage: "url('/images/card/visa.svg')",
          width: "3.5em",
        })
      : number.startsWith("5")
      ? setCardBg({
          backgroundImage: "url('/images/card/mastercard.svg')",
          width: "3.5em",
        })
      : number.startsWith("6")
      ? setCardBg({
          backgroundImage: "url('/images/card/discover.svg')",
          width: "3.5em",
        })
      : setCardBg({});

    // 3 (AMEX), 4 (Visa), 5 (MasterCard), or 6 (Discover).
  }, [props.number]);

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
      <img
        src="/images/card-logo.svg"
        alt="card-logo"
        className="logo"
        readOnly={true}
      />

      <div className="card-type" style={cardBgUrl}></div>
      {inputs.map((input) => {
        return <input key={input.id} {...input} />;
      })}
      <span>/</span>
    </div>
  );
}

export default CardFront;
