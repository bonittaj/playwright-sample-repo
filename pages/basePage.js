import { expect } from "@playwright/test";
import { errorMessages } from "../data/errorMessages";
import { AJAX_ENDPOINTS } from "../data/apiEndPoints";
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    await this.page.goto(url);
  }

  async getUrl() {
    return await this.page.url();
  }

  async waitAndClick(selector, timeout = 5000) {
    const button = this.page.locator(selector);
    await button.waitFor({ state: "visible", timeout });
    await button.click();
  }

  async isElementVisible(selector) {
    const element = this.page.locator(selector);
    try {
      const isVisible = await element.isVisible();
      expect(isVisible).toBeTruthy();
    } catch (err) {
      throw new Error(`${errorMessages.elementNotVisible}`);
    }
  }

  async getElementByIndex(selector, index = 0) {
    const elements = this.page.locator(selector);
    const count = await elements.count();

    if (index >= count) {
      throw new Error(`index ${index} out of range`);
    } else if (count == 0) {
      throw new Error(`No elements found for selector: ${selector}`);
    }
    const element = elements.nth(index);
    return element;
  }

  async clickByText(selector, text) {
    const element = this.page.locator(selector, { hasText: text });
    await element.scrollIntoViewIfNeeded();
    await element.click();
  }

  async clickImageByAlt(selector, altText) {
    const locator = this.page.locator(selector(altText));
    await locator.click();
  }

  async getElementTextValue(selector) {
    const locator = this.page.locator(selector);
    return locator.innerText();
  }

  async getLocatorByText(selector, text) {
    const element = await this.page.locator(selector(text));
    return element;
  }

  async waitForApiData() {
    await this.page.waitForResponse(
      (response) =>
        response.url().includes(AJAX_ENDPOINTS.cableguy) &&
        response.status() === 200,
    );
  }
}
