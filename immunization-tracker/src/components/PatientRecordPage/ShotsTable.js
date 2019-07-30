import React from "react";
import {useEffect, useState} from "react";
import Axios from "axios";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import ShotsRow from "./ShotsRowReceivedAndUpcoming"
import styled from "styled-components";
import ShotsRowMissed from "./ShotsRowMissed";

export default function ShotsTable({id}){

    const [shotsArr, setShotsArr] = useState([])

    useEffect(()=>{
        Axios.get(`https://immunization-tracker-van.herokuapp.com/api/immunizations/taken/1`)
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
                    <Table.HeaderCell colSpan='1'>Status</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
            
                <Table.Body>

                    {shotsArr.map((shot)=>
                        <ShotsRow 
                        name={shot.description} 
                        dose={shot.dose}
                        location={shot.location}
                        dateReceived={shot.dateReceived}
                    />)}
                    <ShotsRowMissed 
                        name={'HEP B'} 
                        dose={'1'}
                        location={"hospital"}
                        dateReceived={null}
                    />
                </Table.Body>
            </Table>
        </NavContainer>
    
    )

}