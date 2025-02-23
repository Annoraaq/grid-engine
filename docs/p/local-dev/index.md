---
title: Local development
next: false
prev: false
---

# Local Development

Learn how to change and run Grid Engine locally.

## Prerequisites

This guide assumes that you have cloned the repository to your local machine. You can do that by running:

```bash
git clone git@github.com:Annoraaq/grid-engine.git
```

After that you should run

```bash
npm install
```

from the Grid Engine directory.

## Test changes without existing project

If you want to quickly test small changes locally and without having to create another project that imports Grid Engine, you can run

```bash
npm run serve
```

This will start up a small example using the current code of Grid Engine (no need to build it before). It serves the content of `./serve`. You can also replace the example files you find there with your own project. However, if you want to test your changes with a larger example or an existing project, refer to [test changes with existing project](#test-changes-with-existing-project).

## Test changes with existing project

If you want to test your changes in Grid Engine with a larger project you first need to build Grid Engine:

```bash
npm run build
```

Afterwards, you need to make sure to import your local version of Grid Engine in your other project by setting a [local path](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#local-paths) to the `dist` directory of Grid Engine in the `package.json` of your project:

```json
// package.json
{
  // ...
  "dependencies": {
    "grid-engine": "file:../path/to/grid-engine/dist"
    // ...
  }
  // ...
}
```

Remember to rebuild Grid Engine after each change.

## Run Linter

```bash
npm run lint
```

## Run all unit tests

```bash
npm run lint
```

## Run single unit test

```bash
npx jest NAME_OF_TEST_FILE
```

For example

```bash
npx jest GridEngine.test.ts
```
