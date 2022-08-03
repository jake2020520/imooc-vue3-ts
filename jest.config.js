/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>src/$1'
  },
  testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.(less|css)$': 'jest-less-loader' // 支持less
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lodash-es|other-es-lib))']
};
