const { Model, DataTypes } = require("sequelize");

const {sequelize} = require('../db_init');

const { getRandomSinger } = require("../../utils/faker_utils");

class Singer extends Model {
  static async createRandom() {
    return await Singer.create(getRandomSinger());
  }
}
Singer.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.TEXT, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    netWorth: { type: DataTypes.INTEGER, allowNull: true },
    image: DataTypes.STRING,
    birthdate: DataTypes.DATE,
  },
  { sequelize }
);

module.exports = { Singer };
