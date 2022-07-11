const ACCEPTABLE_YEAR_MIN = 1900;
const ACCEPTABLE_YEAR_MAX = 2030;

const processArgs = (argv) => {
  const processArguments = {};
  const args = argv.slice(2, argv.length);
  for (let arg of args) {
    const splited = arg.split("=");
    const key = splited[0];
    const val = splited[1];
    processArguments[key] = val;
  }
  return processArguments;
};

const isNumber = (string) => {
  return !isNaN(Number(string));
};

// returns first valid year mentioned in search
// if year is not specified, it returns current year
// eg. query = "audi 2015 a6 2000" -> returns 2015 and it uses 2015 for aggregation query
const getYearIfExistsFromQuery = (query) => {
  let year = new Date().getFullYear();
  const words = query.split(" ");

  for (let word of words) {
    if (
      isNumber(word) &&
      Number(word) > ACCEPTABLE_YEAR_MIN &&
      Number(word) < ACCEPTABLE_YEAR_MAX
    ) {
      year = Number(word);
    }
  }
  return year;
};

module.exports = { processArgs, getYearIfExistsFromQuery };
