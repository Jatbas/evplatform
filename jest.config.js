module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testMatch: ['**/tests/**/*.spec.ts', '**/src/**/*.spec.ts'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: [
        'src/**/*.(t|j)s',
        'tests/**/*.(t|j)s',
    ],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/src/common/$1',
        '^@companies/(.*)$': '<rootDir>/src/companies/$1',
        '^@stations/(.*)$': '<rootDir>/src/stations/$1'
    }
};