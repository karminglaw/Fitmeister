const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Journey = require('../models/Journey');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the "uploads" directory
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// @route   POST api/journey
// @desc    Upload a journey photo
// @access  Private
router.post('/', [auth, upload.single('photo')], async (req, res) => {
  try {
    const { note } = req.body;
    const photo = req.file.path;

    const newJourney = new Journey({
      user: req.user.id,
      note,
      photo
    });

    const journey = await newJourney.save();
    res.json(journey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/journey
// @desc    Get all journey photos
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const journeys = await Journey.find({ user: req.user.id }).sort({ date: -1 });
    res.json(journeys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/journey/:id
// @desc    Delete a journey photo
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);

    if (!journey) {
      return res.status(404).json({ msg: 'Journey not found' });
    }

    if (journey.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    fs.unlinkSync(journey.photo);
    await journey.remove();

    res.json({ msg: 'Journey removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
