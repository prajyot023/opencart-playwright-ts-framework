// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Site Map', () => {
  test('Site map lists categories and information links', async ({ page }) => {
    await page.goto('index.php?route=common/home', { waitUntil: 'domcontentloaded' });

    // 1. Click footer Customer Service > Site Map
    await page.locator('footer').getByRole('link', { name: 'Site Map' }).click();
    await expect(page).toHaveURL(/information\/sitemap/);
    await expect(page.getByRole('heading', { name: 'Site Map', level: 1 })).toBeVisible();

    const content = page.locator('#content');
    const names = [
      'Desktops', 'PC', 'Mac', 'Laptops & Notebooks', 'Macs', 'Windows',
      'Components', 'Mice and Trackballs', 'Monitors', 'Printers', 'Scanners', 'Web Cameras',
      'Tablets', 'Software', 'Phones & PDAs', 'Cameras', 'MP3 Players',
      'Special Offers', 'My Account', 'Account Information', 'Password', 'Address Book',
      'Order History', 'Downloads', 'Shopping Cart', 'Checkout', 'Search',
      'About Us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions', 'Contact Us',
    ];
    for (const name of names) {
      await expect(content.getByRole('link', { name, exact: true }).first()).toBeVisible();
    }
  });
});
