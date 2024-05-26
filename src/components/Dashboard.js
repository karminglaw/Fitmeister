import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

const Dashboard = () => {
  const location = useLocation();
  const username = location.state?.username || 'User';

  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 3, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1877F2' }}>
          Hello, {username}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button component={Link} to="/track-workout" variant="contained" color="primary">
            Track Workout
          </Button>
          <Button component={Link} to="/previous-workouts" variant="contained" color="primary">
            Previous Workouts
          </Button>
          <Button component={Link} to="/calculate-bmi" variant="contained" color="primary">
            Calculate BMI
          </Button>
          <Button component={Link} to="/progress-tracking" variant="contained" color="primary">
            Track Progress
          </Button>
          <Button component={Link} to="/calculate-bodyfat" variant="contained" color="primary">
            Calculate Body Fat
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
