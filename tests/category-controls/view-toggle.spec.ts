// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Category Listing Controls', () => {
  test('List and grid view toggle', async ({ page }) => {
    await page.goto('index.php?route=product/category&path=20', { waitUntil: 'domcontentloaded' });
    const cards = page.locator('.product-layout');
    await expect(cards).toHaveCount(12);

    // 1. Click List view button
    await page.locator('#list-view').click();
    await expect(cards.first()).toHaveClass(/product-list/);
    await expect(cards.first()).not.toHaveClass(/product-grid/);
    await expect(page.locator('#list-view')).toHaveClass(/active/);
    await expect(page.locator('#grid-view')).not.toHaveClass(/active/);

    // 2. Click Grid view button, then reload
    await page.locator('#grid-view').click();
    await expect(cards.first()).toHaveClass(/product-grid/);
    await expect(page.locator('#grid-view')).toHaveClass(/active/);

    await page.reload({ waitUntil: 'domcontentloaded' });
    // Actual site behaviour: grid preference (stored in localStorage) persists after reload
    await expect(cards.first()).toHaveClass(/product-grid/);
    await expect(page.locator('#grid-view')).toHaveClass(/active/);
    await expect(page.locator('#list-view')).not.toHaveClass(/active/);
  });
});
