import { test, expect } from "@playwright/test";

test.describe('Pokemon Profile', () => {
    test('search a pokemon name using inline search form should return data', async ({ page }) => {
        await page.goto('/pokemon/rayquaza');
        const input = page.locator('#name');
        
        await expect.soft(input).toBeVisible();
        await input.fill('pikachu');
        await input.press('Enter');
        await expect.soft(page).toHaveTitle(/pikachu/i);
    })
})