const { Model, DataTypes } = require("sequelize");

const {sequelize} = require('../db_init');

const {
  getRandomAlbum,
} = require("../../utils/faker_utils");

class Album extends Model {
  static async createRandom(singer) {
    const randomAlbumData = getRandomAlbum();
    return await Album.create(
      {
        SingerId: singer.id,
        ... randomAlbumData
      }
    );
  }
}

Album.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize }
);

module.exports = {Album};