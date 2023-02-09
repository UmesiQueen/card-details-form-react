import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";

import "./Form.css";

function Form(props) {
  const initialValues = {
    name: "",
    number: "",
    mm: "",
    yy: "",
    cvc: "",
  };
  const [formValues, setValues] = useState(initialValues);
  const [isValid, setValid] = useState(false);
  const [submitClicked, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [focus, setFocus] = useState({});

  // send props to card onChange in App.js
  useEffect(() => {
    props.onChange(formValues);
  });

  // onSubmit click
  useEffect(() => {
    if (Object.keys(errorMsg).length === 0 && submitClicked) {
      setValid(true);
    }
  }, [errorMsg, submitClicked]);

  // input props
  const inputs = [
    {
      id: 1,
      name: "name",
      header: "Cardholder Name",
      placeholder: "e.g. Jane Appleseed",
      maxLength: 22,
      error: errorMsg.name,
      focus: focus.name,
    },
    {
      id: 2,
      name: "number",
      header: "Card Number",
      placeholder: "e.g. 1234 5678 9123 0000",
      maxLength: 19,
      error: errorMsg.number,
      focus: focus.number,
    },
  ];

  const dateCVC = [
    {
      id: 3,
      name: "mm",
      header: "EXP.DATE (MM/YY)",
      placeholder: "MM",
      maxLength: 2,
      error: errorMsg.expiry,
      focus: focus.expiry,
    },
    {
      id: 4,
      name: "yy",
      header: "YY",
      placeholder: "YY",
      maxLength: 2,
      focus: focus.expiry,
    },
    {
      id: 5,
      name: "cvc",
      header: "CVC",
      placeholder: "e.g. 123",
      maxLength: 3,
      error: errorMsg.cvc,
      focus: focus.cvc,
    },
  ];

  // validate input
  const validateForm = (formValues) => {
    let errors = {};
    let focus = {};
    const { name, number, mm, yy, cvc } = formValues;

    if (name.length <= 0) {
      errors.name = "Can't be blank";
      focus.name = "true";
    }

    //number validation
    if (number.length < 13) {
      errors.number = "Invalid card number";
      focus.number = "true";
    }
    let type = [3, 4, 5, 6]; // The card number doesn’t start with a 3 (AMEX), 4 (Visa), 5 (MasterCard), or 6 (Discover).
    if (!type.some((num) => number.startsWith(num))) {
      errors.number = "No such issuer";
      focus.number = "true";
    }
    if (number.length < 1) {
      errors.number = "Can't be blank";
      focus.number = "true";
    }

    // cvc validation
    if (cvc.length < 3) {
      errors.cvc = "Wrong format, must be 3 digits";
      focus.cvc = "true";
    }
    if (cvc.length < 1) {
      errors.cvc = "Can't be blank";
      focus.cvc = "true";
    }

    //date validation
    if (Number(mm) < 1 || Number(mm) > 12) {
      errors.expiry = "Invalid date";
      focus.expiry = "true";
    }

    const date = new Date();
    let currentMM = date.getMonth() + 1;
    let currentYY = String(date.getFullYear()).slice(2);

    if (Number(mm) < currentMM || Number(yy) < Number(currentYY)) {
      // check
      errors.expiry = "Expired card";
      focus.expiry = "true";
    }

    if (mm.length < 1 || yy.length < 1) {
      errors.expiry = "Can't be blank";
      focus.expiry = "true";
    }

    return { errors, focus };
  };

  // const validateForm = (e) => {
  //   let errors = {};
  //   let focus = {};
  //   const { name, value } = e.target;

  //   switch (name) {
  //     case "name":
  //       if (value.length <= 0) {
  //         errors.name = "Can't be blank";
  //         focus.name = "true";
  //       }
  //       break;
  //     case "number":
  //       //number validation
  //       if (value.length < 13) {
  //         errors.number = "Invalid card number";
  //         focus.number = "true";
  //       }
  //       let type = [3, 4, 5, 6]; // The card number doesn’t start with a 3 (AMEX), 4 (Visa), 5 (MasterCard), or 6 (Discover).
  //       if (!type.some((num) => value.startsWith(num))) {
  //         errors.number = "No such issuer";
  //         focus.number = "true";
  //       }
  //       if (value.length < 1) {
  //         errors.number = "Can't be blank";
  //         focus.number = "true";
  //       }
  //       break;
  //     case "mm":
  //       if (Number(value) < 1 || Number(value) > 12) {
  //         errors.expiry = "Invalid date";
  //         focus.expiry = "true";
  //       }
  //       break;
  //     case "yy":
  //       break;
  //     case "cvc":
  //       // cvc validation
  //       if (value.length < 3) {
  //         errors.cvc = "Wrong format, must be 3 digits";
  //         focus.cvc = "true";
  //       }
  //       if (value.length < 1) {
  //         errors.cvc = "Can't be blank";
  //         focus.cvc = "true";
  //       }
  //       break;

  //     default:
  //       break;
  //   }

  //   //date validation

  //   // const date = new Date();
  //   // let currentMM = date.getMonth() + 1;
  //   // let currentYY = String(date.getFullYear()).slice(2);

  //   // if (Number(mm) < currentMM || Number(yy) < Number(currentYY)) {
  //   //   // check
  //   //   errors.expiry = "Expired card";
  //   //   focus.expiry = "true";
  //   // }

  //   // if (mm.length < 1 || yy.length < 1) {
  //   //   errors.expiry = "Can't be blank";
  //   //   focus.expiry = "true";
  //   // }

  //   return { errors, focus };
  // };

  // Set formValues on change
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...formValues,
      [name]:
        name === "number" && value.length > 0
          ? (e.target.value = formatNumber(value))
          : name === "mm" || name === "yy"
          ? String(value).padStart(2, "0")
          : value, //check better way to do this
    });
  };

  //Format Number after every 4 digits
  const formatNumber = (value) => {
    return String(value)
      .match(/.{1,4}/g)
      .join(" ");
  };

  // Accept only digits onInput
  const patternRegex = (e) => {
    const { name, value } = e.target;
    name !== "name" && (e.target.value = value.replace(/[^0-9+]/g, ""));
  };

  const propMethods = {
    onChange: handleChange,
    onInput: patternRegex,
  };

  return (
    <div className="form">
      <form
        onSubmit={(e) => {
          setSubmit(true);
          const { errors, focus } = validateForm(formValues);
          setErrorMsg(errors);
          setFocus(focus);
          e.preventDefault();
        }}
        noValidate={true}
      >
        {!isValid ? (
          <div>
            {inputs.map((input) => {
              return <Input key={input.id} {...input} {...propMethods} />;
            })}
            <div className="grid-container">
              {dateCVC.map((input) => {
                return <Input key={input.id} {...input} {...propMethods} />;
              })}
            </div>
            <Button text="Confirm" />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img src="/images/icon-complete.svg" alt="icon-complete" />
            <h1
              style={{
                textTransform: "uppercase",
                color: "hsl(278, 68%, 11%)",
                margin: ".5em 0",
              }}
            >
              Thank You!
            </h1>
            <p style={{ color: " hsl(279, 6%, 55%)", marginBottom: "1em" }}>
              We've added your card card details
            </p>
            <Button
              text="Continue"
              onClick={() => {
                setValid(false);
                setSubmit(false);
                setValues(initialValues);
                setErrorMsg({});
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;
