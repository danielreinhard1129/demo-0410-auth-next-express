/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/prisma.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
};
