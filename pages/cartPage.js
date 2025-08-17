import { BasePage } from "./basePage";
import { cartQuantity, basketNotification } from "../pageObjects/cartPage";
export class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async getCartCount() {
    return await this.getElementTextValue(cartQuantity);
  }

  // Item Kirlin Y-303-06 BK is now in the shopping basket.
}
