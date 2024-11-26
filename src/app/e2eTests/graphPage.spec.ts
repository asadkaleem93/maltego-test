import { test, expect } from '@playwright/test';

test('Should display the heading and graph', async ({ page }) => {
    await page.goto('/graph/grph_1');
    await page.waitForTimeout(500);

    const heading = await page.locator('h1')
    await expect(heading).toHaveText('Graph 1');
    const graph = await page.locator('#graph-svg');

    expect(graph).toBeVisible()
});

test('Add Node in the graph', async ({ page }) => {
    await page.goto('/graph/grph_1');
    await page.waitForTimeout(500);

    const svg = await page.locator('#graph-svg');
    const circles = await svg.locator('circle');
    const nodesCount = await circles.count();
    expect(nodesCount).toBe(12);

    const addNodeButton = await page.locator('#add-node-button');
    await addNodeButton.click();
    const addNodeField = await page.locator('#add-node-input-field');
    await addNodeField.fill('New node');
    const addNodeSubmitButton = await page.locator('#add-node-submit-button')
    await addNodeSubmitButton.click();
    await page.waitForTimeout(500);
    const newNodesCount = await circles.count();
    expect(newNodesCount).toBe(13);
});
////////
test('Search Node in the graph', async ({ page }) => {
    await page.goto('/graph/grph_1');

    const searchField = await page.locator('#search-nodes');
    await searchField.fill('node 3');
    const searchNodeButton = await page.locator('#search-node-button');
    await searchNodeButton.click();
    await page.waitForTimeout(500);
    const searchedNode = await page.locator('#node-nd_3');
    const radius = await searchedNode.getAttribute('r');
    expect(radius).toBe('35');

});

// test('Edit text of node', async ({ page }) => {
//     await page.goto('/graph/grph_1');
//     await page.waitForTimeout(500);

//     const nodeText = await page.locator('#label-nd_1')
//     const node = await page.locator('#node-nd_1 ')
//     await page.waitForTimeout(500)
//     // await expect(node).toBeVisible()
//     await node.waitFor({ state: 'attached' });  // Ensure the element is attached to the DOM
//     await node.waitFor({ state: 'visible' });  // Ensure the element is visible
//     await node.click();
//     const editNodeField = await page.locator('#edit-node-label-field');
//     editNodeField.clear();
//     editNodeField.fill('Node 1122');
//     const editNodeButton = await page.locator('#edit-node-button')
//     await editNodeButton.click();

//     await expect(nodeText).toHaveText('Node 1122')
// });
