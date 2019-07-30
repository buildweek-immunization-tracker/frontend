import React from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom'


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
    `;

    return( <div>

        <NavObjCont>
            <NavText><NavLink to={link}>{name}</NavLink></NavText>
        </NavObjCont>
    </div>
    )

}