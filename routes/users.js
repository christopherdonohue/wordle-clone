const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

router.post('/', async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    user = new User({
      username: req.body.username,
      firstAttempts: req.body.firstAttempts,
      secondAttempts: req.body.secondAttempts,
      thirdAttempts: req.body.thirdAttempts,
      fourthAttempts: req.body.fourthAttempts,
      fifthAttempts: req.body.fifthAttempts,
      sixthAttempts: req.body.sixthAttempts,
      totalGames: req.body.totalGames,
      currentScore: req.body.currentScore,
    });
  } else {
    res.status(400).json({ message: 'Username already exists.' });
    return;
  }
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username !== null) {
    res.user.username = req.body.username;
  }
  if (req.body.firstAttempts !== null) {
    res.user.firstAttempts = req.body.firstAttempts;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
