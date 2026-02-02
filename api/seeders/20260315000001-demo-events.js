'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const events = [
            {
                title: 'Board & Community Q&A',
                description: 'Bring questions about lake safety, maintenance schedules, and upcoming initiatives.',
                start_time: new Date('2026-04-09T18:30:00Z'),
                end_time: new Date('2026-04-09T20:00:00Z'),
                location: 'Clubhouse + Virtual',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Spring Shoreline Clean-Up',
                description: 'Meet at the marina. Gloves and bags provided.',
                start_time: new Date('2026-04-20T09:00:00Z'),
                end_time: new Date('2026-04-20T11:00:00Z'),
                location: 'Marina Dock',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Harbor Hills Picnic',
                description: 'Family-friendly lawn games and potluck at the clubhouse.',
                start_time: new Date('2026-05-18T12:00:00Z'),
                end_time: new Date('2026-05-18T15:00:00Z'),
                location: 'Clubhouse Lawn',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Safety & Dock Walk',
                description: 'Annual dock inspection and safety refresher for residents.',
                start_time: new Date('2026-06-08T08:30:00Z'),
                end_time: new Date('2026-06-08T10:30:00Z'),
                location: 'Lakefront Piers',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Sunset Paddle Social',
                description: 'Bring your kayak or paddleboard for a guided sunset loop.',
                start_time: new Date('2026-07-12T19:00:00Z'),
                end_time: new Date('2026-07-12T20:30:00Z'),
                location: 'North Launch',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'End-of-Summer Awards',
                description: 'Celebrate neighbors and recognize volunteer efforts.',
                start_time: new Date('2026-09-06T17:30:00Z'),
                end_time: new Date('2026-09-06T19:00:00Z'),
                location: 'Community Pavilion',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        await queryInterface.bulkInsert('Events', events, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Events', null, {});
    }
};
