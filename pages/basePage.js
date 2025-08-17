import { expect } from "@playwright/test";
import { errorMessages } from "../data/errorMessages";
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
    await element.waitFor({ state: "visible" });
    return element;
  }

  async clickByText(className, text) {
    const selector = `${className}:has-text("${text}")`;
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    await element.waitFor({ state: "visible" });
    await element.click();
  }

  async clickImageByAlt(selector, altText) {
    const locator = this.page.locator(selector(altText));
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async getElementTextValue(selector) {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: "visible" });
    return locator.innerText();
  }

  async getLocatorByText(selector, text) {
    return this.page.locator(selector(text));
  }
}
