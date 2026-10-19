// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Category Listing Controls', () => {
  test('Sort by rating and model', async ({ page }) => {
    await page.goto('index.php?route=product/category&path=20', { waitUntil: 'domcontentloaded' });
    const names = page.locator('.product-layout .caption h4 a');
    const read = async () => (await names.allTextContents()).map((n) => n.trim());

    // 1. Select 'Rating (Highest)' then 'Rating (Lowest)'
    await page.locator('#input-sort').selectOption({ label: 'Rating (Highest)' });
    await expect(page).toHaveURL(/sort=rating&order=DESC/);
    await expect(names).toHaveCount(12);
    const high = await read();

    await page.locator('#input-sort').selectOption({ label: 'Rating (Lowest)' });
    await expect(page).toHaveURL(/sort=rating&order=ASC/);
    await expect(names).toHaveCount(12);
    const low = await read();
    expect([...low].sort()).toEqual([...high].sort());

    // 2. Select 'Model (A - Z)' then 'Model (Z - A)'
    await page.locator('#input-sort').selectOption({ label: 'Model (A - Z)' });
    await expect(page).toHaveURL(/sort=p\.model&order=ASC/);
    await expect(names).toHaveCount(12);
    const modelAsc = await read();
    expect([...modelAsc].sort()).toEqual([...high].sort());

    await page.locator('#input-sort').selectOption({ label: 'Model (Z - A)' });
    await expect(page).toHaveURL(/sort=p\.model&order=DESC/);
    await expect(names).toHaveCount(12);
    const modelDesc = await read();
    expect(modelDesc).toEqual([...modelAsc].reverse());
  });
});
