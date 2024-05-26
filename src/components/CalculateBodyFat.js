import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const CalculateBodyFat = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [bodyFat, setBodyFat] = useState(null);

  const handleCalculate = () => {
    const heightMeters = parseFloat(height) / 100;
    const neckCm = parseFloat(neck);
    const waistCm = parseFloat(waist);

    // Formula for men in metric units
    const bodyFatPercentage = 
      (495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightMeters * 100))) - 450;

    setBodyFat(bodyFatPercentage.toFixed(2));
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1877F2' }}>
        Calculate Body Fat
      </Typography>
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
          label="Neck (cm)"
          type="number"
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
          fullWidth
        />
        <TextField
          label="Waist (cm)"
          type="number"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculate}
          fullWidth
        >
          Calculate
        </Button>
      </Box>
      {bodyFat !== null && (
        <Typography variant="h6" align="center" sx={{ marginTop: '1rem', color: '#1877F2' }}>
          Body Fat Percentage: {bodyFat}%
        </Typography>
      )}
    </Container>
  );
};

export default CalculateBodyFat;
