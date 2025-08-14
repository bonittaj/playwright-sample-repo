import { test as base } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    //setting the cookies here before using the webpage
    await page.context().addCookies([
      {
        name: "cookiesAccepted",
        value: "true",
        domain: "www.thomann.de",
        path: "/",
        httpOnly: false,
        secure: true,
      },
    ]);
    await use(page);
  },
});
