import express from 'express';
import {
    createBoatSlip, deleteBoatSlip,
    getAllBoatSlips,
    getBoatSlipById,
    updateBoatSlip
} from "../controllers/boat_slips_controller.js";

const router = express.Router();

router.get('/', getAllBoatSlips);
router.post('/', createBoatSlip);
router.get('/:id', getBoatSlipById);
router.put('/:id', updateBoatSlip);
router.delete('/:id', deleteBoatSlip);

export default router;