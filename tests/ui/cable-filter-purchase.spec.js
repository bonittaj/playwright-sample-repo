import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage.js";
import { ProductPage } from "../../pages/productPage.js";
import dotenv from "dotenv";
import { CartPage } from "../../pages/cartPage.js";
dotenv.config();

test.describe("Verification of Cable Product Purchase Workflow", () => {
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

    await test.step("Validate the Product Count after Selecting the Manufaturer", async () => {
      const brandCount = await homePage.getDisplayedBrandCount();
      const filterProductCount = await homePage.getProductListCount();
      await expect(parseInt(brandCount), "The value mismatch").toBe(
        filterProductCount,
      );
    });

    await test.step("Open the Product details and Validate the Product Details", async () => {
      cableProductDetails = await homePage.getFirstProductData();
      await cableProductDetails.element.click();

      const productCard = await productPage.getProductDetails();
      expect(cableProductDetails.title).toBe(productCard.title);
      // expect(cableProductDetails.price).toBe(productCard.price); //confirm whether this is expected or not 

      const isSelectedProductUrlValid =
        await productPage.validateUrlOfTheSelectedProduct(
          cableProductDetails.hrefValue,
        );
      expect(isSelectedProductUrlValid).toBe(true);
    });

    await test.step("Add the Product to the Cart", async () => {
      await productPage.clickAddToCart();
    });

    await test.step("Validation of Basket Notificaiton PopUp", async () => {
      const basketNotificationText = await cartPage.getBasketNotificationText();
      expect(basketNotificationText).toBe(
        `Item ${cableProductDetails.title} is now in the shopping basket.`,
      );
    });
  });
});
