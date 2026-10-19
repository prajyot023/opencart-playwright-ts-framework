// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Search Refinement', () => {
  test('Search page criteria controls', async ({ page }) => {
    // 1. Open index.php?route=product/search
    await page.goto('index.php?route=product/search', { waitUntil: 'domcontentloaded' });

    const content = page.locator('#content');
    await expect(content.getByText('Search Criteria', { exact: true })).toBeVisible();

    const category = content.locator('select[name="category_id"]');
    await expect(category).toBeVisible();
    for (const name of ['All Categories', 'Desktops', 'PC', 'Mac', 'Laptops & Notebooks']) {
      await expect(category.locator('option', { hasText: new RegExp(`^\\s*(\\u00a0|-|\\s)*${name.replace(/[&]/g, '\\$&')}\\s*$`) }).first()).toBeAttached();
    }

    await expect(content.getByRole('checkbox', { name: 'Search in subcategories' })).toBeVisible();
    await expect(content.getByRole('checkbox', { name: 'Search in product descriptions' })).toBeVisible();
  });
});
