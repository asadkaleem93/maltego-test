import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // For TypeScript files
        '^.+\\.jsx?$': 'babel-jest', // For JS and JSX files
        // Add the following transform for any node_modules packages that use ESM syntax
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!antd)/',  // Ensure `antd` is transformed
    ],
    moduleNameMapper: {
        '^antd/es/(.*)$': 'antd/lib/$1', // Make sure imports like `antd/es/` are mapped correctly
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)