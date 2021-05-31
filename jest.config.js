module.exports = {
    verbose:true,
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverageFrom: ["src/**/*.js"],
    coverageThreshold:{
        global:{
            branches: 75,
            functions: 75,
            lines: 75,
            statements: 75
          },
    },
    modulePathIgnorePatterns: ['mock.js']
}