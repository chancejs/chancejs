module.exports = (plop) => {
  plop.setGenerator("generator", {
    description: "Create a package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of your package?",
      },
      {
        type: "input",
        name: "description",
        message: "Please provide a short description of your package.",
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
