import base from "@drugfax/eslint-config";

/** @type {import('eslint').Linter.Config[]} */
export default [{ ignores: ["apps/*", "packages/*"], ...base }];
