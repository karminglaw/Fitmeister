import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Box, CircularProgress } from '@mui/material';

const ProgressTracking = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        };
        const response = await axios.get('http://localhost:5001/api/workouts/progress', config);
        
        const workouts = response.data;
        setWorkouts(workouts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (selectedWorkout) {
      const workoutData = workouts.filter(workout => workout.type === selectedWorkout);
      const dates = workoutData.map(workout => new Date(workout.date).toLocaleDateString());
      const weights = workoutData.map(workout => workout.weight);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: selectedWorkout,
            data: weights,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: false,
          },
        ],
      });
    }
  }, [selectedWorkout, workouts]);

  const handleWorkoutChange = (e) => {
    setSelectedWorkout(e.target.value);
  };

  const uniqueWorkouts = [...new Set(workouts.map(workout => workout.type))];

  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 3, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1877F2' }}>
          Progress Tracking
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '1rem' }}>
          <InputLabel>Select Workout</InputLabel>
          <Select
            value={selectedWorkout}
            onChange={handleWorkoutChange}
            label="Select Workout"
          >
            <MenuItem value=""><em>Select a workout</em></MenuItem>
            {uniqueWorkouts.map(workout => (
              <MenuItem key={workout} value={workout}>
                {workout}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {chartData.labels ? (
          <Line data={chartData} />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProgressTracking;
