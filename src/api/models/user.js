import { Model } from "sequelize";

const UserModel = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: "UserRoles",
        foreignKey: "user_id",
        otherKey: "role_id",
        as: "roles"
      });

      // Link to Home with an explicit foreign key
      this.belongsTo(models.Home, {
        foreignKey: "home_id",
        as: "home"
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      // Add the foreign key field here
      home_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // This makes the relationship optional
        references: {
          model: "Homes",
          key: "id"
        }
      }
    },
    {
      sequelize,
      modelName: "User"
    }
  );
  return User;
};

export default UserModel;
