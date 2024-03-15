const { Model, DataTypes } = require("sequelize");

const {sequelize} = require('../db_init');
const { faker } = require("@faker-js/faker");
// const { getRandomStation2 } = require("../../utils/faker_utils");

const getRandomStation2 = ()=>{
  return {
    title: faker.location.city(),
    // title_bn: faker.person.firstName(),
    short_code: faker.location.secondaryAddress(),
    travel_mode: travelModes[faker.number.int(travelModes.length-1)]
  };
}

class Station extends Model {
  static async createRandom(district) {
    return await Station.create({...getRandomStation2(),district_id:district.id});
  }
}

const travelModeEnum = {
  AIR: "air",
  BUS: "bus",
  SHIP: "ship",
};

const travelModes = Object.values(travelModeEnum);

Station.init(
  {
    title: { type: DataTypes.STRING, allowNull: false,unique: true },
    // title_bn: { type: DataTypes.STRING, allowNull: false, unique:true },
    short_code: { type: DataTypes.STRING, allowNull: false, },
    travel_mode: { type: DataTypes.ENUM(Object.values(travelModeEnum)), allowNull: false, },
  },
  { 
    timestamps: false,sequelize }
);

module.exports = { Station,travelModeEnum };
