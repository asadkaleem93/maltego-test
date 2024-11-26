import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',

        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!antd)/',
    ],
    moduleNameMapper: {
        '^antd/es/(.*)$': 'antd/lib/$1',
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)