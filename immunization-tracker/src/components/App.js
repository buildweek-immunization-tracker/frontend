import React from "react";
import { useSelector, useDispatch } from "react-redux";

// actions
import { addParentUser } from "../store/actions";

// styles
import "../styles/App.scss";

export default function App() {
  const message = useSelector(state => state.message);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function addParentDispatch(message) {
    console.log(message);
    dispatch(addParentUser(message));
  }

  return (
    <div className="App">
      <p>Duis mollit pariatur culpa excepteur sint nisi.{user}</p>
      <button onClick={() => addParentDispatch("hello")}>Test</button>
      <p>{message}</p>
    </div>
  );
}
