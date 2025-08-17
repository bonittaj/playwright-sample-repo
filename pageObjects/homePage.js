export const cookieConsentButton = ".consent-button--primary";
export const cableBeginningButton = ".cg-plugButton--left";
export const cableEndButton = ".cg-plugButton--right";
export const cablePlugItem = ".cg-plugItem__wrapper > .cg-plugImage";
export const productListItems = ".fx-product-list-entry";
export const productTitle = ".product__title";
export const productPrice = ".product__price";
// export const manufactureList = 'div.item > div.cg-brands__item:not(.cg-brands__item__count)'
export const paginationNextButton = ".cg-icons__arrow--right";
export const imageByAlt = (altText) => `img[alt="${altText}"]`;
export const brandProductCount = (brandText) =>
  `.item:has(img[alt="${brandText}"]) .cg-brands__item__count`;
