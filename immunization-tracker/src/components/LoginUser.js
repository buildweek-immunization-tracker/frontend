import React, { useState } from "react";

function LogInForm ({props}){

    const [user, setUser] = useState({username:"", password:""});

    //change handler will change the input element's values
    const handleChange = event => {
        const updatedUser = { ...user, [event.target.name]: event.target.value };
        setUser(updatedUser);   
    }

    //submit handler will control the form's submission
    const handleSubmit = event => {
        event.preventDefault();
        console.log("user", user);
    }

    return (
        <form onSubmit={handleSubmit}>
          <label>
              Username
              <input type="text" name="username" placeholder="Your username" value="props" onChange={handleChange} required /> 
          </label>
          <label>
              Password
              <input type="password" name="password" placeholder="Your password" value="props" onChange={handleChange} required/>
          </label>
          <button type="submit">Log In</button>
        </form>  
      ); 

}

export default LogInForm