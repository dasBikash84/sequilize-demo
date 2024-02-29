const { Op } = require("sequelize");
const { Album } = require("./models/album_model");
const { Singer } = require("./models/singer_model");
const { Song } = require("./models/song_model");
const { SongRatings } = require("./models/song_rating_model");
const { User } = require("./models/user_model");

// Get first 10 songs with album where album `id` in given list

const getSongsByAlbumId = async (albumIds, limit = 10) => {
  // return Song.findAll({ limit: limit,include: [{model:Album,where:{id: { [Op.in]: albumIds || [] }}}] });
  // above also works
  return Song.findAll({
    limit: limit,
    where: { AlbumId: { [Op.in]: albumIds || [] } },
  });
};

// Get all song titles of specific singer by id

const getSongTitlesById = async (singerId) => {
  const singer = await Singer.findOne({
    where: {
      id: singerId,
    },
    include: { model: Album, include: { model: Song } },
  });
  const songsTitles = [];
  for (const album of singer?.Albums || []) {
    for (const song of album?.Songs || []) {
      if (song?.title) {
        songsTitles.push(song?.title);
      }
    }
  }
  return songsTitles;
};

// Get average ratings by song for specific singer by id

const getSingerRatingsForSong = async (singerId) => {
  const singer = await Singer.findOne({    
    where: {
      id: singerId,
    },
    attributes:['id'],
    include: {
      model: Album,
      attributes:['id'],
      include: {
        model: Song,
        attributes:['id','title'],
        include: { 
            model: User, 
            attributes:['id'],
            all:true,
            nested:true
        },
      },
    },
  });
  const averageratings = {};
  for (const album of singer?.Albums || []) {
    for (const song of album?.Songs || []) {
      if (song?.title) {
        let totalRating = 0;
        let ratingCount = 0;
        for (const user of song?.Users || []) {
            if (user?.SongRatings?.rating != null) {
                ratingCount += 1;
                totalRating += (+user?.SongRatings?.rating);
            }
        }
        let averagerating;
        if (ratingCount != 0) {
            averagerating = totalRating / ratingCount;
        } else {
            averagerating = 0;
        }
        averageratings[song.title] = {
            averagerating,ratingCount,totalRating
        };
      }
    }
  }
  return averageratings;
};

module.exports.runDemo = async () => {
  console.log("running demo...");
  console.log((await getSongsByAlbumId([20])).map(el=> el.toJSON()));
  console.log(await getSongTitlesById(1));
  console.log(await getSingerRatingsForSong(1));
};
