// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Category Listing Controls', () => {
  test('Subcategory refine links and unknown category', async ({ page }) => {
    // 1. Open Desktops category and look at 'Refine Search'
    await page.goto('index.php?route=product/category&path=20', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Refine Search' })).toBeVisible();
    const content = page.locator('#content');
    await expect(content.getByRole('link', { name: 'PC (0)', exact: true })).toBeVisible();
    await expect(content.getByRole('link', { name: 'Mac (1)', exact: true })).toBeVisible();

    // 2. Open index.php?route=product/category&path=999
    const response = await page.goto('index.php?route=product/category&path=999', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle('Category not found!');
    await expect(page.locator('#content')).toContainText('Category not found!');
    await expect(page.locator('#content').getByRole('link', { name: 'Continue' })).toBeVisible();
  });
});
