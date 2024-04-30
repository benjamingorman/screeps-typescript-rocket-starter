# 🚀 screeps-typescript-rocket-starter

This is a modern and clean project template for a new Screeps project in
Typescript.

Features:

* Fast development environment with [Bun](https://bun.sh/)
* Linting with [biomejs](https://biomejs.dev/) (`bun lint` + `bun format`)
* Unit tests with [screeps-jest](https://github.com/eduter/screeps-jest) (`bun run test`)
* Code bundling using [rollup](https://rollupjs.org/) and [rollup-plugin-screeps](https://github.com/Arcath/rollup-plugin-screeps)

## Getting started

To install dependencies:

```bash
$ bun install
```

To run linting:
```bash
$ bun lint
```

To auto format code (and write the changes):
```bash
$ bun format
```

To run tests:

(Note it's important to preload the setup script in `./src/test/setup.ts` to 
create globals like Game, Memory etc. from screeps-jest which is why
`bun run test` is preferred over `bun test` here.)

```bash
$ bun run test
```

To push to screeps:

1. First create `screeps.json` with your screeps credentials.
   See `screeps.sample.json` for an example.
2. Run `bun push-main` to push to your main branch on screeps.com.

Alternatively run `bun watch-main` to watch for changes in your code as you edit
and push on demand.


## Extending the template

Note: Although `bun build` runs significantly faster than `tsc` for a large
codebase, the build from bun is not currently able to target the slightly
old node runtime that Screeps runs on. For this reason we still use a vanilla
tsc compile step in the rollup script.
