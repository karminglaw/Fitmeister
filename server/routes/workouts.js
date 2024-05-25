const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import the auth middleware
const Workout = require('../models/Workout');

// @route POST api/workouts
// @desc Log a new workout
// @access Private
router.post('/', auth, async (req, res) => {
  const { type, sets, reps, weight } = req.body;

  try {
    const newWorkout = new Workout({
      user: req.user.id,
      type,
      sets,
      reps,
      weight
    });

    const workout = await newWorkout.save();
    res.json(workout);
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

module.exports = router;
