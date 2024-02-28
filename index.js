const {sequelize,User, Singer, Song, Album} = require('./models');

(async () => {
    await sequelize.sync({ force: true, logging: false/*(sql,timing) => console.log(`sql: ${sql}`) */});
    // const jane = await User.create({ name: "Jane" });
    // console.log(jane instanceof User); // true
    // console.log(jane.name); // "Jane"
    // console.log(jane.toJSON()); // "Jane"
    console.log((await User.createRandom()).toJSON());
    console.log((await Singer.createRandom()).toJSON());
    console.log((await Song.createRandom()).toJSON());
    console.log((await Album.createRandom()).toJSON());
  })();