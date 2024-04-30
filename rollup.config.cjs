const clear = require("rollup-plugin-clear");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const screeps = require("rollup-plugin-screeps");
const json = require("@rollup/plugin-json");

let cfg;
const dest = process.env.DEST;
if (!dest) {
  console.log(
    "No destination specified - code will be compiled but not uploaded",
  );
} else if ((cfg = require("./screeps.json")[dest]) == null) {
  throw new Error("Invalid upload destination");
}

const plugins = [
  clear({ targets: ["dist"] }),
  resolve({ rootDir: "src" }),
  commonjs(),
  json(),
  typescript({ tsconfig: "./tsconfig.json", exclude: "test" }),
];

const output = [
  {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true,
  },
];

if (cfg?.copy) {
  output.push({ ...output[0], file: cfg.copy });
} else {
  plugins.push(screeps({ config: cfg, dryRun: cfg == null }));
}

module.exports = {
  input: "src/index.ts",
  output,
  plugins,
};

