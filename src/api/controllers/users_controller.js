import db from '../models/index.js';
const { User, Role, Home, Sequelize } = db;
const { Op } = Sequelize;

export const getAllUsers = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortKey = 'createdAt',
            sortOrder = 'DESC'
        } = req.query;

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows } = await User.findAndCountAll({
            where: search ? {
                [Op.or]: [
                    { username: { [Op.iLike]: `%${search}%` } },
                    { email: { [Op.iLike]: `%${search}%` } }
                ]
            } : {},
            limit: parseInt(limit),
            offset: offset,
            distinct: true,
            include: { model: Role, as: 'roles', through: { attributes: [] } },
            // Sequelize order format: [['column', 'DIRECTION']]
            order: [[sortKey, sortOrder]]
        });
        res.status(200).json({ items: rows, totalCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { username, email, birthday } = req.body;
        const newUser = await User.create({ username, email, birthday });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user', message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            include: { model: Role, as: 'roles', through: { attributes: [] } }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { home_id, username, email } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // We use undefined checks to ensure we only update fields sent in the request
        // This allows the controller to be used for general profile updates OR assignment
        const updatedData = {};
        if (username !== undefined) updatedData.username = username;
        if (email !== undefined) updatedData.email = email;

        // Handle home_id specifically to allow setting to null (unassigning)
        if (home_id !== undefined) {
            updatedData.home_id = home_id;
        }

        await user.update(updatedData);

        // Fetch updated user with the Home relationship included for the frontend
        const updatedUser = await User.findByPk(id, {
            include: [{ model: Home, as: 'home' }]
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error });
    }
}