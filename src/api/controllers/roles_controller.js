import db from '../models/index.js';
const { Role, Sequelize } = db;
const { Op } = Sequelize;

export const getAllRoles = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortKey = 'createdAt',
            sortOrder = 'DESC'
        } = req.query;

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows } = await Role.findAndCountAll({
            where: search ? {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    // Wrap the search term in an array and cast it to match the column type
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('scopes'), 'text'),
                        { [Op.iLike]: `%${search}%` }
                    )
                ]
            } : {},
            limit: parseInt(limit),
            offset: offset,
            distinct: true,
            order: [[sortKey, sortOrder]]
        });
        res.status(200).json({ items: rows, totalCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createRole = async (req, res) => {
    try {
        const { name, scopes } = req.body;
        const role = await Role.create({ name, scopes });
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create role', message: error.message });
    }
};