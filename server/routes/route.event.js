const express = require('express');
const Event = require('..//controllers/controller.event');
const router = express.Router();

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
router.post('/events', async (req, res) => {
  try {
    const eventId = await Event.createEvent(req.body);
    res.status(201).json({ message: 'Event created', eventId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.getEventById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
