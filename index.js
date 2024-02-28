require("./db/associations");

const { runSedder } = require("./db/data/sedder");
(async () => {
  await runSedder();
})();
