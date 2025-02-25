---
title: Contribution guidelines
next: false
prev: false
---

# Contribution Guidelines

Thank you for your interest in contributing to Grid Engine!

In order to make sure everything runs smoothly, please stick to the following guidelines:

## Open an issue

Create an issue for your planned contribution. If there already exists one, comment on it or mention your interest in contributing on our [discord](https://discord.gg/C4jNEZJECs).
This makes sure that no one else is working on that issue and it also helps to quickly talk about how to solve the issue. That prevents that you spent time on a solution that might turn out to be infeasible in the end.

## Write unit tests

Grid Engine has a high test coverage and we would like to keep it that way. Please make sure that you provide enough unit test coverage with your solution.
Learn how to run unit tests in our [local development guide](../local-dev/index.html#run-all-unit-tests).
You can check the coverage by running:

```bash
npx jest --collectCoverage
```

## Use the linter

To ensure that your code matches the code style used in Grid Engine, make sure to [run the linter](../local-dev/index.html#run-linter) before opening a PR.

## Have an eye on the speed tests

We have speed tests that are run before you can merge a PR. These ensure that performance critical parts like pathfinding did not get slower.

## Ask for help if you are stuck

If you are stuck, don't hesitate to ask for help. You can comment on the issue or ask in our [discord](https://discord.gg/C4jNEZJECs).
