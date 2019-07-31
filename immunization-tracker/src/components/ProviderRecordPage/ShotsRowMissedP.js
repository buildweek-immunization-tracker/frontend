import React, { Component } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import Form from "./Form";
export default function ShotsRowMissedP({name, dose, location, dateReceived }){
    return(
        <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{dose}</Table.Cell>
            <Table.Cell>{location}</Table.Cell>
            <Table.Cell textAlign='center'><Icon color='red' name='close icon' size='large' />{dateReceived}</Table.Cell>
            <Table.Cell><Form/></Table.Cell>
        </Table.Row>
    )
}