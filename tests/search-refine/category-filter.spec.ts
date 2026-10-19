// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Search Refinement', () => {
  test('Category dropdown restricts results', async ({ page }) => {
    const names = page.locator('#content .product-thumb h4 a');

    // 1. Search 'mac' choosing category 'Desktops' without subcategories
    await page.goto('index.php?route=product/search', { waitUntil: 'domcontentloaded' });
    await page.locator('#content #input-search').fill('mac');
    await page.locator('#content select[name="category_id"]').selectOption({ label: 'Desktops' });
    await page.locator('#button-search').click();
    await expect(page.locator('#content h1')).toHaveText('Search - mac');
    // Actual live behaviour: only products directly assigned to Desktops (iMac is in the Mac subcategory only)
    await expect(names).toHaveText(['MacBook', 'MacBook Air']);
    await expect(names.filter({ hasText: /^iMac$/ })).toHaveCount(0);

    // 2. Tick 'Search in subcategories' and search again
    await page.locator('#content').getByRole('checkbox', { name: 'Search in subcategories' }).check();
    await page.locator('#button-search').click();
    await expect(page).toHaveURL(/sub_category=true/);
    await expect(names.filter({ hasText: /^iMac$/ })).toHaveCount(1);
    await expect(names).toHaveText(['iMac', 'MacBook', 'MacBook Air']);
  });
});
