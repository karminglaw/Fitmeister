import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TrackWorkout from './components/TrackWorkout';
import PreviousWorkouts from './components/PreviousWorkouts';
import CalculateBMI from './components/CalculateBMI';
import ProgressTracking from './components/ProgressTracking';
import CalculateBodyFat from './components/CalculateBodyFat';
import MyJourney from './components/MyJourney'; // Import the new component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/track-workout" element={<TrackWorkout />} />
      <Route path="/previous-workouts" element={<PreviousWorkouts />} />
      <Route path="/calculate-bmi" element={<CalculateBMI />} />
      <Route path="/progress-tracking" element={<ProgressTracking />} />
      <Route path="/calculate-bodyfat" element={<CalculateBodyFat />} />
      <Route path="/my-journey" element={<MyJourney />} /> {/* Add this route */}
    </Routes>
  );
};

export default App;
