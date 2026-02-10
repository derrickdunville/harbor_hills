'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('BoatSlips', 'lat', {
            type: Sequelize.DECIMAL(12, 8),
            allowNull: true, // Set to true initially so existing rows don't break
        });

        await queryInterface.addColumn('BoatSlips', 'lng', {
            type: Sequelize.DECIMAL(12, 8),
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('BoatSlips', 'lat');
        await queryInterface.removeColumn('BoatSlips', 'lng');
    }
};