import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const CalculateBMI = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: 'background.default', p: 4, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Calculate BMI
      </Typography>
      <form onSubmit={calculateBMI}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
          />
          <TextField
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            fullWidth
          />
          <TextField
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Calculate
          </Button>
          {bmi && (
            <Typography variant="h6" align="center">
              Your BMI: {bmi}
            </Typography>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default CalculateBMI;
