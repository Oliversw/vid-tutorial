// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  testEnvironment: "jest-environment-node",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};

module.exports = config;
