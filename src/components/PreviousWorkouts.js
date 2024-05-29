import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';

const PreviousWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        };
        const response = await axios.get('http://localhost:5001/api/workouts', config);
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      await axios.delete(`http://localhost:5001/api/workouts/${id}`, config);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: 'background.default', padding: '2rem', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Previous Workouts
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workout Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Weight (KG)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.reduce((acc, workout) => {
              const group = acc.find(item => item.type === workout.type);
              if (group) {
                group.data.push(workout);
              } else {
                acc.push({ type: workout.type, data: [workout] });
              }
              return acc;
            }, []).map((group) => (
              <React.Fragment key={group.type}>
                <TableRow>
                  <TableCell colSpan={6} style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>{group.type}</TableCell>
                </TableRow>
                {group.data.map((workout) => (
                  <TableRow key={workout._id}>
                    <TableCell>{workout.type}</TableCell>
                    <TableCell>{new Date(workout.date).toLocaleDateString()}</TableCell>
                    <TableCell>{workout.sets}</TableCell>
                    <TableCell>{workout.reps}</TableCell>
                    <TableCell>{workout.weight}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(workout._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default PreviousWorkouts;
