import { test } from "../fixture.js";
import { HomePage } from "../../pages/home-page.js";
import dotenv from "dotenv";
dotenv.config();

test.describe("Page Verification after accepting cookies", () => {
  test(`Home Page Verification`, async ({ page }) => {
    await page.goto(`${process.env.BASEURL}`, { waitUntil: "load" });
  });
});
