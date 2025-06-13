import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage'; // Path เปลี่ยนไปเล็กน้อย
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

// ลบ test.describe และ test.beforeEach ทั้งหมดทิ้งไปได้เลย!

test('E2E Flow with saved authentication', async ({ page }) => {
  // เทสของเราสามารถเริ่มต้นที่หน้าแรก (ที่ Login แล้ว) ได้เลย
  await page.goto('/inventory.html');
  // ตรวจสอบเพื่อให้แน่ใจว่าเรา Login เข้ามาแล้วจริงๆ
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // สร้าง instance ของ Page Objects ที่ต้องใช้
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // โค้ดส่วนที่เหลือเหมือนเดิมทุกประการ
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');
  await inventoryPage.goToCart();
  await cartPage.verifyItemInCart('Sauce Labs Backpack');
  await cartPage.goToCheckout();
  await checkoutPage.fillShippingInfo('Tester', 'Playwright', '10110');
  await checkoutPage.finishCheckout();
  await checkoutPage.verifyOrderComplete();
});