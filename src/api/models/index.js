import Sequelize from "sequelize";
import config from "../config/config.json";
import BoardSeat from "./board_seat";
import BoatSlip from "./boatslip";
import ContentSection from "./content_section";
import Event from "./event";
import Home from "./home";
import Role from "./role";
import User from "./user";

const env = process.env.NODE_ENV || "development";
const envConfig = config[env];

const sequelize = envConfig.use_env_variable
  ? new Sequelize(process.env[envConfig.use_env_variable], envConfig)
  : new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);

const db = {
  BoardSeat: BoardSeat(sequelize, Sequelize.DataTypes),
  BoatSlip: BoatSlip(sequelize, Sequelize.DataTypes),
  ContentSection: ContentSection(sequelize, Sequelize.DataTypes),
  Event: Event(sequelize, Sequelize.DataTypes),
  Home: Home(sequelize, Sequelize.DataTypes),
  Role: Role(sequelize, Sequelize.DataTypes),
  User: User(sequelize, Sequelize.DataTypes)
};

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
