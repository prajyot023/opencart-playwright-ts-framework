import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // Resolves against baseURL from playwright.config.ts (BASE_URL in .env)
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#logo')).toBeVisible();
  });
});
