import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const UserCard = ({ person }) => {
  const [parents, setParents] = useState([]);

  const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  `;

  const Card = styled.div`
    display: flex;
    border: 1px solid black;
    border-radius: 5px;
    padding: 2rem;
    margin: 2rem;
    background-color: #f4f4f4;
    width: 30%;
    text-align: left;
  `;

  const Photo = styled.div`
    width: 125px;
    height: 125px;
    background-color: #333;
    margin-right: 1.5rem;
  `;

  const Name = styled.h1`
    border-bottom: 1px solid black;
    width: 100%;
    margin: 0 0 1rem;
  `;

  const Button = styled.button`
    border: 1px solid black;
    outline: none;
    padding: 0.5rem 1rem;
    margin-right: 0.6rem;
    min-width: 5rem;
    font-size: 0.8rem;
  `;

  return (
    <>
      <CardContainer>

        <>
          <Card>
            <div>
              <Photo />
            </div>
            <div style={{ width: "100%" }}>
              <Name>
                {person.firstName} {person.lastName}
              </Name>
              <p>{person.currentProvider}</p>
              <div>
                <Button>View</Button>
                <Button>Update</Button>
              </div>
            </div>
          </Card>
        </>
      </CardContainer>
    </>
  );
};

export default UserCard;
