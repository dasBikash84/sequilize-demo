const { faker } = require("@faker-js/faker");
const { Singer } = require("../models/singer_model");
const { User } = require("../models/user_model");
const { sequelize } = require("../db_init");
const { Album } = require("../models/album_model");
const { Song } = require("../models/song_model");
const { SongRatings } = require("../models/song_rating_model");

const singerCount = 50;
const userCount = 1000;
const albumCount = 200;
const minSongInAlbum = 3;
const maxSongInAlbum = 3;
const avgRatingPerSong = 3;

async function seedUserData() {
  console.log("running user seeder...");
  for (let index = 0; index < userCount; index++) {
    await User.createRandom();
  }
}

async function seedSingerData() {
  console.log("running singer seeder...");
  for (let index = 0; index < singerCount; index++) {
    await Singer.createRandom();
  }
}

async function seedAlbumData() {
  console.log("running singer+song seeder...");

  for (let index = 0; index < albumCount; index++) {
    const singer = await getRandomSingerFromDb();
    const album = await Album.createRandom(singer);

    const songsInAlbum = faker.number.int({
      max: maxSongInAlbum,
      min: minSongInAlbum,
    });

    for (let j = 0; j < songsInAlbum; j++) {
      await Song.createRandom(album);
    }
  }5
}

async function seedRatingData() {
  console.log("running rating seeder...");

  const ratingCount = (await Song.count()) * avgRatingPerSong;

  for (let index = 0; index < ratingCount; index++) {
    const user = await getRandomUserFromDb();
    const song = await getRandomSongFromDb();
    try {
      await SongRatings.createRamdomRating(song, user);
    } catch (error) {
      error += 1;
    }
  }
  //   console.log(errorCount);
}

const getRandomSingerFromDb = async () => {
  const singerId = faker.number.int({ min: 1, max: singerCount });
  return Singer.findOne({ where: { id: singerId } });
};

const getRandomUserFromDb = async () => {
  const userId = faker.number.int({ min: 1, max: userCount });
  return User.findOne({ where: { id: userId } });
};

const getRandomAlbumFromDb = async () => {
  const albumId = faker.number.int({ min: 1, max: albumCount });
  return Album.findOne({ where: { id: albumId } });
};
10;

const getRandomSongFromDb = async () => {
  const songCount = await Song.count();
  const songId = faker.number.int({ min: 1, max: songCount });
  return Song.findOne({ where: { id: songId } });
};

const getRandomRatingFromDb = async () => {
  const ratingCount = await SongRatings.count();
  const ratingId = faker.number.int({ min: 1, max: ratingCount });
  return SongRatings.findOne({ where: { id: ratingId } });
};

module.exports.runSedder = async () => {
  await sequelize.sync({ force: true, logging: false });
  await seedSingerData();
  console.log("Singer entry added: ", await Singer.count());
  await seedUserData();
  console.log("User entry added: ", await User.count());
  await seedAlbumData();
  console.log("Album Added: ", await Album.count());
  console.log("Song entry added: ", await Song.count());
  await seedRatingData();
  console.log("Rating entry added: ", await SongRatings.count());
};
