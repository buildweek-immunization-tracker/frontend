import React, { Component } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import Form from "./Form";

export default function ShotsRowP({childId,id, name, dose, location, dateReceived }){
    if(dateReceived !=null){
        return(
            <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{dose}</Table.Cell>
                <Table.Cell textAlign='center'><Icon color='green' name='checkmark' size='large' />{dateReceived}</Table.Cell>
                <Table.Cell><Form childId={childId} clinicName={location} shotID={id}/></Table.Cell>
            </Table.Row>
        )
    }
    else return(
        <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{dose}</Table.Cell>
            <Table.Cell textAlign='center'><Icon color='yellow' name='checkmark' size='large' />{dateReceived}</Table.Cell>
            <Table.Cell><Form childId={childId} clinicName={location} shotID={id}/></Table.Cell>
        </Table.Row>
    )
}
