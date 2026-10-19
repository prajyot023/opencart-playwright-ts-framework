// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Search Refinement', () => {
  test('Search in product descriptions widens results', async ({ page }) => {
    const names = page.locator('#content .product-thumb h4 a');

    // 1. Search 'mac' with description unchecked
    await page.goto('index.php?route=product/search&search=mac', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#content h1')).toHaveText('Search - mac');
    await expect(names).toHaveText(['iMac', 'MacBook', 'MacBook Air', 'MacBook Pro']);

    // 2. Tick 'Search in product descriptions' and click Search
    await page.locator('#content').getByRole('checkbox', { name: 'Search in product descriptions' }).check();
    await page.locator('#button-search').click();
    await expect(page).toHaveURL(/description=true/);
    await expect(names).toHaveCount(6);
    await expect(names).toHaveText(['Apple Cinema 30"', 'iMac', 'iPhone', 'MacBook', 'MacBook Air', 'MacBook Pro']);
  });
});
