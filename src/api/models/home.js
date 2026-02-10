import { Model } from "sequelize";

const HomeModel = (sequelize, DataTypes) => {
  class Home extends Model {
    static associate(models) {
      this.hasMany(models.BoatSlip, {
        foreignKey: "home_id",
        as: "boat_slips",
        onDelete: "SET NULL", // Unlinks the slip instead of deleting it
        hooks: true
      });
      this.hasMany(models.User, {
        foreignKey: "home_id",
        as: "residents",
        onDelete: "SET NULL", // Unlinks the resident instead of deleting them
        hooks: true
      });
    }
  }

  Home.init(
    {
      address_line_1: DataTypes.STRING,
      address_line_2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip_code: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Home"
    }
  );
  return Home;
};

export default HomeModel;
