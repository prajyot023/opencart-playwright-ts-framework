// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Not Found Pages', () => {
  test('Unknown route and unknown product show not-found', async ({ page }) => {
    // 1. Open index.php?route=product/product&product_id=99999
    const productResponse = await page.goto('index.php?route=product/product&product_id=99999', { waitUntil: 'domcontentloaded' });
    expect(productResponse?.status()).toBe(404);
    await expect(page).toHaveTitle('Product not found!');
    await expect(page.locator('#content').getByText('Product not found!', { exact: true })).toBeVisible();
    await expect(page.locator('#content').getByRole('link', { name: 'Continue', exact: true })).toBeVisible();

    // 2. Open index.php?route=information/information&information_id=999
    const infoResponse = await page.goto('index.php?route=information/information&information_id=999', { waitUntil: 'domcontentloaded' });
    expect(infoResponse?.status()).toBe(404);
    await expect(page).toHaveTitle('Information Page Not Found!');
    await expect(page.locator('#content').getByRole('heading', { name: 'Information Page Not Found!', exact: true })).toBeVisible();
    await expect(page.locator('#content').getByRole('link', { name: 'Continue', exact: true })).toBeVisible();

    // 3. Open index.php?route=does/not/exist
    const unknownResponse = await page.goto('index.php?route=does/not/exist', { waitUntil: 'domcontentloaded' });
    expect(unknownResponse?.status()).toBe(404);
    await expect(page).toHaveTitle('The page you requested cannot be found!');
    await expect(page.locator('#content').getByRole('heading', { name: 'The page you requested cannot be found!', exact: true })).toBeVisible();
    await expect(page.locator('#content').getByRole('link', { name: 'Continue', exact: true })).toBeVisible();
    await expect(page.locator('#top')).toBeVisible();
    await expect(page.locator('#logo')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
