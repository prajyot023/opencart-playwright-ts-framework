// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Empty States', () => {
  test('Wishlist for guests', async ({ page }) => {
    // 1. Open index.php?route=account/wishlist as guest
    await page.goto('index.php?route=account/wishlist', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/route=account\/login/);
    await expect(page.locator('#content').getByRole('heading', { name: 'New Customer' })).toBeVisible();
    await expect(page.locator('#top').getByRole('link', { name: 'Wish List (0)' })).toBeVisible();
  });
});
