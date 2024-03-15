const { faker } = require("@faker-js/faker");
const { sequelize } = require("../db_init");

const { Op } = require("sequelize");

const { District } = require("../models/district_model");
const { Station } = require("../models/station_model");

const districtCount = 64;
const stationCount = 4000;

async function seedDistrictData() {
  console.log("running District seeder...");
  do {
    try {
      await District.createRandom();
    } catch (error) {}
    if ((await District.count()) >= districtCount) {
      break;
    }
  } while (true);
}

const getRandomDistrictFromDb = async () => {
  const districtId = faker.number.int({ min: 1, max: districtCount });
  return District.findOne({ where: { id: districtId } });
};

async function seedStationData() {
  console.log("running station seeder...");

  do {
    const district = await getRandomDistrictFromDb();
    try {
      await Station.createRandom(district);
    } catch (error) {
      // console.log(error);
    }
    if ((await Station.count()) >= stationCount) {
      break;
    }
  } while (true);
}

/*const { Singer } = require("../models/singer_model");
const { User } = require("../models/user_model");
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
*/
module.exports.runSedder = async () => {
  await sequelize.sync({ force: true, logging: false });
  await seedDistrictData();
  console.log("District entry added: ", await District.count());
  // await seedUserData();
  // console.log("User entry added: ", await User.count());
  await seedStationData();
  console.log("Station Added: ", await Station.count());
  // console.log("Song entry added: ", await Song.count());
  // await seedRatingData();
  // console.log("Rating entry added: ", await SongRatings.count());
};
