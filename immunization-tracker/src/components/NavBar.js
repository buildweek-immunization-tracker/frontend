import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";

export default function NavBar() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user ID");
  }

  if (localStorage.getItem("token")) {
    return (
      <Nav>
        <Link to="" onClick={e => logout()} className="logout">
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
