module.exports = {
  verbose:true,
  preset: 'react-native',
  "setupFiles": ["<rootDir>/jest/setup.js"],
  transform: {
    // '^.+\\.(ts|tsx)?$': 'ts-jest',
    // '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|react-redux|redux-persist)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/jest/fileMock.js',
  },
  collectCoverage: true,  // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Files to include in coverage report
    '!src/**/*.d.ts', // Exclude type declaration files
  ],
  coverageDirectory: 'coverage', // Output directory for coverage reports
  coverageReporters: ['json', 'html', 'text'], // Report formats
};

