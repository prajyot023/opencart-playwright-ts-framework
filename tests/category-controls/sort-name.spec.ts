// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Category Listing Controls', () => {
  test('Sort by name A-Z and Z-A', async ({ page }) => {
    await page.goto('index.php?route=product/category&path=20', { waitUntil: 'domcontentloaded' });
    const names = page.locator('.product-layout .caption h4 a');

    // 1. Select 'Name (A - Z)'
    await page.locator('#input-sort').selectOption({ label: 'Name (A - Z)' });
    await expect(page).toHaveURL(/sort=pd\.name&order=ASC/);
    await expect(names).toHaveCount(12);
    const asc = (await names.allTextContents()).map((n) => n.trim());
    const expectedAsc = [...asc].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    expect(asc).toEqual(expectedAsc);

    // 2. Select 'Name (Z - A)'
    await page.locator('#input-sort').selectOption({ label: 'Name (Z - A)' });
    await expect(page).toHaveURL(/sort=pd\.name&order=DESC/);
    await expect(names).toHaveCount(12);
    const desc = (await names.allTextContents()).map((n) => n.trim());
    expect(desc).toEqual([...asc].reverse());
  });
});
