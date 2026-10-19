// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Brands', () => {
  test('Invalid brand id shows not-found message', async ({ page }) => {
    // 1. Open index.php?route=product/manufacturer/info&manufacturer_id=99
    await page.goto('index.php?route=product/manufacturer/info&manufacturer_id=99', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Brand not found!');
    await expect(page.locator('#content')).toContainText('Brand not found!');
    const cont = page.locator('#content').getByRole('link', { name: 'Continue' });
    await expect(cont).toBeVisible();
    await cont.click();
    await expect(page).toHaveURL(/route=common\/home/);
    await expect(page.locator('#logo')).toBeVisible();
  });
});
