import express from 'express';
import { respond } from '../../utils/respond';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../events/event.controller';

const router = express.Router();

router.post('/events', createEvent,respond);
router.get('/events', getAllEvents,respond);
router.get('/events/:id', getEventById,respond);
router.put('/events/:id', updateEvent,respond);
router.delete('/events/:id', deleteEvent,respond);

export default router;
