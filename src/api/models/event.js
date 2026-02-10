import { Model } from "sequelize";

const EventModel = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {}
  }

  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_time: DataTypes.DATE,
      location: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Event"
    }
  );
  return Event;
};

export default EventModel;
