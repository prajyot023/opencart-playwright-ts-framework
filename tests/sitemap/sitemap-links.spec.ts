// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Site Map', () => {
  test('Site map links navigate correctly', async ({ page }) => {
    const sitemap = 'index.php?route=information/sitemap';
    await page.goto(sitemap, { waitUntil: 'domcontentloaded' });
    const content = page.locator('#content');

    // 1. Click 'Mac' under Desktops
    await content.getByRole('link', { name: 'Mac', exact: true }).click();
    await expect(page).toHaveURL(/product\/category&path=20_27/);
    await expect(content.getByRole('heading', { name: 'Mac', exact: true })).toBeVisible();

    // 2. Go back and click 'About Us'
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/information\/sitemap/);
    await content.getByRole('link', { name: 'About Us', exact: true }).click();
    await expect(page).toHaveURL(/information\/information&information_id=4/);
    await expect(content.getByRole('heading', { name: 'About Us' })).toBeVisible();

    // 3. Go back and click 'Address Book' as a guest
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/information\/sitemap/);
    await content.getByRole('link', { name: 'Address Book', exact: true }).click();
    await expect(page).toHaveURL(/account\/login/);
    await expect(page).toHaveTitle('Account Login');
  });
});
