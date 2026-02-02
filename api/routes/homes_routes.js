import express from 'express';
import {createHome, deleteHome, getAllHomes, getHomeById, updateHome} from '../controllers/homes_controller.js';

const router = express.Router();

router.get('/', getAllHomes);
router.post('/', createHome);
router.get('/:id', getHomeById);
router.put('/:id', updateHome);
router.delete('/:id', deleteHome);

export default router;