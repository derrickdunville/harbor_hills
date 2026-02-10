import db from '../models/index.js';
import {Op} from "sequelize";

const { Home, BoatSlip, User }  = db;

export const getAllHomes = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortKey = 'createdAt',
            sortOrder = 'DESC'
        } = req.query;

        const offset = (parseInt(page) - 1) * parseInt(limit);

        const { count, rows } = await Home.findAndCountAll({
            where: search ? {
                [Op.or]: [
                    { address_line_1: { [Op.iLike]: `%${search}%` } }
                ]
            } : {},
            limit: parseInt(limit),
            offset: offset,
            distinct: true,
            include: { model: BoatSlip, as: 'boat_slips'},
            order: [[sortKey, sortOrder]]
        });
        res.status(200).json({ items: rows, totalCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createHome = async (req, res) => {
    try {
        const {
            address_line_1,
            address_line_2,
            city,
            state,
            zip_code,
            hoa_id
        } = req.body;
        const residence = await Home.create({address_line_1, address_line_2, city, state, zip_code, hoa_id});
        res.status(201).json(residence);
    } catch (error) {
        res.status(500).json({message: 'Failed to create home', error: error});
    }
};

export const getHomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const home = await Home.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'residents',
                    attributes: ['id', 'username', 'email'] // Don't send passwords!
                },
                {
                    model: BoatSlip,
                    as: 'boat_slips'
                }
            ]
        });

        if (!home) return res.status(404).json({ error: 'Home not found' });
        res.json(home);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHome = async (req, res) => {
    try {
        const { id } = req.params;
        const { address_line_1, address_line_2, city, state, zip_code } = req.body;

        const home = await Home.findByPk(id);
        if (!home) return res.status(404).json({ error: "Home not found" });

        await home.update({
            address_line_1,
            address_line_2,
            city,
            state,
            zip_code
        });

        // Return hydrated object with associations (residents, boat slips)
        const updatedHome = await Home.findByPk(id, {
            include: [
                { model: User, as: 'residents' },
                { model: BoatSlip, as: 'boat_slips' }
            ]
        });

        res.json(updatedHome);
    } catch (error) {
        res.status(500).json({ message: "Failed to update home", error: error.message });
    }
};

export const deleteHome = async (req, res) => {

    const t = await db.sequelize.transaction();
    try {
        const { id } = req.params;
        const home = await Home.findByPk(id);
        if (!home) return res.status(404).json({ error: "Home not found" });

        // 1. Unassociate Boat Slips
        await BoatSlip.update(
            { home_id: null },
            { where: { home_id: home.id }, transaction: t }
        );

        // 2. Unassociate Residents
        await User.update(
            { home_id: null },
            { where: { home_id: home.id }, transaction: t }
        );

        // 3. Delete the Home
        await home.destroy({
            where: { id: home.id },
            transaction: t
        });

        await t.commit();
        res.json({ message: "Home deleted successfully" });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: "Failed to delete home", error: error });
    }
}