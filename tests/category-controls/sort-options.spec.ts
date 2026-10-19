// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Category Listing Controls', () => {
  test('Sort dropdown contains all nine options', async ({ page }) => {
    // 1. Open index.php?route=product/category&path=20 and read the Sort By dropdown
    await page.goto('index.php?route=product/category&path=20', { waitUntil: 'domcontentloaded' });
    const options = page.locator('#input-sort option');
    await expect(options).toHaveText([
      'Default',
      'Name (A - Z)',
      'Name (Z - A)',
      'Price (Low > High)',
      'Price (High > Low)',
      'Rating (Highest)',
      'Rating (Lowest)',
      'Model (A - Z)',
      'Model (Z - A)',
    ]);
  });
});
