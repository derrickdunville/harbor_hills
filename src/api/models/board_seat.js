import { Model } from "sequelize";

const BoardSeatModel = (sequelize, DataTypes) => {
  class BoardSeat extends Model {
    static associate(models) {
      // The seat belongs to a specific User
      BoardSeat.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }
  BoardSeat.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: DataTypes.INTEGER,
      seat_email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      term_start: DataTypes.DATE,
      term_end: DataTypes.DATE,
      display_order: DataTypes.INTEGER,
      responsibilities: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "BoardSeat"
    }
  );
  return BoardSeat;
};

export default BoardSeatModel;
