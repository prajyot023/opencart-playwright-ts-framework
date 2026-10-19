// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Search Refinement', () => {
  test('Search no results empty state', async ({ page }) => {
    // 1. Open index.php?route=product/search&search=zzzzqq
    await page.goto('index.php?route=product/search&search=zzzzqq', { waitUntil: 'domcontentloaded' });

    const content = page.locator('#content');
    await expect(content.locator('h1')).toHaveText('Search - zzzzqq');
    await expect(content.getByText('There is no product that matches the search criteria.')).toBeVisible();
    await expect(content.getByText('Search Criteria', { exact: true })).toBeVisible();
    await expect(content.locator('#button-search')).toBeVisible();
    await expect(content.locator('.product-thumb')).toHaveCount(0);
  });
});
