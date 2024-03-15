require("./db/associations");

const { runSedder } = require("./db/data/sedder");
const { runDemo } = require("./db/demo_utils");
const express = require("express");
const { District } = require("./db/models/district_model");
const { Station } = require("./db/models/station_model");
const { faker } = require("@faker-js/faker");
const app = express();

app.get("/stations", async (req, res) => {
  const stationData = [];
  const stations = await Station.findAll({
    // limit: 10,
    include: {
      model: District,
    },
  });
  const stationCount = stations.length;
  for (const station of stations) {
    const toCount = faker.number.int({ min: 1, max: 8 });
    const to = [];
    for (let index = 0; index < toCount; index++) {
      to.push(faker.number.int({ min: 1, max: stationCount }));
    }
    stationData.push({
      id: station.id,
      travel_mode: station.travel_mode,
      short_code: station.short_code,
      title: station.title,
      district_id: station.District.id,
      district: station.District.district,
      district_bn: station.District.district_bn,
      to: to,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: stationData,
  });
});

app.get("/", async (req, res) => {
  res.json({});
});

(async () => {
  await runSedder();
  app.listen(4000, () => {
    console.log(`Url: http://localhost:4000/`);
  });
})();
