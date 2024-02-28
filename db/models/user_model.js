const { Model, DataTypes } = require("sequelize");

const {sequelize} = require('../db_init');
const { getRandomUser } = require("../../utils/faker_utils");

class User extends Model {
  static async createRandom() {
    return await User.create(getRandomUser());
  }
}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.TEXT, allowNull: false },
    avatar: DataTypes.STRING,
    password: { type: DataTypes.STRING, allowNull: false },
    birthdate: DataTypes.DATE,
    registeredAt: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize }
);

module.exports = { User };
