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

  const groupWorkoutsByType = (workouts) => {
    return workouts.reduce((groups, workout) => {
      const { type } = workout;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(workout);
      return groups;
    }, {});
  };

  const groupedWorkouts = groupWorkoutsByType(workouts);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
      <Container maxWidth="md" sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1877F2' }}>
          Previous Workouts
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {Object.keys(groupedWorkouts).map((type) => (
              <Box key={type} mb={4}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                  {type}
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Sets</TableCell>
                      <TableCell>Reps</TableCell>
                      <TableCell>Weight (KG)</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupedWorkouts[type].map((workout) => (
                      <TableRow key={workout._id}>
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
                  </TableBody>
                </Table>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PreviousWorkouts;
