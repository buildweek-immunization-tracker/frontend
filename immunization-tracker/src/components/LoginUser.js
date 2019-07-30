import React, { useState } from "react";
import Axios from "axios";

function LogInUser() {
     //console.log(props);
//     //hold state of form, and return to empty form once submit button is clicked
//     const [loginUser, setLoginUser] = useState({ username: "", password: "" });

//     //change handler will change the input element's values
//     const handleChange = event => {
//         const loggedInUser = { ...user, [event.target.name]: event.target.value };
//         setUser(loggedInUser);
//     }

//     //submit handler will control the form's submission
//     const handleSubmit = event => {
//         event.preventDefault();
//         console.log("logged-in user", user);
//     }

//   const loginPerson = person => {
//     Axios.post('https://immunization-tracker-van.herokuapp.com/api/auth/login/', person)
//       .then(res => {
//         setloggedInUser(res.data);
//       });
//   };


    const [user, setUser] = useState({})

    const handleChange = event => {
        const inputUser = { ...user, [event.target.name]: event.target.value };
        setUser(inputUser);

    };

    const handleSubmit = event => {
        event.preventDefault();
        Axios.post('https://immunization-tracker-van.herokuapp.com/api/auth/login/', user)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("role", JSON.stringify(res.data.role));
            localStorage.setItem("user ID", JSON.stringify(res.data.userId));
            //props.history.push('/')

        })
        .catch(error => console.log(error, "There was an error fetching the data."))
        
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    Username
              <input type="text" name="username" placeholder="Your username" value={user.username} onChange={handleChange} required />
                </label>
                <label>
                    Password
              <input type="password" name="password" placeholder="Your password" value={user.password} onChange={handleChange} required />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>

    );

}

export default LogInUser;