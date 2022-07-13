export class TokenCharacterException extends Error {
  constructor() {
    super();
    this.message = "Token must be a single character.";
  }
}

export class InvalidEscapeSequenceException extends Error {
  constructor(char: string) {
    super();
    this.message = 'Invalid escape sequence: "\\' + char + '".';
  }
}

export class InvalidReplacementCharacterException extends Error {
  constructor(char: string) {
    super();
    this.message = 'Invalid replacement character: "' + char + '".';
  }
}
