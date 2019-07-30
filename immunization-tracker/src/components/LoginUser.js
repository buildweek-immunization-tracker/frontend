import React, { useState, useEffect } from "react";

function LogInUser({ props }) {
    //hold state of form, and return to empty form once submit button is clicked
    const [user, setUser] = useState({ username: "", password: "" });

    //change handler will change the input element's values
    const handleChange = event => {
        const loggedInUser = { ...user, [event.target.name]: event.target.value };
        setUser(loggedInUser);
    }

    //submit handler will control the form's submission
    const handleSubmit = event => {
        event.preventDefault();
        console.log("logged-in user", user);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    Username
              <input type="text" name="username" placeholder="Your username" value="props" onChange={handleChange} required />
                </label>
                <label>
                    Password
              <input type="password" name="password" placeholder="Your password" value="props" onChange={handleChange} required />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>

    );

}

export default LogInUser;