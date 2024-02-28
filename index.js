require("./db/associations");

const { runSedder } = require("./db/data/sedder");
const { runDemo } = require("./db/demo_utils");
(async () => {
  await runSedder();
  await runDemo();
})();
