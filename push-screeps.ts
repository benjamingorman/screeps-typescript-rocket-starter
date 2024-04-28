import { ScreepsAPI } from "screeps-api";
import { parseArgs } from "node:util";
// @ts-ignore
import { runTransform } from "esm-to-cjs";

interface ScreepsServerConfig {
  token: string | undefined;
  username: string | undefined;
  password: string | undefined;
  protocol: string;
  hostname: string;
  port: number;
  path: string;
  branch: string;
}

interface CodeList {
  [key: string]: string;
}

const SCREEPS_JSON = "screeps.json";

if (!(await Bun.file(SCREEPS_JSON).exists())) {
  console.error(
    `You need to create ${SCREEPS_JSON} with your Screeps credentials.`,
    "See screeps.sample.json",
  );
  process.exit(1);
}

const cfg = (await Bun.file(SCREEPS_JSON).json()) as {
  [name: string]: ScreepsServerConfig;
};

const args = parseArgs({
  args: Bun.argv,
  options: {
    dest: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const dest = args.values.dest as string;
if (!dest) {
  console.log(
    "No destination specified - code will be compiled but not uploaded",
  );
}

console.time("Built code");
await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
});
console.timeEnd("Built code");
console.log("Writing to dist/");

if (!dest) process.exit(0);

console.time("Pushed to screeps");
const server_cfg = cfg[dest];
if (!server_cfg) {
  console.error(`Provided destination ${dest} is not in ${SCREEPS_JSON}`);
}

const api = new ScreepsAPI(server_cfg);

const runUpload = (api: ScreepsAPI, branch: string, code: CodeList) => {
  // @ts-ignore
  api.raw.user.branches().then((data: any) => {
    const branches = data.list.map((b: any) => b.branch);

    if (branches.includes(branch)) {
      // @ts-ignore
      api.code.set(branch, code);
    } else {
      api.raw.user.cloneBranch("", branch, code);
    }
  });
};

const convertedMain = runTransform(await Bun.file("./dist/index.js").text());

const code = { main: convertedMain };

if (!server_cfg.token) {
  await api
    .auth(server_cfg.username, server_cfg.password)
    .then(() => runUpload(api, server_cfg.branch, code));
} else {
  runUpload(api, server_cfg.branch, code);
}

console.timeEnd("Pushed to screeps");

