module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/build',
    '<rootDir>/dist',
  ],
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  collectCoverage: true,
  coverageReporters: ['html'],
}
