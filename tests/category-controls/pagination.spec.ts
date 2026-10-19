// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Category Listing Controls', () => {
  test('Pagination via limit URL parameter', async ({ page }) => {
    // 1. Open category with limit=5 (UI minimum is 20, so use the URL parameter)
    await page.goto('index.php?route=product/category&path=20&limit=5', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.product-layout')).toHaveCount(5);
    await expect(page.getByText('Showing 1 to 5 of 12 (3 Pages)')).toBeVisible();
    await expect(page.locator('.pagination li')).toHaveText(['1', '2', '3', '>', '>|']);

    // 2. Click page 3
    await page.locator('.pagination').getByRole('link', { name: '3', exact: true }).click();
    await expect(page).toHaveURL(/page=3/);
    await expect(page.locator('.product-layout')).toHaveCount(2);
    await expect(page.getByText('Showing 11 to 12 of 12 (3 Pages)')).toBeVisible();

    // 3. Open page=99
    await page.goto('index.php?route=product/category&path=20&limit=5&page=99', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.product-layout')).toHaveCount(0);
    await expect(page.locator('#content h2')).toHaveText('Desktops');
    await expect(page.getByText(/Showing \d+ to/)).toHaveCount(0);
  });
});
