'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Clear existing users to avoid duplicate key errors
        await queryInterface.bulkDelete('Users', null, {});

        const users = [];

        for (let i = 0; i < 100; i++) {
            users.push({
                username: faker.internet.username(),
                email: faker.internet.email(),
                // If you added the birthday column earlier:
                // birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        await queryInterface.bulkInsert('Users', users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};