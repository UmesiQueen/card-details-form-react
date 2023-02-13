import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../Button/Button";

import "./Form.css";
import completeIcon from "./images/icon-complete.svg";

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
  const [isSubmitted, setSubmitted] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Can't be blank"),
    number: yup
      .string()
      .required("Can't be blank")
      .matches(/^[3456]/, "No such Issuer")
      .min(13, "Invalid card number"),
    mm: yup
      .string()
      .required("Can't be blank")
      .matches(/^(0?[1-9]|1[012])$/, "Invalid date format"),
    yy: yup.string().required("Can't be blank").min(2, "Invalid date format"),
    cvc: yup
      .string()
      .required("Can't be blank")
      .min(3, "Wrong Format, must be 3 digits"),
  });
  // add expired card method

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) });

  //Reset to default values
  useEffect(() => {
    if (isSubmitted) {
      reset();
      setSubmitted(false);
    }
    //clear all errors
  }, [reset, isSubmitted]);

  useEffect(() => {
    props.onChange(formValues);
  });

  //getValues
  useEffect(() => {
    const subscription = watch((value, name) => {
      setValues({
        ...value,
        [name]: value,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Accept only digits onInput
  const patternRegex = (e) => {
    const { name, value } = e.target;
    name !== "name" && (e.target.value = value.replace(/[^0-9+]/g, ""));
  };

  const submit = () => {
    setValid(true);
  };

  const style = {
    div: {
      display: "flex",
      flexDirection: "column",
      margin: "5px 0",
    },
  };

  return (
    <div className="form">
      {!isValid ? (
        <form onSubmit={handleSubmit(submit)} noValidate={true}>
          <div style={style.div}>
            <label htmlFor="name">Cardholder Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g. Jane Appleseed"
              maxLength={22}
              {...register("name")}
              className={errors.name ? "invalid" : ""}
            />
            <p className="error">{errors.name?.message}</p>
          </div>

          <div style={style.div}>
            <label htmlFor="number">Card Number</label>
            <input
              type="text"
              name="number"
              id="number"
              placeholder="e.g. 1234 5678 9123 0000"
              maxLength={19}
              onInput={(e) => {
                patternRegex(e);
                e.target.value = e.target.value
                  .replace(/(\d{4})/g, "$1 ")
                  .trim();
              }}
              {...register("number")}
              className={errors.number ? "invalid" : ""}
            />
            <p className="error">{errors.number?.message}</p>
          </div>

          <div className="grid-container">
            <div style={style.div}>
              <label htmlFor="mm">Exp.Date (MM/YY)</label>
              <div className="expiry">
                <input
                  type="text"
                  name="mm"
                  id="mm"
                  placeholder="MM"
                  maxLength={2}
                  onInput={patternRegex}
                  {...register("mm")}
                  className={errors.mm ? "invalid" : ""}
                />

                <input
                  type="text"
                  name="yy"
                  id="yy"
                  placeholder="YY"
                  maxLength={2}
                  onInput={patternRegex}
                  {...register("yy")}
                  className={errors.yy ? "invalid" : ""}
                />
              </div>

              {/* on error for two */}
              <p className="error">
                {errors.mm?.message || errors.yy?.message}
              </p>
            </div>

            <div style={style.div}>
              <label htmlFor="cvc">cvc</label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                placeholder="e.g. 123"
                maxLength={3}
                onInput={patternRegex}
                {...register("cvc")}
                className={errors.cvc ? "invalid" : ""}
              />
              <p className="error">{errors.cvc?.message}</p>
            </div>
          </div>
          <Button text="Confirm" />
        </form>
      ) : (
        <form style={{ alignItems: "center" }}>
          <img
            src={completeIcon}
            width="90px"
            height="90px"
            alt="icon-complete"
          />
          <h1
            style={{
              textTransform: "uppercase",
              color: "hsl(278, 68%, 11%)",
              margin: ".5em 0",
            }}
          >
            Thank You!
          </h1>
          <p
            style={{
              color: " hsl(279, 6%, 55%)",
              textAlign: "center",
              marginBottom: "1em",
            }}
          >
            We've added your card details
          </p>
          <Button
            text="Continue"
            onClick={() => {
              setValid(false);
              setSubmitted(true);
            }}
          />
        </form>
      )}
    </div>
  );
}

export default Form;
