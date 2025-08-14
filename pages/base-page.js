import { expect } from "@playwright/test";
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async waitForVisible(locator, timeout = 5000) {
    await expect(locator).toBeVisible({ timeout });
  }
}
