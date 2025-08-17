export const cookieConsentButton = "text='Alright!'";
export const cableBeginningButton = ".cg-plugButton--left";
export const cableEndButton = ".cg-plugButton--right";
export const cablePlugItem = ".cg-plugItem__wrapper > .cg-plugImage";
export const productListItems = ".fx-product-list-entry";
export const productTitle = ".product__title";
export const productPrice = ".product__price";
export const paginationNextButton = ".cg-icons__arrow--right";
export const cablelink = "a.product__image";
export const brandedProductsCount = ".cg-count";
export const imageByAlt = (altText) => `img[alt="${altText}"]`;
export const brandProductCount = (brandText) =>
  `.item:has(img[alt="${brandText}"]) .cg-brands__item__count`;

export const loadingImage = (page) =>
  page.getByRole("img", { name: "loading" });
