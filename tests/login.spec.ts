import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // import class ที่เราสร้าง

test.describe('SauceDemo Login with POM', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page); // สร้าง object จาก class

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page); // สร้าง object จาก class

    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });
});