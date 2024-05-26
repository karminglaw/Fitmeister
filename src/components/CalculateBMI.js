import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';

const CalculateBMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const handleCalculate = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 3, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1877F2' }}>
          Calculate BMI
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button variant="contained" color="primary" onClick={handleCalculate}>
            Calculate
          </Button>
        </Box>
        {bmi && (
          <Typography variant="h6" align="center" sx={{ marginTop: '1rem', color: '#1877F2' }}>
            Your BMI is {bmi}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CalculateBMI;
