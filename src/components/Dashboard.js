import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Card sx={{ p: 4, borderRadius: 2, boxShadow: 1, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
        FitMeister
      </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Button variant="contained" color="primary" component={Link} to="/track-workout">
            Track Workout
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/previous-workouts">
            Previous Workouts
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/progress-tracking">
            Progress Tracker
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/calculate-bmi">
            Calculate BMI
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/calculate-bodyfat">
            Calculate Body Fat
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Dashboard;
