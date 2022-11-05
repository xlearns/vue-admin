module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: "vue-eslint-parser",
  globals: {
    ElRef: "readonly"
  },
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
    "vue/no-v-for-template-key": "off",
    "no-undef": "off",
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
    "no-debugger": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "prefer-rest-params": "off",
    "vue/no-mutating-props": "off"
  }
};
