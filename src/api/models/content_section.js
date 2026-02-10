import { Model } from "sequelize";

const ContentSectionModel = (sequelize, DataTypes) => {
  class ContentSection extends Model {
    static associate(models) {}
  }

  ContentSection.init(
    {
      section_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      badge_text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      items: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
      }
    },
    {
      sequelize,
      modelName: "ContentSection"
    }
  );
  return ContentSection;
};

export default ContentSectionModel;
