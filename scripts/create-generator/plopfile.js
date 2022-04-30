module.exports = (plop) => {
  plop.setGenerator("generator", {
    description: "Create a generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of your generator?",
      },
      {
        type: "input",
        name: "type",
        message:
          "What is the type of the output of your generator (e.g. number, boolean, etc.)?",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "../../packages/{{camelCase name}}",
        templateFiles: "./templates/**",
      },
    ],
  });
};
