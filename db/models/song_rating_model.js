const { DataTypes, Model } = require("sequelize");

const { Song } = require("./song_model");
const { User } = require("./user_model");
const { sequelize } = require("../db_init");
const { getRandomRating } = require("../../utils/faker_utils");

class SongRatings extends Model {
  static async createRamdomRating(song, user) {
    await SongRatings.create({
      SongId: song.id,
      UserId: user.id,
      rating: getRandomRating(),
    });
  }
}

SongRatings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    SongId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Song, // 'SongId' would also work
        key: "id",
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // 'Actors' would also work
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = { SongRatings };
