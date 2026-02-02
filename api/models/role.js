'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            this.belongsToMany(models.User, {
                through: 'UserRoles',
                foreignKey: 'role_id',
                otherKey: 'user_id'
            });
        }
    }

    Role.init({
        name: DataTypes.STRING,
        scopes: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
};