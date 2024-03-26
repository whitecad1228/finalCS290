import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const EditExercisePage = ({exerciseToEdit}) => {
  // const [name, setName] = useState('');
  // const [reps, setReps] = useState('');
  // const [weight, setWeight] = useState('');
  // const [unit, setUnit] = useState('');
  // const [date, setDate] = useState('');
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const navigate = useNavigate()

  const editMovie = async () => {
    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: 'PUT',
      body: JSON.stringify({ name:name, reps:reps, weight:weight, unit:unit, date:date }),
      headers: {
          'Content-Type': 'application/json',
      },
    });
    if(response.status === 200){
      alert("Successfully edited the movie!");
    } else {
      alert(`Failed to edit movie, status code = ${response.status}`);
    }     
    navigate("/");
  };

  return (
  <>
      <form>
          <fieldset>
              <legend>Your Details</legend>
              <label>Exercise Name: 
                  <input type="text" value={name}
                  onChange={e => setName(e.target.value)} />
              </label>
              <br></br>
              <label>exercise reps: 
                  <input type="number" value={reps}
                  onChange={e => setReps(parseInt(e.target.value))} />
              </label>
              <br></br>
              <label>exercise weight: 
                  <input type="number" value={weight}
                  onChange={e => setWeight(parseInt(e.target.value))} />
              </label>
              <br></br>
              <label>exercise unit: 
                <select defaultValue = {unit} onChange={e => setUnit(e.target.value)}>
                  <option value = "lbs">lbs</option>
                  <option value = "kgs">kgs</option>
                </select>
              </label>
              <br></br>
              <label>exercise date: 
                  <input type="text" value={date}
                  onChange={e => setDate(e.target.value)} />
              </label>
          </fieldset>
          <button onClick={e => {
            editMovie()
            e.preventDefault()
            }}>Submit</button>
      </form>
  </>
  );
}

export default EditExercisePage;