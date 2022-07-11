const FIND_VEHICLE_TYPES_AGGREGATION_QUERY = (query, origin, rows, page) => {
  console.log(query, origin, rows, page);
  // In case query is empty it omits text search and only search year (if empty defaults to current year)
  const should = [
    {
      near: {
        path: "year",
        origin,
        pivot: 5,
      },
    },
  ];
  if (query) {
    should.push({
      text: {
        query,
        path: ["make", "model"],
        fuzzy: {},
      },
    });
  }

  return [
    {
      $search: {
        index: "fuzzy",
        compound: {
          should: should,
        },
      },
    },
    {
      $skip: Number(page - 1) * Number(rows),
    },
    {
      $limit: Number(rows),
    },
  ];
};

module.exports = {
  FIND_VEHICLE_TYPES_AGGREGATION_QUERY,
};
