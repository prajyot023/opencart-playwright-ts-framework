// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Empty States', () => {
  test('Empty shopping cart page', async ({ page }) => {
    // 1. Open index.php?route=checkout/cart
    await page.goto('index.php?route=checkout/cart', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#content').getByRole('heading', { name: 'Shopping Cart', level: 1 })).toBeVisible();
    await expect(page.locator('#content').getByText('Your shopping cart is empty!', { exact: true })).toBeVisible();
    await expect(page.locator('#cart')).toContainText('0 item(s) - $0.00');
    await page.locator('#content').getByRole('link', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/route=common\/home/);

    // 2. Open index.php?route=checkout/checkout as guest with empty cart
    await page.goto('index.php?route=checkout/checkout', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/route=checkout\/cart/);
    await expect(page.locator('#content').getByText('Your shopping cart is empty!', { exact: true })).toBeVisible();
  });
});
