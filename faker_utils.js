// CJS
const { faker } = require('@faker-js/faker');

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

module.exports.getRandomRating = () => faker.number.int({max:5});