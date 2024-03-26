import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateExercisePage() {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate()

  const addExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch('/exercises', {
        method: 'POST',
        body: JSON.stringify(newExercise),
        headers: {
            'Content-Type': 'application/json',
        },
    });
      if(response.status === 201){
          alert("Successfully added the Exercise!");
      } else {
          alert(`Failed to add Exercise, status code = ${response.status}`);
      }
      navigate('/');
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
                <select onChange={e => setUnit(e.target.value)}>
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
            addExercise()
            e.preventDefault()
            }}>Submit</button>
      </form>
  </>
  );
}

export default CreateExercisePage;