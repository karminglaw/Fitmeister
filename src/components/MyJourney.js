import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MyJourney = () => {
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState(null);
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/journey');
        setJourneys(response.data);
      } catch (error) {
        console.error('Error fetching journeys:', error);
      }
    };

    fetchJourneys();
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!photo) return;
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('note', note);

    try {
      const response = await axios.post('http://localhost:5001/api/journey', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setJourneys([...journeys, response.data]);
      setNote('');
      setPhoto(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/journey/${id}`);
      setJourneys(journeys.filter((journey) => journey._id !== id));
    } catch (error) {
      console.error('Error deleting journey:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: 'background.default', p: 4, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Journey
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <TextField
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
        >
          Choose Photo
          <input
            type="file"
            hidden
            onChange={handlePhotoChange}
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          fullWidth
        >
          Upload
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" mt={4} gap={2}>
        {journeys.map((journey) => (
          <Card key={journey._id} sx={{ width: 200 }}>
            <CardMedia
              component="img"
              height="200"
              image={`http://localhost:5001/uploads/${journey.photo}`}
              alt="Journey Photo"
            />
            <CardContent>
              <Typography variant="body2">{journey.note}</Typography>
              <IconButton
                color="secondary"
                onClick={() => handleDelete(journey._id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default MyJourney;
