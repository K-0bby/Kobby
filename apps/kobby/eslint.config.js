import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import baseConfig from "@repo/eslint-config/base";

// eslint-config-next ships native flat configs as of Next 16 — importing them
// through FlatCompat produces a circular `plugins.react` structure that fails
// schema validation before any file is linted.
export default defineConfig([
  ...baseConfig,
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
