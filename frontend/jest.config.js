module.exports = {
  "roots": [
    "./src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
  ],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/src/__tests__/styleMock.js',
    '\\worker-loader!./(.*Worker.js)$': '<rootDir>/src/__mocks__/$1',
  },
}
