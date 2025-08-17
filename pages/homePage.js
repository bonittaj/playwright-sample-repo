import { BasePage } from "./basePage";
import { constantData } from "../data/constants";
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
} from "../pageObjects/homePage";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async selectCableBeginningType() {
    await this.waitAndClick(cableBeginningButton);
    await this.clickByText(
      ".cg-plugmodal__category__item",
      constantData.multiCoreCategory,
    );
    await this.clickByText(
      ".cg-plugItem__subheadline",
      constantData.multiCoreCableBeginning,
    );
  }

  async selectCableEndType() {
    await this.waitAndClick(cableEndButton);
    await this.clickByText(
      ".cg-plugmodal__category__item",
      constantData.multiCoreCategory,
    );
    await this.clickByText(
      ".cg-plugItem__subheadline",
      constantData.multiCoreCableEnd,
    );
  }

  async dismissCookiePopUp() {
    await this.isElementVisible(cookieConsentButton);
    await this.waitAndClick(cookieConsentButton);
  }

  async selectManufacture() {
    this.clickImageByAlt(imageByAlt, constantData.ssnakeBrand);
    await this.page.waitForTimeout(5000); // need to change this line
  }

  async getDisplayedBrandCount() {
    // await this.page.pause()
    const selector = await this.getLocatorByText(
      brandProductCount,
      constantData.ssnakeBrand,
    );
    return await selector.innerText();
    // await this.page.pause()
  }

  async getProductListCount() {
    let totalProducts = 0;

    while (true) {
      const locator = this.page.locator(productListItems);
      const productListItemCount = await locator.count();
      totalProducts += productListItemCount;

      const nextButton = this.page.locator(paginationNextButton);

      if (!(await nextButton.isVisible())) {
        break;
      }
      await nextButton.scrollIntoViewIfNeeded();
      await nextButton.click();

      await this.page.waitForTimeout(1000); // optional: small wait to stabilize UI
      await this.page.waitForSelector(productListItems);
    }
    return totalProducts;
  }

  async getFirstProductData() {
    const firstProduct = this.page.locator(productListItems).first();
    await firstProduct.scrollIntoViewIfNeeded();
    const title = this.page.locator(productTitle).first();
    const price = this.page.locator(productPrice).first();
    return {
      element: firstProduct,
      title: await title.innerText(),
      price: await price.innerText(),
    };
  }
}
