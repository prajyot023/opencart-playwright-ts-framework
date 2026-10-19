// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Category Listing Controls', () => {
  test('Show limit dropdown options and persistence', async ({ page }) => {
    // 1. Read the Show dropdown on Desktops
    await page.goto('index.php?route=product/category&path=20', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#input-limit option')).toHaveText(['20', '25', '50', '75', '100']);
    await expect(page.locator('#input-limit option:checked')).toHaveText('20');

    // 2. Select 25
    await page.locator('#input-limit').selectOption({ label: '25' });
    await expect(page).toHaveURL(/limit=25/);
    await expect(page.getByText('Showing 1 to 12 of 12 (1 Pages)')).toBeVisible();
    await expect(page.locator('.product-layout')).toHaveCount(12);
    await expect(page.locator('#input-limit option:checked')).toHaveText('25');
  });
});
