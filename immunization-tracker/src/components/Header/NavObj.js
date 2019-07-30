import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'


export default function NavObj({name, link}){

    const NavObjCont = styled.div`
        display: flex;
        justify-content: space-evenly;
        background: tomato;
        
        &:hover {
            background: red;
          }
    `;
    const NavText =styled.h2`
          color: white;
          margin: 5px;
          font-size: 1.3 rem;
    `;

    const StyledLink = styled(Link)`
        color: white;
        font-weight: bold;
        text-decoration: none;
    `;


    return( <div>

        <NavObjCont>
            <NavText><StyledLink to={link}>{name}</StyledLink></NavText>
        </NavObjCont>
    </div>
    )

}