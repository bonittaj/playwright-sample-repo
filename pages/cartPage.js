import { BasePage } from "./basePage";
import { cartQuantity, basketNotification } from "./selectors/cartPage";

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async getCartCount() {
    return await this.getElementTextValue(cartQuantity);
  }

  async getBasketNotificationText() {
    return await this.getElementTextValue(basketNotification);
  }
}
