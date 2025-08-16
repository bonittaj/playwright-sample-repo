import { test } from "@playwright/test";
import { HomePage } from "../../pages/homePage.js";
import dotenv from "dotenv";
dotenv.config();

test.describe("Verification of Cable Product Purchase Workflow", () => {
  test("User can select, filter and Purchase the Cable", async ({ page }) => {
    await page.goto(`${process.env.BASEURL}`, {
      waitUntil: "domcontentloaded",
    });
    const homePage = new HomePage(page);
    await test.step("Dismiss Cookie Popup", async () => {
      await homePage.dismissCookiePopUp();
    });

    await test.step("Select Cable Beginning Type", async () => {
      await homePage.selectCableBeginningType();
    });

    await test.step("Select Cable End Type", async () => {
      await homePage.selectCableEndType();
    });

    await test.step("Select a Manufacturer", async () => {
      await homePage.selectManufacture();
    });

    await test.step("Validate the Product Count after Selecting the Manufaturer", () => {});

    await test.step("Open the Product details and Validate the Product Details", () => {});

    await test.step("Add the Product to the Cart and Validate the Product Details", () => {});
  });
});
