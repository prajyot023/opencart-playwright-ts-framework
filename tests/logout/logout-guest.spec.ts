// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Logout', () => {
  test('Logout page as guest', async ({ page }) => {
    // 1. Open index.php?route=account/logout without logging in
    await page.goto('index.php?route=account/logout', { waitUntil: 'domcontentloaded' });

    const content = page.locator('#content');
    await expect(content.getByRole('heading', { name: 'Account Logout' })).toBeVisible();
    await expect(content).toContainText('You have been logged off your account');

    const continueButton = content.getByRole('link', { name: 'Continue' });
    await expect(continueButton).toBeVisible();
    await continueButton.click();

    await expect(page).toHaveURL(/route=common\/home/);
  });
});
