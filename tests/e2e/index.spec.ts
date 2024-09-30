import { test, expect, type Locator } from "@playwright/test";

test.describe('Homepage tests', () => {
    let input: Locator;
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        input = page.locator('#name');
    })

    test('check if homepage loads', async ({ page }) => {
        await expect.soft(page).toHaveTitle(/PopDex/);
        await expect.soft(input).toBeVisible();
    })

    test('search for a valid pokemon name should return data', async ({ page }) => {
        await expect.soft(input).toBeVisible();
        await input.fill('rayquaza');
        await input.press('Enter');
        await expect.soft(page).toHaveTitle(/rayquaza/i);
        await expect.soft(page.locator('.pokemon-profile')).toBeVisible()
        await expect.soft(page.locator('.pokemon-moves')).toBeVisible();
    })

    test('search for invalid/non-existent pokemon name should return 404', async ({ page }) => {
        await input.fill('phoenix');
        await input.press('Enter');
        await expect.soft(page.locator('.error-404')).toBeVisible();
    })
})
