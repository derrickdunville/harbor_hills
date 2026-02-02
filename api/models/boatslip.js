'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BoatSlip extends Model {
        static associate(models) {
            this.belongsTo(models.Home, {
                foreignKey: 'home_id',
                as: 'home',
                onDelete: 'SET NULL'
            });
        }
    }

    BoatSlip.init({
        home_id: DataTypes.INTEGER,
        stall_number: DataTypes.INTEGER,
        lat: DataTypes.DECIMAL(12, 8),
        lng: DataTypes.DECIMAL(12, 8),
    }, {
        sequelize,
        modelName: 'BoatSlip',
    });
    return BoatSlip;
};