import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage.js";
import { ProductPage } from "../../pages/productPage.js";
import dotenv from "dotenv";
import { CartPage } from "../../pages/cartPage.js";
dotenv.config();

test.describe("Verification of Cable Product Purchase Workflow", () => {
  test("User can select, filter and Purchase the Cable", async ({ page }) => {
    await page.goto(`${process.env.BASEURL}`, {
      waitUntil: "domcontentloaded",
    });
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
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
      const product = await homePage.getFirstProductData();
      await product.element.click();
      const productDetails = await productPage.getProductDetails();
      expect(product.title).toBe(productDetails.title);
      const isSelectedProductUrlValid =
        await productPage.validateUrlOfTheSelectedProduct(product.title);
      expect(isSelectedProductUrlValid).toBe(true);
    });

    await test.step("Add the Product to the Cart and Validate the Product Details", async () => {
      await productPage.clickAddToCart();
      const cartCount = await cartPage.getCartCount();
      expect(parseInt(cartCount)).toBe(1);
      // const basketNotificationText = this.getBasketNotificationText()
    });
  });
});
