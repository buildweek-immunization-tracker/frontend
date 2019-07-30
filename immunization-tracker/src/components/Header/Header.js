import React from "react";
import styled from "styled-components";
import NavObj from "./NavObj";

export default function Header({array}){

    console.log(array);

    const NavContainer = styled.div`
        display: flex;
        justify-content: space-evenly;
        width: 75%;
        background: tomato;
        margin: auto;
    `;

    const name = "Trang";
    return(
        <NavContainer>
            {array.map((name)=><NavObj name={name.name} link={name.link}/>)}
        </NavContainer>
    )
}
