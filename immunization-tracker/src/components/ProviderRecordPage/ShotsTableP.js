import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import ShotsRowP from "./ShotsRowReceivedAndUpcomingP";
import styled from "styled-components";
import ShotsRowMissedP from "./ShotsRowMissedP";
import ShotsHeaderP from "./ShotsHeaderP";

export default function ShotsTableP(props) {
  const id = props.match.params.id;

  const [shotsRAUArr, setShotsRAUArr] = useState([]);
  const [shotsMissedArr, setShotsMissedArr] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://immunization-tracker-van.herokuapp.com/api/immunizations/taken/${id}`
    )
      .then(data => {
        setShotsRAUArr(data.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    Axios.get(
      `https://immunization-tracker-van.herokuapp.com/api/immunizations/missing/${id}`
    )
      .then(data => {
        console.log(data.data);
        setShotsMissedArr(data.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  const NavContainer = styled.div`
    width: 75%;
    margin: auto;
    margin-top: 5vh;
  `;

  return (
    <NavContainer>
      <Table celled structured>
        <ShotsHeaderP type="MISSING" />
        <Table.Body>
          {shotsMissedArr.map(shot => (
            <ShotsRowMissedP
              name={shot.description}
              dose={shot.dose}
              location={shot.location}
              dateReceived={shot.dateReceived}
              id={shot.id}
              childId={id}
            />
          ))}
        </Table.Body>
        <ShotsHeaderP type="RECEIVED" />
        <Table.Body>
          {shotsRAUArr.map(shot => (
            <ShotsRowP
              name={shot.description}
              dose={shot.dose}
              location={shot.location}
              dateReceived={shot.dateReceived}
              id={shot.id}
              childId={id}
            />
          ))}
        </Table.Body>
      </Table>
    </NavContainer>
  );
}

const DashboardHeader = styled.h1`
  background: #0C0683;
  color: white;
  border-radius: 5px;
  font-size: 1.3rem;
  padding: 0.8rem;
  border-bottom: 1px solid black;
`;
