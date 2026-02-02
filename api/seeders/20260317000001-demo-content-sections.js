'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const sections = [
            {
                section_key: 'community_updates',
                badge_text: 'Community Updates',
                title: 'Latest notes from the board',
                items: JSON.stringify([
                    'Annual dues notices delivered June 1 with early-pay discount through June 30.',
                    'Lagoon dredging vendor walkthrough scheduled for the week of May 6.',
                    'Volunteer sign-ups open for shoreline cleanup and dock safety review.'
                ]),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                section_key: 'seasonal_calendar',
                badge_text: 'Seasonal Calendar',
                title: 'Plan ahead',
                items: JSON.stringify([
                    'July: Sunset paddle + fireworks viewing.',
                    'September: End-of-summer picnic and community awards.',
                    'December: Holiday lights cruise and toy drive.'
                ]),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        await queryInterface.bulkInsert('ContentSections', sections, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ContentSections', null, {});
    }
};
