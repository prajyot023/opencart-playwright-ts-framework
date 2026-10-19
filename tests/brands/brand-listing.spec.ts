// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Brands', () => {
  test('Brand link opens brand product listing', async ({ page }) => {
    // 1. On the Brands page click 'Apple'
    await page.goto('index.php?route=product/manufacturer', { waitUntil: 'domcontentloaded' });
    await page.locator('#content').getByRole('link', { name: 'Apple', exact: true }).click();
    await expect(page).toHaveURL(/product\/manufacturer\/info&manufacturer_id=8/);
    await expect(page.getByRole('heading', { name: 'Apple', level: 2 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Apple Cinema 30"' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'iPhone', exact: true }).first()).toBeVisible();
    await expect(page.locator('.product-layout').first()).toBeVisible();
    await expect(page.locator('#input-sort')).toBeVisible();
    await expect(page.locator('#input-limit')).toBeVisible();
    await expect(page.locator('#list-view')).toBeVisible();
    await expect(page.locator('#grid-view')).toBeVisible();

    // 2. Sort by 'Price (Low > High)'
    await page.locator('#input-sort').selectOption({ label: 'Price (Low > High)' });
    await expect(page).toHaveURL(/sort=p\.price&order=ASC/);
    const priceTexts = await page.locator('.product-layout .price').allInnerTexts();
    const prices = priceTexts.map((t) => parseFloat(t.match(/\$([\d,]+\.\d+)/)![1].replace(/,/g, '')));
    expect(prices.length).toBeGreaterThan(1);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
