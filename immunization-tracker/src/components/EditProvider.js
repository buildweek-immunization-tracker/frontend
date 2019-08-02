import React, { useState, useEffect } from "react";
import axios from "axios";

export default function(props) {
  const [provider, setProvider] = useState(props.provider);

  //   console.log("PROVIDER ON STATE: ", provider);
  return <h1>RENDERING</h1>;
}
