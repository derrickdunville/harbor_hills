import express from 'express';
import {createRole, getAllRoles} from "../controllers/roles_controller.js";

const router = express.Router();

router.get('/', getAllRoles);
router.post('/', createRole);

export default router;