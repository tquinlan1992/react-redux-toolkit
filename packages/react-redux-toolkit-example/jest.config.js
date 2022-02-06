/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const sharedConfig = require('../../jest.config');
const { compilerOptions } = require('../../tsconfig.json');

module.exports = {
  ...sharedConfig,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: '<rootDir>/../../packages',
  }),
  setupFilesAfterEnv: ['<rootDir>./src/setupTests.ts'],
  rootDir: './',
  testMatch: ['./**/*.test.{ts,tsx}'],
};
