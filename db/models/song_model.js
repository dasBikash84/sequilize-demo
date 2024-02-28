const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db_init");

const { getRandomSong } = require("../../utils/faker_utils");

class Song extends Model {
  static async createRandom(album) {
    const randomSongData = getRandomSong();
    return await Song.create({
      AlbumId: album.id,
      ...randomSongData,
    });
  }
}

Song.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.TEXT, allowNull: false },
    durationSec: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize }
);

module.exports = { Song };
