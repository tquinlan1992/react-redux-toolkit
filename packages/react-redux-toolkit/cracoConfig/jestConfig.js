const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = ({ tsconfig, tsconfigRelativeBaseUrl }) => {
  return {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      // This has to match the baseUrl defined in tsconfig.json.
      // prefix: "<rootDir>/../../packages",
      prefix: `<rootDir>${tsconfigRelativeBaseUrl}`,
    }),
    setupFilesAfterEnv: ['<rootDir>./src/setupTests.ts'],
    rootDir: './',
    testMatch: ['./**/*.test.{ts,tsx}'],
    collectCoverageFrom: ['**/*.{ts,tsx}'],
  };
};
