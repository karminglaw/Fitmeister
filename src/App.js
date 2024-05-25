import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TrackWorkout from './components/TrackWorkout';
import PreviousWorkouts from './components/PreviousWorkouts';
import CalculateBMI from './components/CalculateBMI';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/track-workout" element={<TrackWorkout />} />
          <Route path="/previous-workouts" element={<PreviousWorkouts />} />
          <Route path="/calculate-bmi" element={<CalculateBMI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
