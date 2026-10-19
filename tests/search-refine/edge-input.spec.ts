// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Search Refinement', () => {
  test('Search with empty term and special characters', async ({ page }) => {
    const dialogs: string[] = [];
    page.on('dialog', async (dialog) => {
      dialogs.push(`${dialog.type()}: ${dialog.message()}`);
      await dialog.dismiss();
    });

    const content = page.locator('#content');
    const headerInput = page.locator('#search input[name="search"]');

    // 1. Submit the header search with an empty box
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });
    await headerInput.fill('');
    await page.locator('#search button').click();
    await expect(page).toHaveURL(/route=product\/search/);
    await expect(content.locator('h1')).toHaveText('Search');
    await expect(content.locator('.product-thumb')).toHaveCount(0);
    await expect(content.getByText('Search Criteria', { exact: true })).toBeVisible();

    // 2. Search for <script>alert(1)</script> and for %
    const payload = '<script>alert(1)</script>';
    await headerInput.fill(payload);
    await page.locator('#search button').click();
    await expect(page).toHaveURL(/search=/);
    await expect(content.locator('h1')).toHaveText(`Search - ${payload}`);
    await expect(content.getByText('There is no product that matches the search criteria.')).toBeVisible();
    await expect(content.locator('.product-thumb')).toHaveCount(0);

    await page.locator('#search input[name="search"]').fill('%');
    await page.locator('#search button').click();
    await expect(page).toHaveURL(/search=%25/);
    await expect(content.locator('h1')).toHaveText('Search - %');

    expect(dialogs, `Unexpected dialogs: ${dialogs.join(', ')}`).toHaveLength(0);
  });
});
