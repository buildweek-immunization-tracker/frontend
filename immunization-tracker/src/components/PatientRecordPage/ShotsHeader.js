import React from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

export default function ShotsHeader({type}){
    return(
        <Table.Header>
            {type}
            <Table.Row>
                <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Dose</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Provider</Table.HeaderCell>
                <Table.HeaderCell colSpan='1'>Status</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}