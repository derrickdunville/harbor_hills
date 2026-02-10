'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const homes = [];
        const streets = ['Marina Way', 'Harbor Court', 'Lakeside Drive'];

        // Total of 55 seeds
        for (let i = 1; i <= 55; i++) {
            // Rotate through the 3 streets based on the index
            const streetName = streets[i % streets.length];

            homes.push({
                address_line_1: `${100 + i} ${streetName}`, // e.g., 101 Marina Way
                address_line_2: "",
                city: 'Oceanfront',
                state: 'FL',
                zip_code: '33401',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert('Homes', homes, {});
    },

    async down(queryInterface, Sequelize) {
        // Deletes all records from the Homes table
        await queryInterface.bulkDelete('Homes', null, {});
    }
};