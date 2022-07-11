const { root, vehicleTypes } = require("./../controller/vehicleTypes");

const prefix = "/api";

const initRouter = (app) => {
  app.get(`${prefix}`, root);
  app.get(`${prefix}/vehicleTypes`, vehicleTypes);
};

module.exports = {
  initRouter,
};
