const { getClient, getConfig } = require("./../db/connection");
const { FIND_VEHICLE_TYPES_AGGREGATION_QUERY } = require("./../db/queries");
const { getYearIfExistsFromQuery } = require("./../helpers/helpers");

/** @type {import("express").RequestHandler} */
const root = (req, res) => {
  return res.send("Hello World!");
};
/** @type {import("express").RequestHandler} */
const vehicleTypes = async (req, res) => {
  try {
    const client = getClient();
    const config = getConfig();
    const collection = client.db(config.db).collection(config.collection);
    const defaultRows = 10;
    const defaultPage = 1;
    const defaultQuery = "";
    const { query, rows, page } = req.query;
    const qRows = rows ? rows : defaultRows;
    const qPage = page ? page : defaultPage;
    const qQuery = query ? query : defaultQuery;
    const origin = getYearIfExistsFromQuery(qQuery);
    let data;
    data = await collection
      .aggregate(
        FIND_VEHICLE_TYPES_AGGREGATION_QUERY(qQuery, origin, qRows, qPage)
      )
      .toArray();
    return res.send(data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  root,
  vehicleTypes,
};
