// spec: specs/uncovered-areas-plan.md
// seed: tests/seed.spec.ts
import { test, expect, Page } from '@playwright/test';

async function readPrices(page: Page): Promise<number[]> {
  const blocks = await page.locator('.product-layout .caption .price').allTextContents();
  return blocks.map((t) => {
    const m = t.match(/\$([\d,]+\.\d{2})/);
    return parseFloat(m![1].replace(/,/g, ''));
  });
}

test.describe('Category Listing Controls', () => {
  test('Sort by price low-high and high-low', async ({ page }) => {
    await page.goto('index.php?route=product/category&path=20', { waitUntil: 'domcontentloaded' });

    // 1. Select 'Price (Low > High)'
    await page.locator('#input-sort').selectOption({ label: 'Price (Low > High)' });
    await expect(page).toHaveURL(/sort=p\.price&order=ASC/);
    await expect(page.locator('.product-layout')).toHaveCount(12);
    const asc = await readPrices(page);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    await expect(page.locator('.product-layout .caption h4 a').first()).toHaveText('Canon EOS 5D');
    expect(asc[0]).toBe(98);

    // 2. Select 'Price (High > Low)'
    await page.locator('#input-sort').selectOption({ label: 'Price (High > Low)' });
    await expect(page).toHaveURL(/sort=p\.price&order=DESC/);
    await expect(page.locator('.product-layout')).toHaveCount(12);
    const desc = await readPrices(page);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });
});
