// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Logout', () => {
  test('Logout after login ends session', async ({ page }) => {
    test.skip(!process.env.USER_EMAIL || !process.env.USER_PASSWORD, 'USER_EMAIL / USER_PASSWORD not set in .env');

    // 1. Log in with the project's existing test credentials, then open My Account dropdown > Logout
    await page.goto('index.php?route=account/login', { waitUntil: 'domcontentloaded' });
    await page.locator('#input-email').fill(process.env.USER_EMAIL!);
    await page.locator('#input-password').fill(process.env.USER_PASSWORD!);
    await page.locator('input[value="Login"]').click();
    await expect(page).toHaveURL(/route=account\/account/);

    const myAccountToggle = page.locator('a.dropdown-toggle:has-text("My Account")');
    const accountMenu = page.locator('ul.dropdown-menu-right');

    await myAccountToggle.click();
    await accountMenu.getByRole('link', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/route=account\/logout/);
    await expect(page.locator('#content')).toContainText('You have been logged off your account');

    await myAccountToggle.click();
    await expect(accountMenu.getByRole('link', { name: 'Register' })).toBeVisible();
    await expect(accountMenu.getByRole('link', { name: 'Login' })).toBeVisible();
    await expect(accountMenu.getByRole('link', { name: 'Logout' })).toHaveCount(0);

    // 2. Navigate to account/order
    await page.goto('index.php?route=account/order', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/route=account\/login/);

    // 3. Use browser Back
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/route=account\/logout/);

    // Account page is still not accessible without re-authenticating
    await page.goto('index.php?route=account/account', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/route=account\/login/);
  });
});
