// tests/e2e.spec.ts

import { test, expect } from '@playwright/test';

// --- Import Page Objects ทั้งหมดที่เราสร้างขึ้น ---
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('SauceDemo E2E Flow with POM', () => {

  // Hook: ทำการ Login ก่อนทุกๆ เทส
  // สังเกตว่าเราใช้ LoginPage ที่เราสร้างไว้ ทำให้ส่วนนี้สะอาดขึ้นมาก
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  // เทสเคสหลัก
  test('should add a product to the cart and checkout successfully', async ({ page }) => {
    // --- สร้าง instance ของ Page Objects ที่ต้องใช้ ---
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // --- เริ่มขั้นตอนการทดสอบ ---
    // สังเกตว่าโค้ดอ่านง่ายเหมือนเป็นบทสนทนา หรือ User Story
    // "เพิ่มสินค้า 'Sauce Labs Backpack' ลงตะกร้า"
    await inventoryPage.addProductToCart('sauce-labs-backpack');

    // "ตรวจสอบว่าตัวเลขบนตะกร้าเป็น '1'"
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // "ไปที่หน้าตะกร้า"
    await inventoryPage.goToCart();

    // "ตรวจสอบว่ามี 'Sauce Labs Backpack' อยู่ในตะกร้า"
    await cartPage.verifyItemInCart('Sauce Labs Backpack');
    
    // "ไปที่หน้า Checkout"
    await cartPage.goToCheckout();

    // "กรอกข้อมูลการจัดส่ง"
    await checkoutPage.fillShippingInfo('Tester', 'Playwright', '10110');
    
    // "กดยืนยันการสั่งซื้อ"
    await checkoutPage.finishCheckout();
    
    // "ตรวจสอบว่าการสั่งซื้อสำเร็จ"
    await checkoutPage.verifyOrderComplete();
  });
});