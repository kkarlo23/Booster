const dayjs = require("dayjs");

const messageFormat = (type, message) => {
  const time = dayjs().format("DD.MM.YYYY HH:mm:ss");
  return `[${time}] : [${type}] ${message}`;
};

// function that overrides global console methods with custom ones for better logging
const consoleOverride = () => {
  const oldConsole = { ...console };
  console.info = (message) => {
    oldConsole.info(messageFormat("INFO", message));
  };
  console.log = (message) => {
    oldConsole.log(messageFormat("LOG", message));
  };
  console.warn = (message) => {
    oldConsole.warn(messageFormat("WARN", message));
  };
  console.error = (message) => {
    oldConsole.error(messageFormat("ERROR", message));
  };
};

module.exports = {
  consoleOverride,
};
