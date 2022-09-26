import { test, expect } from "@playwright/test";

test.describe('Pokemon Profile', () => {
    test('search a pokemon name using inline search form should return data', async ({ page }) => {
        await page.goto('/pokemon/rayquaza');
        const input = page.locator('#name');
        
        await expect.soft(input).toBeVisible();
        await input.type('pikachu');
        await input.press('Enter');
        await expect(page).toHaveTitle(/pikachu/i);
        await expect.soft(page.locator('.pokemon-profile')).toBeVisible();
        await expect.soft(page.locator('.pokemon-moves')).toBeVisible();
    })
})