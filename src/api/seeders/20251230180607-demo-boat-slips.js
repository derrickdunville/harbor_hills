'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // 1. Fetch all Homes to link them to the slips
        const homes = await queryInterface.sequelize.query(
            `SELECT id FROM "Homes" ORDER BY id ASC;`
        );
        const homeRows = homes[0];

        // 2. Your coordinate data structure
        const lat_lng_slips = {
            "2a": { "lat": 724, "lng": 86.75 }, "2b": { "lat": 716, "lng": 112 },
            "3a": { "lat": 701, "lng": 149.75 }, "3b": { "lat": 687.25, "lng": 172.25 },
            "4a": { "lat": 670.5, "lng": 198.75 }, "4b": { "lat": 652.75, "lng": 225.5 },
            "5a": { "lat": 638.75, "lng": 251.75 }, "5b": { "lat": 623, "lng": 276.5 },
            "6a": { "lat": 610, "lng": 299.75 }, "6b": { "lat": 592, "lng": 326.25 },
            "7a": { "lat": 573.25, "lng": 351 }, "7b": { "lat": 555.75, "lng": 377.75 },
            "8a": { "lat": 534, "lng": 406 }, "8b": { "lat": 514.75, "lng": 431.25 },
            "9a": { "lat": 494, "lng": 458 }, "9b": { "lat": 475.25, "lng": 483.5 },
            "10a": { "lat": 459, "lng": 504.5 }, "10b": { "lat": 439.75, "lng": 529.75 },
            "11a": { "lat": 424, "lng": 552.5 }, "11b": { "lat": 396.75, "lng": 573 },
            "12a": { "lat": 371.25, "lng": 588.5 }, "12b": { "lat": 342, "lng": 606.75 },
            "13a": { "lat": 324, "lng": 617.75 }, "13b": { "lat": 295.5, "lng": 639.25 },
            "14a": { "lat": 260.5, "lng": 663 }, "14b": { "lat": 245.75, "lng": 696.5 },
            "15a": { "lat": 234.75, "lng": 725 }, "15b": { "lat": 227, "lng": 765.75 },
            "16a": { "lat": 219.5, "lng": 802.25 }, "16b": { "lat": 227.5, "lng": 844.75 },
            "17a": { "lat": 243.75, "lng": 878.25 }, "17b": { "lat": 271, "lng": 905.75 },
            "18a": { "lat": 303.5, "lng": 922 }, "18b": { "lat": 338, "lng": 935.25 },
            "19a": { "lat": 379, "lng": 934.25 }, "19b": { "lat": 414.5, "lng": 933.75 },
            "20a": { "lat": 442.5, "lng": 928.75 }, "20b": { "lat": 476.25, "lng": 923 },
            "21a": { "lat": 509.25, "lng": 910 }, "21b": { "lat": 543.5, "lng": 896.75 },
            "22a": { "lat": 563.25, "lng": 885.75 }, "22b": { "lat": 596.5, "lng": 868.75 },
            "23a": { "lat": 617.25, "lng": 856 }, "23b": { "lat": 648.75, "lng": 834.75 },
            "24a": { "lat": 673.5, "lng": 817.25 }, "24b": { "lat": 702.5, "lng": 792.75 },
            "25a": { "lat": 716.5, "lng": 774.25 }, "25b": { "lat": 742, "lng": 748.5 },
            "26a": { "lat": 747.75, "lng": 714 }, "26b": { "lat": 760.25, "lng": 676 },
            "27a": { "lat": 763.5, "lng": 648.5 }, "27b": { "lat": 765.25, "lng": 607.75 },
            "28a": { "lat": 751.5, "lng": 584.25 }, "28b": { "lat": 744.75, "lng": 545.25 },
            "29a": { "lat": 734.25, "lng": 522.75 }, "29b": { "lat": 729.5, "lng": 485.75 },
        };

        // 3. Map through the coordinate keys to create the insert array
        const boatSlipsData = Object.keys(lat_lng_slips).map((stall, index) => {
            return {
                stall_number: stall, // Stores "2a", "2b", etc.
                lat: lat_lng_slips[stall].lat,
                lng: lat_lng_slips[stall].lng,
                // Assign home_id if we have enough homes, otherwise null
                home_id: homeRows[index] ? homeRows[index].id : null,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        await queryInterface.bulkInsert('BoatSlips', boatSlipsData, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('BoatSlips', null, {});
    }
};