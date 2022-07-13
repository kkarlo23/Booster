const express = require("express");
const { initClient } = require("./db/connection");
const { processArgs } = require("./helpers/helpers");
const { initRouter } = require("./router/router");
const { consoleOverride } = require("./helpers/consoleOverride");

const app = express();
app.use(express.json());
const port = 3000;

const args = processArgs(process.argv);

consoleOverride(Number(args.loggingLevel));
const config = JSON.parse(JSON.stringify(require(args.configPath)));
initClient(config);
initRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("SIGINT", () => {
  client.close().then(() => {
    process.exit();
  });
});
