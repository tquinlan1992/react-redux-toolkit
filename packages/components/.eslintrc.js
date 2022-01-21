// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootEslint = require('../../.eslintrc');

module.exports = { ...rootEslint,
  extends: ["plugin:storybook/recommended"]
};