const {
  root,
  getVehicleTypes,
  addVehicleType,
  deleteVehicleType,
} = require("./../controller/vehicleTypes");

const prefix = "/api";

const initRouter = (app) => {
  app.get(`${prefix}`, root);
  app.get(`${prefix}/vehicleTypes`, getVehicleTypes);
  app.post(`${prefix}/vehicleTypes`, addVehicleType);
  app.delete(`${prefix}/vehicleTypes/:id`, deleteVehicleType);
};

module.exports = {
  initRouter,
};
