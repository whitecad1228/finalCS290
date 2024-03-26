import React from 'react';
import ExerciseTable from "../componets/ExerciseTable"

function HomePage({setExerciseToEdit}) {

  return (
    <>
      <ExerciseTable setExerciseToEdit = {setExerciseToEdit}></ExerciseTable>
    </>
  );
}

export default HomePage;