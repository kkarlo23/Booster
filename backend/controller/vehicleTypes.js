const { ObjectId } = require("mongodb");
const { getClient, getConfig } = require("./../db/connection");
const { FIND_VEHICLE_TYPES_AGGREGATION_QUERY } = require("./../db/queries");
const { getYearIfExistsFromQuery } = require("./../helpers/helpers");

/** @type {import("express").RequestHandler} */
const root = (req, res) => {
  return res.send("Hello World!");
};
/** @type {import("express").RequestHandler} */
const getVehicleTypes = async (req, res) => {
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
    let dbRes;
    dbRes = await collection
      .aggregate(
        FIND_VEHICLE_TYPES_AGGREGATION_QUERY(qQuery, origin, qRows, qPage)
      )
      .toArray();
    return res.send(dbRes);
  } catch (error) {
    console.error(error);
    return res.send("Something went wrong");
  }
};

/** @type {import("express").RequestHandler} */
const addVehicleType = async (req, res) => {
  try {
    const { make, model, year } = req.body;
    const client = getClient();
    const config = getConfig();
    const collection = client.db(config.db).collection(config.collection);

    if (!make || !model || !year) {
      return res.send("All fields are required");
    }
    if (typeof make !== "string" || typeof model !== "string") {
      return res.send("wrong format");
    }
    if (typeof year !== "number") {
      return res.send("wrong format");
    }
    const newVehicleType = {
      make: make.toUpperCase(),
      model: model.toUpperCase(),
      year,
    };
    let dbRes = await collection.findOne(newVehicleType);

    if (dbRes != null) {
      return res.send("Vehicle type already exists");
    }
    dbRes = await collection.insertOne(newVehicleType);
    console.log(`Vehicle added. ID: ${newVehicleType._id}`);

    return res.send(newVehicleType);
  } catch (error) {
    console.error(error);
    return res.send("Something went wrong");
  }
};
/** @type {import("express").RequestHandler} */
const deleteVehicleType = async (req, res) => {
  try {
    const { id } = req.params;
    const client = getClient();
    const config = getConfig();
    const collection = client.db(config.db).collection(config.collection);
    const dbRes = await collection.deleteOne({ _id: new ObjectId(id) });

    if (dbRes.deletedCount === 0) {
      return res.send("vehicle type does not exist");
    }

    console.log(`Vehicle deleted. ID: ${id} `);

    return res.send("vehicle type deleted");
  } catch (error) {
    console.error(error);
    return res.send("Something went wrong");
  }
};

module.exports = {
  root,
  getVehicleTypes,
  addVehicleType,
  deleteVehicleType,
};
