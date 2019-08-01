import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function Form({ChildID, id, clinicName}){

    const [inputValue, setInputValue] = useState("");
    
    const [newDate, setNewDate] = useState({
        "location": "Hospital",
        "childId": 1,
        "immunizationId": 4,
        "dateReceived": ""
    })

    useEffect(()=>{
        axios
      .post(
        "https://immunization-tracker-van.herokuapp.com/api/immunizations/insert",
        newDate
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    }, [newDate])

    const handleChange = event =>{
        setInputValue(event.target.value);
        // console.log(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setNewDate({...newDate,"dateReceived":inputValue});
        // console.log(inputValue);
        // console.log({newDate});
    }

 



    return(
        <div>
            <div className="App">
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <label>
                        
                    <input type="date" 
                        id="start" 
                        name="cal"
                        value={inputValue}
                        min="1930-01-01" max="2050-12-31"
                        onChange={event => handleChange(event)}
                        />
                    </label>  <button>submit</button>
                </form>
            </div>
        </div>
    )
}