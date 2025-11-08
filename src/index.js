const fs = require('fs');
const Lexer = require('./lexer/lexer');
const Parser = require('./parser/parser');
const { Interpreter, ThengaError } = require('./interpreter/interpreter');

class ThengaLang {
  constructor() {
    this.lexer = null;
    this.parser = null;
    this.interpreter = null;
  }

  run(code, outputCallback = console.log, inputCallback = null) {
    try {
      // Lexical Analysis
      this.lexer = new Lexer(code);
      const tokens = this.lexer.tokenize();

      // Parsing
      this.parser = new Parser(tokens);
      const ast = this.parser.parse();

      // Interpretation
      this.interpreter = new Interpreter(outputCallback, inputCallback);
      return this.interpreter.interpret(ast);
    } catch (error) {
      if (error instanceof ThengaError) {
        throw error;
      }
      throw new Error(`Thenga Lang Error: ${error.message}`);
    }
  }

  runFile(filepath, outputCallback = console.log, inputCallback = null) {
    if (!fs.existsSync(filepath)) {
      throw new Error(`File not found: ${filepath}`);
    }

    const code = fs.readFileSync(filepath, 'utf-8');
    return this.run(code, outputCallback, inputCallback);
  }

  tokenize(code) {
    this.lexer = new Lexer(code);
    return this.lexer.tokenize();
  }

  parse(code) {
    const tokens = this.tokenize(code);
    this.parser = new Parser(tokens);
    return this.parser.parse();
  }
}

module.exports = ThengaLang;
