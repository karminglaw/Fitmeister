import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Container, Typography, Box, Button, TextField, MenuItem, IconButton, Paper, List } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const TrackWorkout = () => {
  const [date, setDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState({ type: '', sets: '', reps: '', weight: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const standardWorkouts = [
    'Incline DB Press',
    'Lateral Raises',
    'Deadlifts',
    'Squats',
    'Leg Presses',
    'Dips',
    'Calf Raises',
    'Cable Rows',
    'Lat Pullovers',
    'Rear Delt Flies',
    'Chest Flies',
    'Tricep Pushdowns'
  ];

  const handleAddWorkout = () => {
    setWorkouts([...workouts, { ...currentWorkout, date: moment(date).toISOString() }]);
    setCurrentWorkout({ type: '', sets: '', reps: '', weight: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found, please log in again.');
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      await axios.post('http://localhost:5001/api/workouts/bulk', { workouts }, config);
      setMessage('Workouts logged successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setMessage('Error logging workouts');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorkout({ ...currentWorkout, [name]: value });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
      <Container maxWidth="md" sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1877F2' }}>
          Track Workouts
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Box mb={4}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={moment(date).format('YYYY-MM-DD')}
              onChange={(e) => setDate(new Date(e.target.value))}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box mb={4}>
            <TextField
              select
              fullWidth
              label="Workout Type"
              name="type"
              value={currentWorkout.type}
              onChange={handleChange}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200, // Set the height to show approximately 4 items
                    },
                  },
                },
              }}
            >
              {standardWorkouts.map((workout) => (
                <MenuItem key={workout} value={workout}>
                  {workout}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={4}>
            <TextField
              fullWidth
              label="Sets"
              type="number"
              name="sets"
              value={currentWorkout.sets}
              onChange={handleChange}
            />
          </Box>
          <Box mb={4}>
            <TextField
              fullWidth
              label="Reps"
              type="number"
              name="reps"
              value={currentWorkout.reps}
              onChange={handleChange}
            />
          </Box>
          <Box mb={4}>
            <TextField
              fullWidth
              label="Weight (KG)"
              type="number"
              name="weight"
              value={currentWorkout.weight}
              onChange={handleChange}
            />
          </Box>
          <Button
            type="button"
            onClick={handleAddWorkout}
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Add />}
            sx={{ marginBottom: '1rem' }}
          >
            Add Workout
          </Button>
          {workouts.length > 0 && (
            <Paper sx={{ padding: '1rem', marginBottom: '1rem' }}>
              <Typography variant="h6" gutterBottom>
                Workouts for {moment(date).format('DD/MM/YYYY')}
              </Typography>
              <List>
                {workouts.map((workout, index) => (
                  <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography>
                      {workout.type} - {workout.sets} sets - {workout.reps} reps - {workout.weight} kg
                    </Typography>
                    <IconButton color="secondary" onClick={() => setWorkouts(workouts.filter((_, i) => i !== index))}>
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </List>
            </Paper>
          )}
          {message && <Typography color="error">{message}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: '1rem' }}
          >
            Log Workouts
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default TrackWorkout;
