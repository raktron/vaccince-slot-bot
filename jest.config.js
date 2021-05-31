module.exports = {
    verbose:true,
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverageFrom: ["src/**/*.js"],
    modulePathIgnorePatterns: ['mock.js']
}