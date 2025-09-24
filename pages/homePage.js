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
  categoryTypes,
  categoryItems,
} from "./selectors/homePage";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async selectCableBeginningType() {
    await this.waitAndClick(cableBeginningButton);
    await this.clickByText(categoryTypes, productData.multiCoreCategory);
    await this.clickByText(categoryItems, productData.multiCoreCableBeginning);
    await this.waitBrandCountLoaded(brandedProductsCount);
  }

  async selectCableEndType() {
    await this.waitAndClick(cableEndButton);
    await this.clickByText(categoryTypes, productData.multiCoreCategory);
    await this.clickByText(categoryItems, productData.multiCoreCableEnd);
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
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("cableguy_ajax.html") &&
        response.status() === 200,
    );
  }

  async getDisplayedBrandCount() {
    const selector = await this.getLocatorByText(
      brandProductCount,
      productData.ssnakeBrand,
    );
    return await selector.innerText();
  }

  async waitForFirstProductToChangeOnPagination(selector, oldFirstProduct) {
    await this.page.waitForFunction(
      (selector, oldText) => {
        const first = document.querySelector(selector);
        return first && first.textContent.trim() !== oldText;
      },
      selector,
      oldFirstProduct,
      { timeout: 10000 },
    );
  }

  async getProductListCount() {
    let totalProducts = 0;
    const productItem = this.page.locator(productListItems);
    const nextButton = this.page.locator(paginationNextButton);
    while (await nextButton.isVisible()) {
      totalProducts += await productItem.count();
      const oldFirstProduct = (await productItem.first().textContent())?.trim();

      await nextButton.scrollIntoViewIfNeeded();
      await nextButton.click();

      await this.waitForApiData();
      await this.waitForFirstProductToChangeOnPagination(
        productListItems,
        oldFirstProduct,
      );
    }
    totalProducts += await productItem.count();
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
