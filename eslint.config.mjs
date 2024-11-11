import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/node_modules",
        "**/coverage",
        "**/dist",
        "**/.github",
        "**/*.d.ts",
        "**/GridEngine.min.js",
        "**/serve",
        "**/docs",
        "**/speedtests",
        "**/babel.config.cjs",
        "**/jest.config.js",
    ],
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier").map(config => ({
    ...config,
    files: ["**/*.js", "**/*.ts"],
})), {
    files: ["**/*.js", "**/*.ts"],

    plugins: {
        "@typescript-eslint": typescriptEslint,
        jest,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },

    rules: {
        "@typescript-eslint/no-unused-vars": ["error", {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-explicit-any": "off",
        "require-await": "off",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "no-empty-function": "off",

        "@typescript-eslint/no-empty-function": ["error", {
            allow: ["private-constructors"],
        }],
    },
}];
