'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
        {
            name: 'Admin',
            scopes: ['create_user', 'delete_user', 'update_user'],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Member',
            scopes: null,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Harbor Master',
            scopes: ['assign_boat_slip', 'manage_boat_slips'],
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
