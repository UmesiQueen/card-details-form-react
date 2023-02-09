import React from "react";

function Input(props) {
  const style = {
    label: {
      margin: ".5em 0",
      color: "hsl(278, 68%, 11%)",
      fontWeight: "600",
      letterSpacing: "1px",
      fontSize: "14px",
      textTransform: "uppercase",
    },
    div: {
      display: "flex",
      flexDirection: "column",
      margin: "5px 0",
    },
  };

  const { header, name, error, ...propsValue } = props;

  return (
    <div style={style.div}>
      <label style={style.label}>
        {header}
      </label>
      <input
        type="text"
        required={true}
        name={name}
        {...propsValue}
      />
      <p className="error">{error}</p>
    </div>
  );
}

export default Input;
