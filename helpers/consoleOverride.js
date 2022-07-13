const dayjs = require("dayjs");

const messageFormat = (type, message) => {
  const time = dayjs().format("DD.MM.YYYY HH:mm:ss");
  return `[${time}] : [${type}] ${message}`;
};

// function that overrides global console methods with custom ones for better logging
const consoleOverride = (loggingLevel) => {
  const oldConsole = { ...console };

  console.info = (message) => {
    if (loggingLevel <= 10) oldConsole.info(messageFormat("INFO", message));
  };
  console.log = (message) => {
    if (loggingLevel <= 20) oldConsole.log(messageFormat("LOG", message));
  };
  console.warn = (message) => {
    if (loggingLevel <= 30) oldConsole.warn(messageFormat("WARN", message));
  };
  console.error = (message) => {
    if (loggingLevel <= 40) oldConsole.error(messageFormat("ERROR", message));
  };
};

module.exports = {
  consoleOverride,
};
