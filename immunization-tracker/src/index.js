import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Route} from "react-router-dom";

// styling
import "./styles/normalize.scss";
import "./styles/index.scss";

// components
import App from "./components/App";

ReactDOM.render(<Route><App /></Route>, document.getElementById("root"));
