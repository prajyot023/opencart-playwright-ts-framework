// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Guarded Pages Redirect', () => {
  test('Account-only pages redirect guests to login', async ({ page }) => {
    const routes = [
      'account/address', 'account/order', 'account/download', 'account/reward',
      'account/transaction', 'account/newsletter', 'account/edit',
      'account/password', 'account/wishlist', 'account/return',
    ];

    // 1. For each route navigate as a guest
    for (const route of routes) {
      await test.step(`Guest opens ${route}`, async () => {
        await page.goto(`index.php?route=${route}`, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveURL(/route=account\/login/);
        await expect(page.getByRole('heading', { name: 'New Customer' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
      });
    }
  });
});
