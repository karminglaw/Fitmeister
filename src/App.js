import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TrackWorkout from './components/TrackWorkout';
import PreviousWorkouts from './components/PreviousWorkouts';
import CalculateBMI from './components/CalculateBMI';
import ProgressTracking from './components/ProgressTracking'
import MyJourney from './components/MyJourney';
import CalculateBodyFat from './components/CalculateBodyFat';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track-workout" element={<TrackWorkout />} />
        <Route path="/previous-workouts" element={<PreviousWorkouts />} />
        <Route path="/calculate-bmi" element={<CalculateBMI />} />
        <Route path="/my-journey" element={<MyJourney />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/calculate-bodyfat" element={<CalculateBodyFat />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
