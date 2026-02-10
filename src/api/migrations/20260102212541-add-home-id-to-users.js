'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Users', 'home_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Homes',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL', // If a home is deleted, users just become unassigned
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'home_id');
    }
};