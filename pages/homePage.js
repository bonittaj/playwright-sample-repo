import { BasePage } from "./basePage";
import { constantData } from "../data/constants";
import {
  cookieConsentButton,
  cableBeginningButton,
  cableEndButton,
  imageByAlt,
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
  }
}
