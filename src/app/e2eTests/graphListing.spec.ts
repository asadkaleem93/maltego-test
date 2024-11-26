import { test, expect } from '@playwright/test';

test('Should display the homepage and search graphs', async ({ page }) => {
    await page.goto('/');
    const heading = await page.locator('h1')
    await expect(heading).toHaveText('Graph List');
    const searchInput = await page.locator('#search-graphs');
    await searchInput.fill('node 6');
    const searchButton = await page.locator('#search-graphs-button');
    await searchButton.click();
    const table = await page.locator('#graphs-table');
    const rows = await table.locator('tbody tr');
    const rowCount = await rows.count();

    expect(rowCount).toBe(2);
});

test('Should add text to search field and then click cancel', async ({ page }) => {
    await page.goto('/');
    const searchInput = await page.locator('#search-graphs');
    await searchInput.fill('node 6');
    const cancelButton = await page.locator('#cancel-graphs-search-button');
    await cancelButton.click();
    const inputValue = await searchInput.inputValue();
    expect(inputValue).toBe('');
});

test('Should delete one of the graph', async ({ page }) => {
    await page.goto('/');
    const deleteGraphIcon = await page.locator('#delete-graph-0');
    await deleteGraphIcon.click();
    await page.waitForTimeout(500);
    const deleteGraphConfirmPopupButton = await page.locator('#delete-graph-ok-confirm');
    await deleteGraphConfirmPopupButton.click();
    await page.waitForTimeout(500);
    const table = await page.locator('#graphs-table');
    const rows = await table.locator('tbody tr');
    const rowCount = await rows.count();

    expect(rowCount).toBe(2);
});

test('Open add graph modal and create graph', async ({ page }) => {
    await page.goto('/');
    const addGrphButton = await page.locator('#add-graph-button');
    await addGrphButton.click();
    await page.waitForTimeout(500);
    const addGraphInput = await page.locator('#add-graph-input');
    addGraphInput.fill('asad')
    const addGraphSubmitButton = await page.locator('#add-graph-form-submit-button')
    await addGraphSubmitButton.click()
    await page.waitForTimeout(500);
    const table = await page.locator('#graphs-table');
    const rows = await table.locator('tbody tr');
    const rowCount = await rows.count();

    expect(rowCount).toBe(4);
});