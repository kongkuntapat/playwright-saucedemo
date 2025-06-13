import { test, expect } from '@playwright/test';

test.describe('SauceDemo Visual Regression Testing', () => {

  test('Login page should look the same', async ({ page }) => {
    // 1. ไปที่หน้าเว็บ saucedemo
    await page.goto('/');

    // 2. สั่งให้ Playwright ตรวจสอบ Screenshot
    // โดยตั้งชื่อ snapshot ว่า 'login-page.png'
    await expect(page).toHaveScreenshot('login-page.png', { maxDiffPixels: 100 });
    // { maxDiffPixels: 100 } คือการอนุโลมให้มีพิกเซลต่างกันได้ไม่เกิน 100 px
    // เพื่อป้องกัน false positive จากการเรนเดอร์เล็กๆ น้อยๆ ของเบราว์เซอร์
  });
});