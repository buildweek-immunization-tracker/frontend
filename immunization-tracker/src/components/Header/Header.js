import React from "react";
import styled from "styled-components";
import NavObj from "./NavObj";

export default function Header() {
  let NavName = [
    { name: "Home", link: "/" },
    { name: "Account", link: "/userForm" },
    { name: "PDF", link: "/pdf" },
    { name: "Log Out", link: "/login" }
  ];

  return (
    <NavContainer>
      {NavName.map(name => (
        <NavObj name={name.name} link={name.link} />
      ))}
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 75%;
  background: tomato;
  margin: auto;
  margin-top: 2%;
  border-radius: 10px;
`;
