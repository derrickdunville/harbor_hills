import db from '../models/index.js';
const { Event, Sequelize } = db;
const { Op } = Sequelize;

export const getAllEvents = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortKey = 'start_time',
            sortOrder = 'ASC'
        } = req.query;

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const where = search ? {
            [Op.or]: [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } },
                { location: { [Op.iLike]: `%${search}%` } }
            ]
        } : {};

        const { count, rows } = await Event.findAndCountAll({
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

export const createEvent = async (req, res) => {
    try {
        const { title, description, start_time, end_time, location } = req.body;
        const event = await Event.create({ title, description, start_time, end_time, location });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create event', error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve event', error: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, start_time, end_time, location } = req.body;

        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.update({ title, description, start_time, end_time, location });

        const updatedEvent = await Event.findByPk(id);
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update event', error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.destroy();
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete event', error: error.message });
    }
};
