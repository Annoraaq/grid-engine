// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["error", {
      "allow": ["private-constructors"]
    }]
  },
};
