import React, { useState } from "react";

function LogInForm (){



    return (
        <form onSubmit={handleSubmit}>
          <label>
              Username
              <input type="text" name="username" value="props" onChange={handleChange} required /> 
          </label>
          <label>
              Password
              <input type="password" name="password" value="props" onChange={handleChange} required/>
          </label>
          <button type="submit">Log In</button>
        </form>  
      ); 

}

export default LogInForm