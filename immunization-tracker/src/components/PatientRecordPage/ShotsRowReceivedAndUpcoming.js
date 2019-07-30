import React, { Component } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

export default function ShotsRow({name, dose, location,dateReceived }){
    if(dateReceived !=null){
        return(
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{dose}</Table.Cell>
                <Table.Cell>{location}</Table.Cell>
                <Table.Cell textAlign='center'><Icon color='green' name='checkmark' size='large' />{dateReceived}</Table.Cell>
                <Table.Cell textAlign='center'></Table.Cell>
                <Table.Cell textAlign='center'></Table.Cell>
            </Table.Row>
        )
    }
    else return <h1>hi</h1>
}
