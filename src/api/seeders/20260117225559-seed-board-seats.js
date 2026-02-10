'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = await queryInterface.sequelize.query(
            `SELECT id FROM "Users" ORDER BY id ASC LIMIT 5;`
        );
        const userRows = users[0];

        if (userRows.length < 5) {
            throw new Error('Not enough users to seed BoardSeats. Seed Users first.');
        }

        const termStart = new Date('2024-01-01T00:00:00Z');
        const termEnd = new Date('2025-12-31T23:59:59Z');

        await queryInterface.bulkInsert('BoardSeats', [
            {
                title: 'President',
                responsibilities: 'Sets board agenda, leads meetings, and represents the association in community partnerships.',
                display_order: 1,
                user_id: userRows[0].id,
                seat_email: 'hhpresident@harborhillsassociation.com',
                term_start: termStart,
                term_end: termEnd,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Vice President',
                responsibilities: 'Supports the president and leads special projects or committees as needed.',
                display_order: 2,
                user_id: userRows[1].id,
                seat_email: 'vp@harborhillsassociation.com',
                term_start: termStart,
                term_end: termEnd,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Treasurer',
                responsibilities: 'Oversees budgeting, dues collection, and financial reporting for the association.',
                display_order: 3,
                user_id: userRows[2].id,
                seat_email: 'treasurer@harborhillsassociation.com',
                term_start: termStart,
                term_end: termEnd,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Secretary',
                responsibilities: 'Maintains records, publishes meeting minutes, and manages board communications.',
                display_order: 4,
                user_id: userRows[3].id,
                seat_email: 'secretary@harborhillsassociation.com',
                term_start: termStart,
                term_end: termEnd,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Harbor Master',
                responsibilities: 'Coordinates lagoon operations, dock assignments, and shoreline safety efforts.',
                display_order: 5,
                user_id: userRows[4].id,
                seat_email: 'harbormaster@harborhillsassociation.com',
                term_start: termStart,
                term_end: termEnd,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        // This clears the table if you need to undo the seed
        await queryInterface.bulkDelete('BoardSeats', null, {});
    }
};
