export interface TemplateGeneratorFunction {
  /**
   *  Return a random string matching the given template.
   *
   *  The template consists of any number of "character replacement" and
   *  "character literal" sequences. A "character replacement" sequence
   *  starts with a left brace, has any number of special replacement
   *  characters, and ends with a right brace. A character literal can be any
   *  character except a brace or a backslash. A literal brace or backslash
   *  character can be included in the output by escaping with a backslash.
   *
   *  The following replacement characters can be used in a replacement
   *  sequence:
   *
   *      "#": a random digit
   *      "a": a random lower case letter
   *      "A": a random upper case letter
   *
   *  Example: chance.template('{AA###}-{##}')
   *
   *  @param {string} template string.
   *  @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   *  @return {string} The random string matching the template.
   *  @example
   *  // returns string
   *  template()
   */
  (template: string, seed?: number): string;
}

export interface ITemplateGenerator {
  template: TemplateGeneratorFunction;
}
