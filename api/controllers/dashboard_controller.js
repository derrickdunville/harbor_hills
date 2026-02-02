import db from '../models/index.js';
const { User, Home, BoatSlip, BoardSeat, Sequelize } = db;
const { Op } = Sequelize;

/**
 * Fetches aggregated statistics for the Admin Dashboard
 */
export const getDashboardStats = async (req, res) => {
    try {
        // We execute all queries in parallel to minimize response time
        const [
            userCount,
            homeCount,
            slipStats,
            unassignedMembersCount,
            seatStats
        ] = await Promise.all([
            // 1. Total Members
            User.count(),

            // 2. Total Homes
            Home.count(),

            // 3. Boat Slip Aggregations
            BoatSlip.findAll({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'total'],
                    [Sequelize.literal(`COUNT(CASE WHEN home_id IS NOT NULL THEN 1 END)`), 'assigned'],
                    [Sequelize.literal(`COUNT(CASE WHEN home_id IS NULL THEN 1 END)`), 'available']
                ],
                raw: true
            }),

            // 4. Members not assigned to a home
            // Assuming the User model has a home_id foreign key
            User.count({
                where: {
                    home_id: { [Op.is]: null }
                }
            }),

            // 5. Board Seat Aggregations
            BoardSeat.findAll({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'total'],
                    [Sequelize.literal(`COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END)`), 'occupied'],
                    [Sequelize.literal(`COUNT(CASE WHEN user_id IS NULL THEN 1 END)`), 'vacant']
                ],
                raw: true
            })
        ]);

        // Helper to safely parse raw aggregate results which often return as strings
        const slips = slipStats[0] || { total: 0, assigned: 0, available: 0 };
        const seats = seatStats[0] || { total: 0, occupied: 0, vacant: 0 };

        return res.status(200).json({
            overview: {
                users: userCount,
                homes: homeCount,
                slips: parseInt(slips.total, 10),
                seats: parseInt(seats.total, 10)
            },
            actionItems: {
                availableSlips: parseInt(slips.available, 10),
                unassignedMembers: unassignedMembersCount,
                vacantBoardSeats: parseInt(seats.vacant, 10)
            },
            details: {
                slips: {
                    total: parseInt(slips.total, 10),
                    assigned: parseInt(slips.assigned, 10),
                    available: parseInt(slips.available, 10)
                },
                seats: {
                    total: parseInt(seats.total, 10),
                    occupied: parseInt(seats.occupied, 10),
                    vacant: parseInt(seats.vacant, 10)
                }
            }
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        return res.status(500).json({
            message: 'Failed to generate dashboard statistics',
            error: error.message
        });
    }
};