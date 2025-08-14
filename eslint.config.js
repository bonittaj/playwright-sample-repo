import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigRecommended from "@eslint/js"; // ESLint recommended config

export default [
  eslintConfigRecommended.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        process: "readonly",
        module: "readonly",
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
