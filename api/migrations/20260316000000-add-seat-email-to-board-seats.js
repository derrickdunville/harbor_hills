'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('BoardSeats', 'seat_email', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await queryInterface.sequelize.query(
            `UPDATE "BoardSeats"
             SET seat_email = LOWER(REPLACE(title, ' ', '.')) || '@harborhills.org'
             WHERE seat_email IS NULL;`
        );

        await queryInterface.changeColumn('BoardSeats', 'seat_email', {
            type: Sequelize.STRING,
            allowNull: false
        });

        await queryInterface.addIndex('BoardSeats', ['seat_email'], {
            unique: true,
            name: 'board_seats_seat_email_unique'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex('BoardSeats', 'board_seats_seat_email_unique');
        await queryInterface.removeColumn('BoardSeats', 'seat_email');
    }
};
