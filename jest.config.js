/*eslint-env node*/
module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "\\.[jt]sx?$": "babel-jest",
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!(tiled-property-flattener)/)",
  ],
  testEnvironment: 'jsdom',
  clearMocks: true
};
