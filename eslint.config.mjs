import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      quotes: ["error", "single"],
      semi: ["error", "never"], 
      "no-unused-vars": ["error"], 
      indent: ["error", 2], 
    },
  },
  ...tseslint.configs.recommended,
];
