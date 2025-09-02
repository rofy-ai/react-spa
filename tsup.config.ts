// tsup.config.ts (at repo root)
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["server/**/*.ts"],
  outDir: "dist/server",
  platform: "node",
  target: "node20",
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  skipNodeModulesBundle: true,  // <-- works on current tsup
});
