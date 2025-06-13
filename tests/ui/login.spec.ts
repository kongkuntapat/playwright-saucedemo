import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

// 1. Import ข้อมูล User จากไฟล์ JSON
// Playwright/Node.js สามารถ import ไฟล์ JSON ได้โดยตรงเลย
import users from '../../data/users.json';

test.describe('SauceDemo Data-Driven Login', () => {

  // 2. ใช้ Loop เพื่อวนสร้างเทสเคสตามจำนวนข้อมูลที่มีในไฟล์ JSON
  for (const user of users) {

    // 3. สร้างเทสเคส โดยใช้ "name" จากข้อมูลในไฟล์ JSON มาเป็นชื่อเทส
    test(`Test Case: ${user.name}`, async ({ page }) => {

      const loginPage = new LoginPage(page);
      await loginPage.goto();

      // 4. ใช้ username และ password จาก object 'user' ปัจจุบันใน Loop
      await loginPage.login(user.username, user.password);

      // 5. ตรวจสอบผลลัพธ์ตามข้อมูลที่คาดหวังจากไฟล์ JSON
      if (user.should_pass) {
        // กรณีที่คาดหวังว่า Login จะสำเร็จ
        const expectedLocator = page.locator(user.expected_element);
        await expect(expectedLocator).toHaveText(user.expected_text);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      } else {
        // กรณีที่คาดหวังว่า Login จะล้มเหลว
        const errorLocator = page.locator(user.expected_element);
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toContainText(user.expected_text);
      }
    });
  }
});