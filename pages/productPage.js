import { BasePage } from "./basePage";
import { productTitle, productPrice, addToCart } from "./selectors/productPage";

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

  async validateUrlOfTheSelectedProduct(hrefValue) {
    const url = await this.getUrl();
    return url.includes(hrefValue);
  }

  async clickAddToCart() {
    await this.waitAndClick(addToCart);
  }
}
