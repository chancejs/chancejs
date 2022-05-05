# Generators

The vast majority of the packages in Chance are generators. Generators use pseudo-random number generator to generate a specified data type. The abstract classes and interfaces for generators are maintained in this package.

## Creating a generator

From the package root, run the following command and follow the prompts:

```sh
$ yarn run generator:create
```

This should generate a new package in the `/packages` directory with all of the necessary files to start with.

Next, you write your generator function body and tests. Once, your code is merged in, your generator will be published as a separate npm package in the `@chancejs` namespace.

## Adding generator methods to the Chance class

You can also add your generator to the `Chance` class as a method.

Once you write your generator code and tests, you can install the package locally:

```sh
$ yarn workspace @chancejs/chance add @chancejs/YOUR_GENERATOR@1.0.0
```

Then you can generate the boilerplate code to add the generator as a method:

```sh
$ yarn method:add
```

Now you can use your generator as a method on the `Chance` class.
