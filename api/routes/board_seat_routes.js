import express from 'express';
import {
    createBoardSeat,
    deleteBoardSeat,
    getAllBoardSeats,
    getBoardSeatById,
    updateBoardSeat
} from "../controllers/board_seats_controller.js";

const router = express.Router();

router.get('/', getAllBoardSeats);
router.post('/', createBoardSeat);
router.put('/:id', updateBoardSeat);
router.get('/:id', getBoardSeatById);
router.delete('/:id', deleteBoardSeat);

export default router;