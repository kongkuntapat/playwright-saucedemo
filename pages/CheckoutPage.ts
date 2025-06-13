// pages/CheckoutPage.ts

import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {
  // --- Locators ---
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  // --- Constructor ---
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  // --- Methods ---

  /**
   * กรอกข้อมูลการจัดส่งและกด Continue
   */
  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * กดปุ่ม Finish ในหน้าสรุปรายการ
   */
  async finishCheckout() {
    await this.finishButton.click();
  }

  /**
   * ตรวจสอบว่าการสั่งซื้อเสร็จสมบูรณ์
   */
  async verifyOrderComplete() {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}