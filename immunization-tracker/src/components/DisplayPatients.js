import React, { useState, useEffect } from "react";
import axios from "axios";
import GetParentOfPatient from "./GetParentOfPatient";

export default function DisplayPatients(props) {
  const [childList, setChildList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://immunization-tracker-van.herokuapp.com/api/providers/children/${
          props.providerId
        }`
      )
      .then(res => {
        setChildList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.providerId]);

  const filteredList = childList.filter(item => item.isPermission != 0);

  return (
    <div>
      <h3>Patients</h3>
      <div className="card">
        {filteredList.map(child => (
          <div className="row">
            <p>
              Name: {child.firstName} {child.lastName}
            </p>
            <p>DOB: {child.DOB}</p>
            <p>Gender: {child.gender}</p>
            <GetParentOfPatient parentId={child.parentId} />
            <p className="button">
              <button>Edit History</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
