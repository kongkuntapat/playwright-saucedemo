import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// กำหนด path ของไฟล์ที่จะใช้เก็บสถานะการ Login
const authFile = 'playwright/.auth/user.json';

// เราใช้ test.describe จาก 'setup' เพื่อบอกว่านี่คือส่วนหนึ่งของ setup project
setup('authenticate', async ({ page }) => {
  // ทำขั้นตอนการ Login ตามปกติโดยใช้ POM
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // รอจนกว่าจะแน่ใจว่าได้ไปที่หน้า inventory แล้ว
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');

  // คำสั่งสำคัญ: บันทึกสถานะของ context (cookies, local storage) ไปยังไฟล์ที่กำหนด
  await page.context().storageState({ path: authFile });
});