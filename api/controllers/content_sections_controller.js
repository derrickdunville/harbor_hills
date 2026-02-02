import db from '../models/index.js';
const { ContentSection, Sequelize } = db;
const { Op } = Sequelize;

const normalizeItems = (items) => {
    if (!Array.isArray(items)) return [];
    return items
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter((item) => item.length > 0);
};

export const getAllContentSections = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortKey = 'section_key',
            sortOrder = 'ASC'
        } = req.query;

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const where = search ? {
            [Op.or]: [
                { section_key: { [Op.iLike]: `%${search}%` } },
                { title: { [Op.iLike]: `%${search}%` } },
                { badge_text: { [Op.iLike]: `%${search}%` } }
            ]
        } : {};

        const { count, rows } = await ContentSection.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset,
            order: [[sortKey, sortOrder]]
        });

        res.status(200).json({ items: rows, totalCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createContentSection = async (req, res) => {
    try {
        const { section_key, badge_text, title, items } = req.body;
        const normalizedItems = normalizeItems(items);
        const contentSection = await ContentSection.create({
            section_key,
            badge_text,
            title,
            items: normalizedItems
        });
        res.status(201).json(contentSection);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create content section', error: error.message });
    }
};

export const getContentSectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const contentSection = await ContentSection.findByPk(id);
        if (!contentSection) {
            return res.status(404).json({ error: 'Content section not found' });
        }
        res.status(200).json(contentSection);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve content section', error: error.message });
    }
};

export const getContentSectionByKey = async (req, res) => {
    try {
        const { section_key } = req.params;
        const contentSection = await ContentSection.findOne({ where: { section_key } });
        if (!contentSection) {
            return res.status(404).json({ error: 'Content section not found' });
        }
        res.status(200).json(contentSection);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve content section', error: error.message });
    }
};

export const updateContentSection = async (req, res) => {
    try {
        const { id } = req.params;
        const { section_key, badge_text, title, items } = req.body;

        const contentSection = await ContentSection.findByPk(id);
        if (!contentSection) {
            return res.status(404).json({ error: 'Content section not found' });
        }

        await contentSection.update({
            section_key,
            badge_text,
            title,
            items: normalizeItems(items)
        });

        const updatedContentSection = await ContentSection.findByPk(id);
        res.status(200).json(updatedContentSection);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update content section', error: error.message });
    }
};

export const deleteContentSection = async (req, res) => {
    try {
        const { id } = req.params;
        const contentSection = await ContentSection.findByPk(id);
        if (!contentSection) {
            return res.status(404).json({ error: 'Content section not found' });
        }

        await contentSection.destroy();
        res.status(200).json({ message: 'Content section deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete content section', error: error.message });
    }
};
