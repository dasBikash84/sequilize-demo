const { Model, DataTypes } = require("sequelize");

const {sequelize} = require('../db_init');

const { getRandomDistrict } = require("../../utils/faker_utils");

class District extends Model {
  static async createRandom() {
    return await District.create(getRandomDistrict());
  }
}
District.init(
  {
    district: { type: DataTypes.STRING, allowNull: false,unique: true },
    district_bn: { type: DataTypes.STRING, allowNull: false, unique:true },
  },
  { 
    timestamps: false,sequelize }
);

module.exports = { District };
