const { MongoClient, ServerApiVersion } = require("mongodb");

let config;
let client;

const initClient = (cfg) => {
  config = cfg;
  const uri = `mongodb+srv://${config.username}:${config.password}@cluster0.v1pkm.mongodb.net/?retryWrites=true&w=majority`;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
};

const getClient = () => client;
const getConfig = () => config;

module.exports = {
  initClient,
  getClient,
  getConfig,
};
