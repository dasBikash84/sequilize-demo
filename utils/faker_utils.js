const { faker } = require('@faker-js/faker');
const { travelModeEnum } = require('../db/models/station_model');

// const fakerBn = new Faker('ru');

module.exports.getRandomUser = ()=>{
  return {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

module.exports.getRandomSinger = ()=>{
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    image: faker.image.url(),
    birthdate: faker.date.birthdate(),
    phone: faker.phone.number(),
    netWorth: faker.finance.amount({max: 1000000000}),

  };
}

module.exports.getRandomAlbum = ()=>{
  return {
    title: faker.music.songName(),
    releaseDate: faker.date.birthdate(),
  };
}

module.exports.getRandomSong = ()=>{
  return {
    title: faker.music.songName(),
    genre: faker.music.genre(),
    durationSec: faker.number.int({max: 600}),
  };
}

module.exports.getRandomRating = () => faker.number.int({min:1,max:10});


// const travelModes = Object.values(travelModeEnum);

module.exports.getRandomDistrict = ()=>{
  return {
    district: faker.location.city(),
    district_bn: faker.person.firstName(),
  };
}


module.exports.getRandomStation2 = ()=>{
  return {
    title: faker.location.city(),
    // title_bn: faker.location.city(),
    short_code: faker.location.secondaryAddress(),
    travel_mode: Object.values(travelModeEnum)[faker.number.int(travelModes.length-1)]
  };
}
