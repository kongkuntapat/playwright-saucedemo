import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  // 1. ประกาศ Properties (ตัวแปร) ของคลาส
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // 2. Constructor: กำหนดค่าเริ่มต้นให้กับ Properties ทั้งหมด
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // 3. Methods: ฟังก์ชันการทำงานของหน้านี้
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password_val: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password_val);
    await this.loginButton.click();
  }
}