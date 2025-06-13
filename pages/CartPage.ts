// pages/CartPage.ts

import { type Page, type Locator, expect } from '@playwright/test'; // <-- เพิ่ม expect เข้าไปตรงนี้

export class CartPage {
  // --- Locators ---
  readonly page: Page;
  readonly checkoutButton: Locator;

  // --- Constructor ---
  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  // --- Methods ---

  /**
   * ตรวจสอบว่ามีสินค้าชื่อที่ระบุอยู่ในตะกร้า
   * @param itemName - ชื่อเต็มของสินค้า เช่น 'Sauce Labs Backpack'
   */
  async verifyItemInCart(itemName: string) {
    // page.getByText() เป็นวิธีที่สะดวกในการหา Element จากข้อความที่มองเห็น
    const item = this.page.getByText(itemName);
    await expect(item).toBeVisible(); // ใช้ expect เพื่อยืนยันว่า Element นั้นมีอยู่จริง
  }

  /**
   * กดปุ่มเพื่อไปยังหน้า Checkout
   */
  async goToCheckout() {
    await this.checkoutButton.click();
  }
}