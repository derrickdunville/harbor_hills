import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        // Handle module aliases
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/app/(.*)$': '<rootDir>/src/app/$1',
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)