import {test, expect} from "@playwright/test";

test.describe("Drag and Drop", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("/basic-drag.html");
    });

    test("should display the initial list", async ({page}) => {
        await expect(page.getByTestId("dnd-zone")).toBeVisible();

        // Check all items are present
        for (let i = 1; i <= 5; i++) {
            await expect(page.getByTestId(`item-${i}`)).toBeVisible();
        }

        // Verify initial order
        await expect(page.getByTestId("order-display")).toContainText("1, 2, 3, 4, 5");
    });

    test("should drag and drop an item to reorder", async ({page}) => {
        // Drag item 1 to item 3's position
        const item1 = page.getByTestId("item-1");
        const item3 = page.getByTestId("item-3");

        await item1.dragTo(item3);

        // Wait for animation and state update
        await page.waitForTimeout(300);

        // The order should have changed
        const orderText = await page.getByTestId("order-display").textContent();
        expect(orderText).not.toContain("1, 2, 3, 4, 5");
    });

    test("should drag the last item to the first position", async ({page}) => {
        const item5 = page.getByTestId("item-5");
        const item1 = page.getByTestId("item-1");

        await item5.dragTo(item1);
        await page.waitForTimeout(300);

        // Item 5 should now be first or second
        const orderText = await page.getByTestId("order-display").textContent();
        expect(orderText).not.toContain("1, 2, 3, 4, 5");
    });

    test("should show drag handle on each item", async ({page}) => {
        // Check all items have handles
        for (let i = 1; i <= 5; i++) {
            await expect(page.getByTestId(`handle-${i}`)).toBeVisible();
        }
    });

    test("should support dragging by the handle", async ({page}) => {
        // Drag using the handle
        const handle1 = page.getByTestId("handle-1");
        const item3 = page.getByTestId("item-3");

        await handle1.dragTo(item3);
        await page.waitForTimeout(300);

        // Verify reordering happened
        const orderText = await page.getByTestId("order-display").textContent();
        expect(orderText).not.toContain("1, 2, 3, 4, 5");
    });

    test("should maintain item data during drag", async ({page}) => {
        const item2 = page.getByTestId("item-2");

        // Verify item 2 contains its name
        await expect(item2).toContainText("Item 2");

        // Drag it somewhere
        const item4 = page.getByTestId("item-4");
        await item2.dragTo(item4);
        await page.waitForTimeout(300);

        // Item 2 should still have its name after drag
        await expect(page.getByTestId("item-2")).toContainText("Item 2");
    });
});
