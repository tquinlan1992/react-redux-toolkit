/* eslint-disable @typescript-eslint/no-var-requires */
const cracoConfig = require('@tquinlan1992/react-redux-toolkit/cracoConfig');
const tsconfig = require('../../tsconfig.paths.json');

module.exports = cracoConfig({
  tsconfig,
  tsconfigRelativeBaseUrl: '/../',
});
