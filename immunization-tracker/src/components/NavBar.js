import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

function NavBar(props) {
  function logout(e) {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user ID");
    props.history.push("/");
  }

  function setNav() {
    if (localStorage.getItem("loggedIn") != null) {
      return (
        <Nav>
          <Link to="" onClick={e => logout(e)} className="logout">
            Logout
          </Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <NavLink to="/">Login</NavLink>
          <NavLink to="/createuser">Create Account</NavLink>
        </Nav>
      );
    }
  }

  return <div>{setNav()}</div>;
}

export default NavBar;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    margin-right: 2rem;
  }
`;
