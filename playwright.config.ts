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
    /* --- Project สำหรับ Setup การ Login (เพิ่มอันนี้เข้ามาเป็นอันแรก) --- */
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/, // สั่งให้ project นี้รันเฉพาะไฟล์ auth.setup.ts
    },

    /* --- Project สำหรับ UI Tests (แก้ไขของเดิม) --- */
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        // บอกให้ project นี้ใช้สถานะที่ถูกบันทึกไว้จาก setup
        storageState: 'playwright/.auth/user.json',
      },
      // (สำคัญ) บอกว่า project นี้ต้องรันหลังจาก project 'setup' ทำงานเสร็จ
      dependencies: ['setup'],
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://www.saucedemo.com',
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'ui-webkit',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://www.saucedemo.com',
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    /* --- Project สำหรับ API Tests (เหมือนเดิม) --- */
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
    },
  ],
});