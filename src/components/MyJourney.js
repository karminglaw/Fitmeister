import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MyJourney = () => {
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState(null);
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    fetchJourneys();
  }, []);

  const fetchJourneys = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { 'x-auth-token': token }
      };
      const response = await axios.get('http://localhost:5001/api/journey', config);
      setJourneys(response.data);
    } catch (error) {
      console.error('Error fetching journeys:', error);
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append('note', note);
    formData.append('photo', photo);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      };
      await axios.post('http://localhost:5001/api/journey', formData, config);
      fetchJourneys();
      setNote('');
      setPhoto(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { 'x-auth-token': token }
      };
      await axios.delete(`http://localhost:5001/api/journey/${id}`, config);
      fetchJourneys();
    } catch (error) {
      console.error('Error deleting journey:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'white', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1877F2' }}>
        My Journey
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <TextField
          label="Note"
          value={note}
          onChange={handleNoteChange}
          variant="outlined"
          sx={{ marginBottom: '1rem', width: '100%' }}
        />
        <Button variant="contained" component="label" sx={{ marginBottom: '1rem' }}>
          Choose Photo
          <input type="file" hidden onChange={handlePhotoChange} />
        </Button>
        {photo && (
          <Card sx={{ maxWidth: 200, marginBottom: '1rem' }}>
            <CardMedia
              component="img"
              height="200"
              image={URL.createObjectURL(photo)}
              alt="Journey Photo"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">{note}</Typography>
            </CardContent>
          </Card>
        )}
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Box>
      <Grid container spacing={2}>
        {journeys.map((journey) => (
          <Grid item xs={12} sm={6} md={4} key={journey._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5001/${journey.photo}`}
                alt="Journey Photo"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">{journey.note}</Typography>
                <IconButton color="secondary" onClick={() => handleDelete(journey._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyJourney;
