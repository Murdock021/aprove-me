module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts', // Inclui todos os arquivos TypeScript em src para cobertura
  ],
  coverageDirectory: './coverage',
  testMatch: [
    '**/test/e2e/**/*.spec.ts', // Testes e2e
    '**/test/unit/**/*.spec.ts', // Testes unitários
    '**/test/users/**/*.spec.ts', // Testes específicos de users
    '**/test/payable/**/*.spec.ts', // Testes específicos de payable
    '**/test/auth/**/*.spec.ts', // Testes específicos de auth
    '**/test/assignor/**/*.spec.ts', // Testes específicos de assignor
  ],
  testPathIgnorePatterns: ['/node_modules/'], // Ignora node_modules
};
