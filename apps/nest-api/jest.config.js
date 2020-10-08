module.exports = {
  name: 'nest-api',
  preset: '@shelf/jest-mongodb',
  coverageDirectory: '../../coverage/apps/nest-api',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  transformIgnorePatterns: ['^.+\\.js$'],
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
};
