import db from '../models/index.js';
const { BoatSlip, Home, Sequelize } = db;
const { Op } = Sequelize;

export const getAllBoatSlips = async (req, res) => {

    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortKey = 'createdAt',
            sortOrder = 'DESC',
        } = req.query;

        // Example logic for your GET /api/boat_slips
        const { available } = req.query;
        // 1. Initialize the where object
        let where = {};

        // 2. Add Search Logic if search exists
        if (search) {
            where[Op.or] = [
                { stall_number: { [Op.iLike]: `%${search}%` } },
                Sequelize.where(
                    Sequelize.cast(Sequelize.col('home_id'), 'text'),
                    { [Op.iLike]: `%${search}%` }
                )
            ];
        }

        // 3. Add Availability Logic (Merged with Search via implicit AND)
        if (available === 'true') {
            where.home_id = null;
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows } = await BoatSlip.findAndCountAll({
            where: where,
            limit: parseInt(limit),
            offset: offset,
            distinct: true,
            include: [{
                model: Home, // If 'Residence' is undefined here, you get the 'getTableName' error
                as: 'home'
            }],
            // include: { model: Residence, as: 'residence', through: { attributes: [] } },
            order: [[sortKey, sortOrder]]
        });
        res.status(200).json({ items: rows, totalCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createBoatSlip = async (req, res) => {
    try {
        const { home_id, stall_number } = req.body;
        const boatSlip = await BoatSlip.create({ home_id, stall_number });
        res.status(201).json(boatSlip);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getBoatSlipById = async (req, res) => {
    try {
        const { id } = req.params;
        const boatSlip = await BoatSlip.findByPk(id, {
            include: [{
                model: Home,
                as: 'home'
            }]
        });
        if (!boatSlip) {
            return res.status(404).json({ error: 'Boat slip not found' });
        }
        res.status(200).json(boatSlip);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve boat slip', error: error.message });
    }
}

export const updateBoatSlip = async (req, res) => {
    try {
        const { id } = req.params;
        // Destructure stall_number from the body alongside home_id
        const { stall_number, home_id } = req.body;

        const slip = await BoatSlip.findByPk(id);
        if (!slip) {
            return res.status(404).json({ error: "Boat Slip not found" });
        }

        // Prepare the update object
        const updateData = {};

        // Update stall_number if provided
        if (stall_number !== undefined) {
            updateData.stall_number = stall_number;
        }

        // Update home_id if provided (handling null for unassigning)
        if (home_id !== undefined) {
            updateData.home_id = home_id || null;
        }

        await slip.update(updateData);

        // Fetch again with associations to return the full hydrated object
        // to the TanStack Query cache
        const updatedSlip = await BoatSlip.findByPk(id, {
            include: [{ model: Home, as: 'home' }]
        });

        res.json(updatedSlip);
    } catch (error) {
        // Handle Sequelize Unique Constraint Error (e.g., stall_number already taken)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: "ConstraintError",
                message: "This stall number is already in use.",
                details: error.errors
            });
        }

        res.status(500).json({ message: "Failed to update boat slip", error: error.message });
    }
};

export const deleteBoatSlip = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { id } = req.params;
        const slip = await BoatSlip.findByPk(id);
        if (!slip) {
            return res.status(404).json({ error: 'Boat Slip not found' });
        }

        await slip.destroy();
        res.status(200).json({ message: 'Boat Slip deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete boat slip', error: error });
    }
}