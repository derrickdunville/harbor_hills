import db from '../models/index.js';
const { BoardSeat, User, Sequelize } = db;
const { Op } = Sequelize;

export const getAllBoardSeats = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortKey = 'display_order',
            sortOrder = 'ASC',
        } = req.query;

        // 1. Initialize the where object
        let where = {};

        // 2. Search Logic
        // Searches by Position Title OR User's Username
        if (search) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { responsibilities: { [Op.iLike]: `%${search}%` } },
                { seat_email: { [Op.iLike]: `%${search}%` } },
                { '$user.username$': { [Op.iLike]: `%${search}%` } }
            ];
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);

        // 3. Fetch with Pagination and Associations
        const { count, rows } = await BoardSeat.findAndCountAll({
            where: where,
            limit: parseInt(limit),
            offset: offset,
            distinct: true,
            include: [
                {
                    model: User,
                    as: 'user',
                    // Only include the fields that exist in your model
                    attributes: ['id', 'username']
                }
            ],
            order: [[sortKey, sortOrder]]
        });

        return res.status(200).json({
            items: rows,
            totalCount: count
        });

    } catch (error) {
        console.error('Error fetching board seats:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
};
/**
 * Assigns a user to a board_seats seat
 * Useful for the "Assign Member" button in your UI
 */
export const updateBoardSeat = async (req, res) => {
    const { id } = req.params;
    const { title, display_order, user_id, term_start, term_end, responsibilities, seat_email } = req.body;

    try {
        const seat = await BoardSeat.findByPk(id);

        if (!seat) {
            return res.status(404).json({ message: 'Board seat not found.' });
        }

        if (seat_email !== undefined && !seat_email.trim()) {
            return res.status(400).json({ message: 'Validation Error: Seat email is required.' });
        }

        // Update with whatever fields are provided in the body
        await seat.update({
            title: title !== undefined ? title : seat.title,
            display_order: display_order !== undefined ? display_order : seat.display_order,
            user_id: user_id !== undefined ? user_id : seat.user_id,
            term_start: term_start !== undefined ? term_start : seat.term_start,
            term_end: term_end !== undefined ? term_end : seat.term_end,
            responsibilities: responsibilities !== undefined ? responsibilities : seat.responsibilities,
            seat_email: seat_email !== undefined ? seat_email.trim() : seat.seat_email
        });

        return res.status(200).json(seat);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'A seat with this title already exists.' });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const createBoardSeat = async (req, res) => {
    try {
        const { title, display_order, responsibilities, seat_email } = req.body;

        if (!title) {
            return res.status(400).json({
                message: 'Validation Error: Title is required.'
            });
        }

        if (!seat_email || !seat_email.trim()) {
            return res.status(400).json({
                message: 'Validation Error: Seat email is required.'
            });
        }

        const newSeat = await BoardSeat.create({
            title,
            display_order: display_order || 0, // Default to 0 if not provided
            responsibilities: responsibilities || null,
            user_id: null, // New seats start vacant
            seat_email: seat_email.trim()
        });

        return res.status(201).json(newSeat);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: `A board seat with the title "${req.body.title}" already exists.`
            });
        }

        console.error('Error creating board seat:', error);
        return res.status(500).json({
            message: 'Internal server error while creating board seat.',
            error: error.message
        });
    }
};

/**
 * Fetches a single board seat by ID with associated User details
 */
export const getBoardSeatById = async (req, res) => {
    try {
        const { id } = req.params;

        const boardSeat = await BoardSeat.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username']
                }
            ]
        });

        if (!boardSeat) {
            return res.status(404).json({
                message: `Board seat with ID ${id} not found.`
            });
        }

        return res.status(200).json(boardSeat);

    } catch (error) {
        console.error('Error fetching board seat by ID:', error);
        return res.status(500).json({
            message: 'Internal server error while fetching board seat.',
            error: error.message
        });
    }
};

/**
 * Deletes a board seat by ID
 */
export const deleteBoardSeat = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find the seat first to verify it exists
        const seat = await BoardSeat.findByPk(id);

        if (!seat) {
            return res.status(404).json({
                message: `Board seat with ID ${id} not found.`
            });
        }

        // 2. Perform the deletion
        await seat.destroy();

        // 3. Return success
        return res.status(200).json({
            message: `Board seat "${seat.title}" successfully deleted.`
        });

    } catch (error) {
        console.error('Error deleting board seat:', error);
        return res.status(500).json({
            message: 'Internal server error while deleting board seat.',
            error: error.message
        });
    }
};
