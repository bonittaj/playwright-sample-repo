import { BasePage } from "./basePage";
import { productData } from "../data/productData";
import {
  cookieConsentButton,
  cableBeginningButton,
  cableEndButton,
  imageByAlt,
  brandProductCount,
  productListItems,
  paginationNextButton,
  productTitle,
  productPrice,
  cablelink,
  brandedProductsCount,
} from "./selectors/homePage";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async selectCableBeginningType() {
    await this.waitAndClick(cableBeginningButton);
    await this.clickByText(
      ".cg-plugmodal__category__item",
      productData.multiCoreCategory,
    );
    await this.clickByText(
      ".cg-plugItem__subheadline",
      productData.multiCoreCableBeginning,
    );
    await this.waitBrandCountLoaded(brandedProductsCount);
  }

  async selectCableEndType() {
    await this.waitAndClick(cableEndButton);
    await this.clickByText(
      ".cg-plugmodal__category__item",
      productData.multiCoreCategory,
    );
    await this.clickByText(
      ".cg-plugItem__subheadline",
      productData.multiCoreCableEnd,
    );
    await this.waitBrandCountLoaded(brandedProductsCount);
  }

  async dismissCookiePopUp() {
    await this.isElementVisible(cookieConsentButton);
    await this.waitAndClick(cookieConsentButton);
  }

  async waitBrandCountLoaded(selector, timeout = 5000) {
    const element = this.page.locator(selector);
    await this.page.waitForFunction(
      (el) => el && el.textContent?.trim().length > 0,
      await element.elementHandle(),
      { timeout },
    );
  }

  async selectManufacture() {
    this.clickImageByAlt(imageByAlt, productData.ssnakeBrand);
    await this.waitBrandCountLoaded(brandedProductsCount);
  }

  async getDisplayedBrandCount() {
    const selector = await this.getLocatorByText(
      brandProductCount,
      productData.ssnakeBrand,
    );
    return await selector.innerText();
  }

  async getProductListCount() {
    let totalProducts = 0;
    const locator = this.page.locator(productListItems);
    const nextButton = this.page.locator(paginationNextButton);

    while (await nextButton.isVisible()) {
      totalProducts += await locator.count();
      await nextButton.scrollIntoViewIfNeeded();
      await nextButton.click();
      await this.page.waitForTimeout(3000);
      await locator.first().waitFor({ state: "visible" });
    }

    totalProducts += await locator.count();
    return totalProducts;
  }

  async getFirstProductData() {
    const firstProduct = await this.page.locator(productListItems).first();
    await firstProduct.scrollIntoViewIfNeeded();

    const title = await this.page.locator(productTitle).first();
    const price = await this.page.locator(productPrice).first();
    const hrefValue = await this.page
      .locator(cablelink)
      .first()
      .getAttribute("href");

    return {
      element: firstProduct,
      hrefValue: hrefValue,
      title: await title.innerText(),
      price: await price.innerText(),
    };
  }
}
