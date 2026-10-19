// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Guarded Pages Redirect', () => {
  test('Affiliate login is publicly reachable', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    // 1. Click footer Affiliate
    await page.locator('footer').getByRole('link', { name: 'Affiliate', exact: true }).click();

    await expect(page).toHaveURL(/route=affiliate\/login/);
    await expect(page.getByRole('heading', { name: 'Affiliate Program', level: 1 })).toBeVisible();
    await expect(page.getByText('affiliate program is free and enables members to earn revenue')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'New Affiliate' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Affiliate Login' })).toBeVisible();
  });
});
