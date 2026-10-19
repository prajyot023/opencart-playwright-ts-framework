// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Empty States', () => {
  test('Empty compare and empty category pages', async ({ page }) => {
    // 1. Open index.php?route=product/compare with nothing added
    await page.goto('index.php?route=product/compare', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#content').getByRole('heading', { name: 'Product Comparison' })).toBeVisible();
    await expect(page.locator('#content').getByText('You have not chosen any products to compare.', { exact: true })).toBeVisible();
    await expect(page.locator('#content').getByRole('link', { name: 'Continue' })).toBeVisible();

    // 2. Open Software category or any category reporting no products
    await page.goto('index.php?route=product/category&path=17', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#content').getByRole('heading', { name: 'Software' })).toBeVisible();
    await expect(page.locator('#content').getByText('There are no products to list in this category.', { exact: true })).toBeVisible();
    await expect(page.locator('#content').getByRole('link', { name: 'Continue' })).toBeVisible();
  });
});
