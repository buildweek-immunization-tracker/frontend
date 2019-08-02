import React from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

export default function ShotsHeader({type}){
    return(
        <Table.Header>
            <DashboardHeader>{type}</DashboardHeader>
            <Table.Row>
                <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Dose</Table.HeaderCell>
                <Table.HeaderCell colSpan='1'>Status</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}

const DashboardHeader = styled.h1`
  background: #0C0683;
  color: white;
  border-radius: 5px;
  font-size: 1.3rem;
  padding: 0.8rem;
  margin-bottom: 2vh;
`;
