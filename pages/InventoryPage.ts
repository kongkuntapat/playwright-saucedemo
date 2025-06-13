// pages/InventoryPage.ts

import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  // --- ประกาศ Locators ---
  // Locators คือตัวชี้ไปยัง Element ต่างๆ บนหน้าเว็บ
  readonly page: Page;
  readonly shoppingCartLink: Locator; // ไอคอนตะกร้าสินค้า
  readonly cartBadge: Locator;      // ตัวเลขบนไอคอนตะกร้า

  // --- Constructor ---
  // จะถูกเรียกใช้เมื่อมีการสร้าง Object จากคลาสนี้
  // ทำหน้าที่กำหนดค่าเริ่มต้นให้กับตัวแปร
  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // --- สร้าง Methods (ฟังก์ชันการทำงาน) ---

  /**
   * เพิ่มสินค้าลงตะกร้าโดยระบุชื่อสินค้า
   * @param productName - ชื่อสินค้าในรูปแบบ kebab-case เช่น 'sauce-labs-backpack'
   */
  async addProductToCart(productName: string) {
    // เราสร้าง locator แบบ dynamic โดยใช้ template string (`)
    // เพื่อให้สามารถระบุปุ่ม 'Add to cart' ของสินค้าชิ้นไหนก็ได้
    const addToCartButton = this.page.locator(`[data-test='add-to-cart-${productName}']`);
    await addToCartButton.click();
  }

  /**
   * ไปยังหน้าตะกร้าสินค้า
   */
  async goToCart() {
    await this.shoppingCartLink.click();
  }
}