import { BasePage } from "./basePage";
import {
  productTitle,
  productPrice,
  addToCart,
} from "../pageObjects/productPage";

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async getProductDetails() {
    return {
      title: await this.getElementTextValue(productTitle),
      price: await this.getElementTextValue(productPrice),
    };
  }

  async validateUrlOfTheSelectedProduct(title) {
    const url = await this.getUrl();
    return url.includes(title.toLowerCase().replaceAll(" ", "_"));
  }

  async clickAddToCart() {
    await this.waitAndClick(addToCart);
  }
}
