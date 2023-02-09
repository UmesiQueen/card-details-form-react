import React from "react";

function Button(props) {
  const buttonStyle = {
    backgroundColor: "hsl(278, 68%, 11%)",
    height: "3em",
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight:"500",
    fontSize:"18px",
    letterSpacing:"1px",
    color: "white",
    textAlign: "center",
    border:"none",
    width: "100%",
    borderRadius: "5px",
    margin:"20px 0 10px",
    cursor:"pointer",
    alignSelf:" center"

  };
  return (
    <button
      style={buttonStyle}
      type="submit"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
