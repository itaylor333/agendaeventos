const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const { protect } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', getEvents);
router.get('/:id', getEventById);

router.post('/', protect, adminMiddleware, createEvent);
router.put('/:id', protect, adminMiddleware, updateEvent);
router.delete('/:id', protect, adminMiddleware, deleteEvent);

module.exports = router;
