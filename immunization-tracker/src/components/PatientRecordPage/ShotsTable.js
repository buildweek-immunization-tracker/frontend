import React from "react";
import {useEffect, useState} from "react";
import Axios from "axios";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import ShotsRow from "./ShotsRowReceivedAndUpcoming"
import styled from "styled-components";
import ShotsRowMissed from "./ShotsRowMissed";
import ShotsHeader from "./ShotsHeader";

export default function ShotsTable({id}){

    const [shotsRAUArr, setShotsRAUArr] = useState([])
    const [shotsMissedArr, setShotsMissedArr] = useState([])

    useEffect(()=>{
        Axios.get(`https://immunization-tracker-van.herokuapp.com/api/immunizations/taken/${id}`)
            .then(data =>{
                console.log(data.data);
                setShotsRAUArr(data.data)
            })
            .catch(error=>console.log(error))
    },[])

    useEffect(()=>{
        Axios.get(`https://immunization-tracker-van.herokuapp.com/api/immunizations/missing/${id}`)
            .then(data =>{
                console.log(data.data);
                setShotsMissedArr(data.data)
            })
            .catch(error=>console.log(error))
    },[])


    const NavContainer = styled.div`
        width: 75%;
    `;


    return(
        <NavContainer>
            <Table celled structured>
                <ShotsHeader type="MISSING"/>
                <Table.Body>
                    {shotsMissedArr.map((shot)=>
                        <ShotsRowMissed 
                        name={shot.description} 
                        dose={shot.dose}
                        location={shot.location}
                        dateReceived={shot.dateReceived}
                    />)}
                </Table.Body>
                <ShotsHeader type="RECEIVED/UPCOMING"/>
                <Table.Body>
                    {shotsRAUArr.map((shot)=>
                        <ShotsRow 
                        name={shot.description} 
                        dose={shot.dose}
                        location={shot.location}
                        dateReceived={shot.dateReceived}
                    />)}
                </Table.Body>
            </Table>
        </NavContainer>
    
    )

}