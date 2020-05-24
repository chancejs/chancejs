# Contributing

## Getting Started

Once you pull down the Chance 2.0 repo, you'll see it's a monorepo managed my [Lerna](https://lerna.js.org/) and using [Yarn](https://yarnpkg.com/)

To get started, make sure you have lerna installed

```bash
yarn global add lerna
```

Then you need to make sure to pull down packages for all of the modules

```bash
yarn bootstrap
```

At this point you should be ready to rock! To check run:

```bash
yarn test
```

from the root of the repository and you should see the tests run and execute for all of the modules.

## Pull Requests

Please make each PR small and atomic. Ideally they should never touch more than one generator at a time.

If you have any questions, please ask them early, I'd much rather answer them before you spend time doing work! Easiest way to do this is to open a PR with a trivial change (e.g. adding an empty function) then ask your question on the PR. This will keep it threaded and close to the actual function you're working on.

Please make sure the PR includes the relevant tests

## New Generators

The easiest way to get started with a new generator is to copy/paste one of the existing whole folders under the `packages/` folder and renaming everything in the package to be the new generator
