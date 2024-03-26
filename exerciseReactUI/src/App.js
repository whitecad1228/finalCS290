import './App.css';
import HomePage from '../src/pages/HomePage';
import CreatePage from './pages/CreateExercisePage'
import EditPage from "./pages/EditExercisePage"
import Navigation from "./componets/Navigation"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header className="App-header">
      <h1>Excercise Tracker</h1>
      <p>Full stack MERN app Demo</p>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit = {setExerciseToEdit}/>}></Route>
          <Route path="/create" element={ <CreatePage />}></Route>
          <Route path ="/edit" element = {<EditPage exerciseToEdit = {exerciseToEdit}/>}></Route>
        </Routes>
      </Router>
        <footer>
          <p>© 2023 Caden White.</p>
        </footer>
      </header>
    </div>
  );
}

export default App;
