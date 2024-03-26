import React from 'react';
import ExerciseRow from './ExerciseRow'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function OrderTable({ setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
	const navigate = useNavigate()
    
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }
        
    useEffect(() => {
        loadExercises();
    }, []);

    const onDelete = async id => {
        const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete Exercise with id = ${id}, status code = ${response.status}`)
        }
    }	
    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        navigate("/edit")
    }

    return (
      <>
        <table>
            <tr>
                <th>Name</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Unit</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            <tbody>
                {exercises.map((item, i) => <ExerciseRow item={item} index={i} onDelete = {onDelete} onEdit = {onEdit}/>)}
            </tbody>
        </table>
      </>
    );
  }
  
  export default OrderTable;