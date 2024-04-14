const PATH_TO_CHANCE_PACKAGE = "../../packages/chance/src";

module.exports = (plop) => {
  plop.setGenerator("install-generator", {
    description: "Install a generator",
    prompts: [
      {
        name: "generator",
        type: "input",
        message: "Which generator do you want to add to the Chance class?",
      },
      {
        name: "type",
        type: "input",
        message: "What is the return type of the generator?",
      },
    ],
    actions: [
      {
        type: "append",
        path: `${PATH_TO_CHANCE_PACKAGE}/index.ts`,
        pattern: "// plop-imports",
        template:
          'import { {{pascalCase generator}}Generator, {{pascalCase generator}}Options } from "@chancejs/{{camelCase generator}}";',
      },
      {
        type: "append",
        path: `${PATH_TO_CHANCE_PACKAGE}/index.ts`,
        pattern: "// plop-class-fields",
        template:
          "  private {{camelCase generator}}Generator: {{pascalCase generator}}Generator;",
      },
      {
        type: "append",
        path: `${PATH_TO_CHANCE_PACKAGE}/index.ts`,
        pattern: "// plop-constructor",
        template:
          "    this.{{camelCase generator}}Generator = new {{pascalCase generator}}Generator({ seed, generator });",
      },
      {
        type: "append",
        path: `${PATH_TO_CHANCE_PACKAGE}/index.ts`,
        pattern: "// plop-class-methods",
        template: `  {{camelCase generator}}(options?: {{pascalCase generator}}Options): {{type}} {
    return this.{{camelCase generator}}Generator.{{camelCase generator}}(options);
  }
`,
      },
      {
        type: "append",
        path: `${PATH_TO_CHANCE_PACKAGE}/interfaces.ts`,
        pattern: "// plop-interface-imports",
        template:
          'import { I{{pascalCase generator}}Generator } from "@chancejs/{{camelCase generator}}";',
      },
      {
        type: "append",
        path: `${PATH_TO_CHANCE_PACKAGE}/interfaces.ts`,
        pattern: "// plop-interface-union",
        template: "  I{{pascalCase generator}}Generator &",
      },
    ],
  });
};
