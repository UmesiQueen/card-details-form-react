import React, { useEffect, useState } from "react";

import "./Card.css";
import cardLogo from "./images/card-logo.svg";
import amex from "./images/type/amex.svg";
import visa from "./images/type/visa.svg";
import discover from "./images/type/discover.svg";
import mastercard from "./images/type/mastercard.svg";

function CardFront(props) {
  const [cardBgUrl, setCardBg] = useState(null);

  useEffect(() => {
    const number = String(props.number);

    number.startsWith("3")
      ? setCardBg(amex)
      : number.startsWith("4")
      ? setCardBg(visa)
      : number.startsWith("5")
      ? setCardBg(mastercard)
      : number.startsWith("6")
      ? setCardBg(discover)
      : setCardBg(null);

    // 3 (AMEX), 4 (Visa), 5 (MasterCard), or 6 (Discover).
  }, [props.number]);

  const style = {
    backgroundImage: "url(" + cardBgUrl + ")",
    width: "3.5em",
  };

  return (
    <div className="card-front">
      <div>
        <img 
        src={cardLogo}
        alt="card-logo"
        readOnly={true}
        width="70px" 
        />
        <div className="card-type" style={cardBgUrl && style}></div>
      </div>

      <div>
        <input
          type="text"
          name="number"
          placeholder="0000 0000 0000 0000"
          value={props.number}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="JANE APPLESEED"
            value={props.name}
          />
          <ul style={{ display: "flex", alignItems: "center" }}>
            <li>
              <input type="text" name="mm" placeholder="00" value={props.mm} />
            </li>
            <li style={{ color: "white", fontSize: "13px" }}>/</li>
            <li>
              <input type="text" name="yy" placeholder="00" value={props.yy} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardFront;
