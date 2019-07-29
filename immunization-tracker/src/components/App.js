import React from "react";
import { useSelector, useDispatch } from "react-redux";

// actions
import { addParentUser } from "../store/actions";

// styles
import "../styles/App.css";

export default function App() {
  const message = useSelector(state => state.message);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function prepDispatch(message) {
    console.log(message);
    dispatch(addParentUser(message));
  }

  return (
    <div className="App">
      <p>Duis mollit pariatur culpa excepteur sint nisi.{user}</p>
      <button onClick={() => prepDispatch("hello")}>Test</button>
      <p>{message}</p>
    </div>
  );
}
