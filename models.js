const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const {
  getRandomUser,
  getRandomSinger,
  getRandomSong,
  getRandomAlbum,
} = require("./faker_utils");

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

class Album extends Model {
  static async createRandom() {
    return await Album.create(getRandomAlbum());
  }
}

Album.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize }
);

class Song extends Model {
  static async createRandom() {
    return await Song.create(getRandomSong());
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

const SongRatings = sequelize.define('SongRatings', {
    SongId: {
      type: DataTypes.INTEGER,
      references: {
        model: Song, // 'SongId' would also work
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // 'Actors' would also work
        key: 'id'
      }
    },
    rating:{
        type: DataTypes.INTEGER
    }
  });

module.exports = {
  sequelize,
  User,
  Singer,
  Song,
  Album,
};
