const { Album } = require('./models/album_model');
const { Singer } = require('./models/singer_model');
const { Song } = require('./models/song_model');
const {User} = require('./models/user_model');
const {SongRatings} = require('./models/song_rating_model');

Singer.hasOne(Album);
Album.belongsTo(Singer);

Album.hasOne(Song);
Song.belongsTo(Album);

Song.belongsToMany(User, { through: SongRatings });
User.belongsToMany(Song, { through: SongRatings });