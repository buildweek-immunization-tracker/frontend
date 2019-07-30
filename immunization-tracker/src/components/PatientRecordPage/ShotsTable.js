import React from "react";
import {useEffect, useState} from "react";
import Axios from "axios";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import ShotsRow from "./ShotsRow"
import styled from "styled-components";

export default function ShotsTable({id}){

    const [shotsArr, setShotsArr] = useState([])

    useEffect(()=>{
        Axios.get(`https://immunization-tracker-van.herokuapp.com/api/immunizations/child/${id}`)
            .then(data =>{
                console.log(data.data);
                setShotsArr(data.data)
            })
            .catch(error=>console.log(error))
    },[])


    const NavContainer = styled.div`
        width: 75%;
    `;


    return(
        <NavContainer>
            <Table celled structured>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Dose</Table.HeaderCell>
                    <Table.HeaderCell rowSpan='2'>Provider</Table.HeaderCell>
                    <Table.HeaderCell colSpan='3'>Status</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Administered</Table.HeaderCell>
                    <Table.HeaderCell>Missed</Table.HeaderCell>
                    <Table.HeaderCell>Upcoming</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
            
                <Table.Body>
                    <ShotsRow 
                        name={'dose'} 
                        dose={'dose'}
                        location={"jesus"}
                        dateReceived={"hi"}
                    />
                </Table.Body>
            </Table>
        </NavContainer>
    
    )

}