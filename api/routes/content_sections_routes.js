import express from 'express';
import {
    createContentSection,
    deleteContentSection,
    getAllContentSections,
    getContentSectionById,
    getContentSectionByKey,
    updateContentSection
} from "../controllers/content_sections_controller.js";

const router = express.Router();

router.get('/', getAllContentSections);
router.post('/', createContentSection);
router.get('/key/:section_key', getContentSectionByKey);
router.get('/:id', getContentSectionById);
router.put('/:id', updateContentSection);
router.delete('/:id', deleteContentSection);

export default router;
