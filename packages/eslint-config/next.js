import tseslint from "typescript-eslint";
import next from "@next/eslint-plugin-next";

import react from "./react.js";

export default tseslint.config(
  /**
   * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores}
   */
  { ignores: [".next/"] },
  ...react,
  {
    plugins: { "@next/next": next },
    rules: {
      ...next.configs.recommended.rules,
      /**
       * `@vercel/og` (which is bundled into Next.js) uses `tw` prop
       * @see {@link https://github.com/vercel/next.js/blob/canary/packages/next/src/compiled/%40vercel/og/types.d.ts#L115}
       * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md}
       */
      "react/no-unknown-property": ["error", { ignore: ["tw"] }],
    },
    settings: {
      /**
       * @see {@link https://nextjs.org/docs/app/api-reference/components/form}
       */
      formComponents: [{ name: "Form", formAttribute: "action" }],
      /**
       * @see {@link https://nextjs.org/docs/app/api-reference/components/link}
       */
      linkComponents: [{ name: "Link", linkAttribute: "href" }],
    },
  },
);
