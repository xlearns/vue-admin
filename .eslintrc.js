module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "no-undef": "off",
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-empty-function": "off"
  }
};
