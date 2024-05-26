const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the auth middleware
const Workout = require('../models/Workout');
const moment = require('moment'); // Import moment

// @route POST api/workouts
// @desc Log a new workout
// @access Private

// Create a workout
// Create multiple workouts
router.post('/bulk', auth, async (req, res) => {
    const { workouts } = req.body;
    try {
      const newWorkouts = workouts.map(workout => ({
        user: req.user.id,
        type: workout.type,
        sets: workout.sets,
        reps: workout.reps,
        weight: workout.weight,
        date: moment(workout.date).toDate()
      }));
  
      const savedWorkouts = await Workout.insertMany(newWorkouts);
      res.json(savedWorkouts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


// Fetch workouts for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
      res.json(workouts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

router.get('/progress', auth, async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user.id }).sort({ date: 1 });
      res.json(workouts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Delete a workout
router.delete('/:id', auth, async (req, res) => {
    try {
      console.log(`Received delete request for workout ID: ${req.params.id}`);
      const workout = await Workout.findById(req.params.id);
      if (!workout) {
        console.log('Workout not found');
        return res.status(404).json({ msg: 'Workout not found' });
      }
      if (workout.user.toString() !== req.user.id) {
        console.log('User not authorized');
        return res.status(401).json({ msg: 'User not authorized' });
      }
      await Workout.deleteOne({ _id: req.params.id });
      console.log('Workout removed successfully');
      res.json({ msg: 'Workout removed' });
    } catch (err) {
      console.error('Error in delete route:', err.message);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;
