// const { Album } = require('./models/album_model');
// const { Singer } = require('./models/singer_model');
// const { Song } = require('./models/song_model');
// const {User} = require('./models/user_model');
// const {SongRatings} = require('./models/song_rating_model');

const {District} = require('./models/district_model');
const {Station} = require('./models/station_model');


// Album.hasOne(Singer);
// Singer.hasMany(Album);


// Song.hasOne(Album);
// Album.hasMany(Song);

// Song.belongsTo(Album,{foreignKey: 'album1_id'});
// Song.belongsTo(Album,{foreignKey:'album2_id'});

// Song.belongsToMany(User, { through: SongRatings });
// User.belongsToMany(Song, { through: SongRatings });

Station.belongsTo(District, { foreignKey: 'district_id' });


// station
// district