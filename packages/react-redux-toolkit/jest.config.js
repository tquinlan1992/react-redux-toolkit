const sharedConfig = require('../../jest.config.js');

module.exports = {
  ...sharedConfig,
  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
};
