import globals from "globals";
import importX from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import tailwind from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";
import pluginQuery from "@tanstack/eslint-plugin-query";

import base from "./index.js";

export default tseslint.config(
  ...base,
  ...tailwind.configs["flat/recommended"],
  jsxA11y.flatConfigs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  importX.flatConfigs.react,
  ...pluginQuery.configs["flat/recommended"],
  {
    name: "eslint-config/react.js",
    plugins: {
      "react-compiler": reactCompiler,
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            /**
             * Server actions must be async functions and may be passed to
             * `action` and `onSubmit` props, which return `void` and not
             * `Promise<void>`. This triggers `no-misused-promises`. However,
             * making it a synchronous function throws error "Functions cannot
             * be directly passed unless explicitly exposed with 'use server'".
             *
             * @see {@link https://typescript-eslint.io/rules/no-misused-promises/#checksvoidreturn}
             * @see {@link https://react.dev/reference/rsc/server-actions}
             */
            attributes: false,
          },
        },
      ],
      "react-compiler/react-compiler": "error",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      tailwindcss: {
        callees: ["classnames", "clsx", "cn", "ctl", "cva"],
      },
    },
  },
  {
    files: ["**/*.{js,cjs,jsx,mjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
