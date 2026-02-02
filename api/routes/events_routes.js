import express from 'express';
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent
} from "../controllers/events_controller.js";

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
