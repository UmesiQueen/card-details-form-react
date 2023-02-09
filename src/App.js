import React, { useState } from "react";

import Form from "./components/Form/Form";
import Card from "./components/Card/Card";
import "./App.css";

function App() {
  const [cardDetails, setCardDetails] = useState({});

  return (
    <div className="app">
      <Card {...cardDetails} />

      <Form
        onChange={(values) => {
          setCardDetails(values);
        }}
      />
    </div>
  );
}

export default App;
