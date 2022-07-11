const express = require("express");
const { initClient } = require("./db/connection");
const { processArgs } = require("./helpers/helpers");
const { initRouter } = require("./router/router");

const app = express();
const port = 3000;

const args = processArgs(process.argv);
console.log(args);
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
