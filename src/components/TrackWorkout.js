import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Box, Button, Container, TextField, Typography, Select, MenuItem } from '@mui/material';

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
    <Container
      maxWidth="sm"
      sx={{
        bgcolor: 'background.default',
        p: 4,
        pt: 2,
        pb: 2,
        borderRadius: 2,
        boxShadow: 1,
        mx: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Box width="100%">
        <Typography variant="h4" align="center" gutterBottom>
          <strong>Track Workout</strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              customInput={<TextField label="Date" fullWidth />}
            />
            <Select
              value={currentWorkout.type}
              onChange={handleChange}
              displayEmpty
              name="type"
              fullWidth
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="">
                <em>Select Workout</em>
              </MenuItem>
              {standardWorkouts.map((workout, index) => (
                <MenuItem key={index} value={workout}>
                  {workout}
                </MenuItem>
              ))}
            </Select>
            <TextField
              type="number"
              name="sets"
              value={currentWorkout.sets}
              onChange={handleChange}
              label="Sets"
              fullWidth
            />
            <TextField
              type="number"
              name="reps"
              value={currentWorkout.reps}
              onChange={handleChange}
              label="Reps"
              fullWidth
            />
            <TextField
              type="number"
              name="weight"
              value={currentWorkout.weight}
              onChange={handleChange}
              label="Weight (KG)"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddWorkout}
              fullWidth
            >
              Add Workout
            </Button>
            {workouts.length > 0 && (
              <Box mt={2}>
                <Typography variant="h6">Workouts for {moment(date).format('DD/MM/YYYY')}</Typography>
                <ul>
                  {workouts.map((workout, index) => (
                    <li key={index}>
                      {workout.type} - {workout.sets} sets - {workout.reps} reps - {workout.weight} kg
                    </li>
                  ))}
                </ul>
              </Box>
            )}
            {message && <Typography color="error">{message}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Log Workouts
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default TrackWorkout;

