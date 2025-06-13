import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // กำหนดโฟลเดอร์หลักของเทสทั้งหมด (ไม่จำเป็นต้องใส่ เพราะเราจะไปกำหนดในแต่ละ project)
  // testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // use: Block กลาง จะเป็นการตั้งค่าร่วมที่ทุก project จะได้รับไป
  // เราจะย้าย baseURL ไปไว้ในแต่ละ project แทน
  use: {
    trace: 'on-first-retry',
  },

  /* ===== กำหนดค่า Projects ของเราตรงนี้ ===== */
  projects: [
    /* --- Project สำหรับ UI Tests --- */
    {
      name: 'ui-chromium',
      testDir: './tests/ui', // ระบุว่าให้รันเทสเฉพาะในโฟลเดอร์ ui
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com', // baseURL สำหรับ UI
      },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://www.saucedemo.com',
      },
    },
    {
      name: 'ui-webkit',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://www.saucedemo.com',
      },
    },

    /* --- Project สำหรับ API Tests --- */
    {
      name: 'api-tests',
      testDir: './tests/api', // ระบุว่าให้รันเทสเฉพาะในโฟลเดอร์ api
      use: {
        // ไม่ต้องใช้ device สำหรับ API test
        baseURL: 'https://jsonplaceholder.typicode.com', // baseURL สำหรับ API
      },
    },
  ],
});