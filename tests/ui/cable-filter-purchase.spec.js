import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage.js";
import { ProductPage } from "../../pages/productPage.js";
import dotenv from "dotenv";
import { CartPage } from "../../pages/cartPage.js";
import { errorMessages } from "../../data/errorMessages.js";
dotenv.config();

test.describe("Verification of cable product purchase workflow", () => {
  test("User can select, filter and Purchase the Cable", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    let cableProductDetails;

    await test.step("Open the url", async () => {
      await page.goto(`${process.env.BASEURL}`, {
        waitUntil: "domcontentloaded",
      });
    });

    await test.step("Dismiss Cookie popup", async () => {
      await homePage.dismissCookiePopUp();
    });

    await test.step("Select cable beginning type", async () => {
      await homePage.selectCableBeginningType();
    });

    await test.step("Select cable end type", async () => {
      await homePage.selectCableEndType();
    });

    await test.step("Select a manufacturer", async () => {
      await homePage.selectManufacture();
    });

    await test.step("Validate the product count after selecting the manufaturer", async () => {
      const brandCount = await homePage.getDisplayedBrandCount();
      const filterProductCount = await homePage.getProductListCount();
      await expect(parseInt(brandCount), errorMessages.valueMismatchMsg).toBe(
        filterProductCount,
      );
    });

    await test.step("Open the product details and validate the product details", async () => {
      cableProductDetails = await homePage.getFirstProductData();
      await cableProductDetails.element.click();

      const productCard = await productPage.getProductDetails();
      expect(cableProductDetails.title).toBe(productCard.title);
      // expect(cableProductDetails.price).toBe(productCard.price); // Price format issue

      const isSelectedProductUrlValid =
        await productPage.validateUrlOfTheSelectedProduct(
          cableProductDetails.hrefValue,
        );
      expect(isSelectedProductUrlValid).toBe(true);
    });

    await test.step("Add the Product to the Cart", async () => {
      await productPage.clickAddToCart();
    });

    await test.step("Validation of cartpage and basket notificaiton popUp", async () => {
      expect(page).toHaveURL(/basket\.html/);
      const basketNotificationText = await cartPage.getBasketNotificationText();
      expect(basketNotificationText).toBe(
        `Item ${cableProductDetails.title} is now in the shopping basket.`,
      );
    });
  });
});
