import {test, expect} from "@playwright/test";

test.describe("Drag Handles", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("/handle-drag.html");
    });

    test("should display the initial list with handles", async ({page}) => {
        await expect(page.getByTestId("handle-zone")).toBeVisible();

        // Check all items and handles are present
        for (let i = 1; i <= 5; i++) {
            await expect(page.getByTestId(`item-${i}`)).toBeVisible();
            await expect(page.getByTestId(`handle-${i}`)).toBeVisible();
        }

        // Verify initial order
        await expect(page.getByTestId("order-display")).toContainText("1, 2, 3, 4, 5");
    });

    test("handles should have grab cursor", async ({page}) => {
        const handle1 = page.getByTestId("handle-1");
        const cursor = await handle1.evaluate(el => window.getComputedStyle(el).cursor);
        expect(cursor).toBe("grab");
    });

    test("should NOT drag when clicking on non-handle area", async ({page}) => {
        // Try to drag from the non-handle area
        const noDragArea = page.getByTestId("no-drag-1");
        const item3 = page.getByTestId("item-3");

        // Get positions
        const noDragBox = await noDragArea.boundingBox();
        const item3Box = await item3.boundingBox();

        // Try to drag using mouse events
        await page.mouse.move(noDragBox.x + noDragBox.width / 2, noDragBox.y + noDragBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(item3Box.x + item3Box.width / 2, item3Box.y + item3Box.height / 2, {steps: 10});
        await page.mouse.up();

        await page.waitForTimeout(300);

        // Order should NOT have changed
        await expect(page.getByTestId("order-display")).toContainText("1, 2, 3, 4, 5");
    });

    test("should drag when using the handle", async ({page}) => {
        // Get handle 1 and target position (item 3)
        const handle1 = page.getByTestId("handle-1");
        const item3 = page.getByTestId("item-3");

        const handle1Box = await handle1.boundingBox();
        const item3Box = await item3.boundingBox();

        // Drag using the handle with mouse events
        await page.mouse.move(handle1Box.x + handle1Box.width / 2, handle1Box.y + handle1Box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(50); // Small delay to initiate drag
        await page.mouse.move(item3Box.x + item3Box.width / 2, item3Box.y + item3Box.height / 2, {steps: 10});
        await page.waitForTimeout(100);
        await page.mouse.up();

        await page.waitForTimeout(300);

        // Order should have changed
        const orderText = await page.getByTestId("order-display").textContent();
        expect(orderText).not.toContain("1, 2, 3, 4, 5");
    });

    test("should drag last item to first position using handle", async ({page}) => {
        const handle5 = page.getByTestId("handle-5");
        const item1 = page.getByTestId("item-1");

        const handle5Box = await handle5.boundingBox();
        const item1Box = await item1.boundingBox();

        // Drag using handle
        await page.mouse.move(handle5Box.x + handle5Box.width / 2, handle5Box.y + handle5Box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(50);
        await page.mouse.move(item1Box.x + item1Box.width / 2, item1Box.y + item1Box.height / 2, {steps: 10});
        await page.waitForTimeout(100);
        await page.mouse.up();

        await page.waitForTimeout(300);

        // Order should have changed
        const orderText = await page.getByTestId("order-display").textContent();
        expect(orderText).not.toContain("1, 2, 3, 4, 5");
    });

    test("should maintain item data during handle drag", async ({page}) => {
        const handle2 = page.getByTestId("handle-2");
        const item2 = page.getByTestId("item-2");

        // Verify item 2 contains its name
        await expect(item2).toContainText("Item 2");

        // Drag using handle
        const item4 = page.getByTestId("item-4");
        const handle2Box = await handle2.boundingBox();
        const item4Box = await item4.boundingBox();

        await page.mouse.move(handle2Box.x + handle2Box.width / 2, handle2Box.y + handle2Box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(50);
        await page.mouse.move(item4Box.x + item4Box.width / 2, item4Box.y + item4Box.height / 2, {steps: 10});
        await page.waitForTimeout(100);
        await page.mouse.up();

        await page.waitForTimeout(300);

        // Item 2 should still have its name
        await expect(page.getByTestId("item-2")).toContainText("Item 2");
    });
});
