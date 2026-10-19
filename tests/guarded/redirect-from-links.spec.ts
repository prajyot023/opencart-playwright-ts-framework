// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Guarded Pages Redirect', () => {
  test('Guarded pages from footer and sitemap links', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    // 1. Click footer 'Order History' then 'Newsletter' as guest
    await page.locator('footer').getByRole('link', { name: 'Order History', exact: true }).click();
    await expect(page).toHaveURL(/route=account\/login/);

    await page.locator('footer').getByRole('link', { name: 'Newsletter', exact: true }).click();
    await expect(page).toHaveURL(/route=account\/login/);

    // 2. Click header 'Wish List (0)'
    await page.locator('#top').getByRole('link', { name: 'Wish List (0)' }).click();
    await expect(page).toHaveURL(/route=account\/login/);
    await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
  });
});
