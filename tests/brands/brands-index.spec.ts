// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Brands', () => {
  test('Brands page lists all brands grouped by letter', async ({ page }) => {
    // 1. Open index.php?route=product/manufacturer
    await page.goto('index.php?route=product/manufacturer', { waitUntil: 'domcontentloaded' });
    const content = page.locator('#content');
    await expect(page.getByRole('heading', { name: 'Find Your Favorite Brand' })).toBeVisible();
    await expect(content.getByText('Brand Index')).toBeVisible();
    for (const letter of ['A', 'C', 'H', 'P', 'S']) {
      await expect(content.getByText(letter, { exact: true }).first()).toBeVisible();
    }
    for (const brand of ['Apple', 'Canon', 'Hewlett-Packard', 'HTC', 'Palm', 'Sony']) {
      await expect(content.getByRole('link', { name: brand, exact: true })).toBeVisible();
    }

    // 2. Navigate instead via footer Extras > Brands from the home page
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });
    await page.locator('footer').getByRole('link', { name: 'Brands' }).click();
    await expect(page).toHaveURL(/route=product\/manufacturer$/);
    await expect(page.getByRole('heading', { name: 'Find Your Favorite Brand' })).toBeVisible();
    await expect(content.getByRole('link', { name: 'Apple', exact: true })).toBeVisible();
  });
});
