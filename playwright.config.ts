import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'src/app/e2eTests',
    timeout: 30000,
    retries: 2,
    use: {
        headless: true,
        baseURL: 'http://localhost:3000',
    },
});