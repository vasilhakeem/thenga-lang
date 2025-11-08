const { Token, TokenType, KEYWORDS } = require('./tokens');

class Lexer {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.line = 1;
    this.column = 1;
    this.currentChar = this.input[this.position];
  }

  error(message) {
    throw new Error(`Lexer Error at ${this.line}:${this.column} - ${message}`);
  }

  advance() {
    if (this.currentChar === '\n') {
      this.line++;
      this.column = 0;
    }
    
    this.position++;
    this.column++;
    
    if (this.position >= this.input.length) {
      this.currentChar = null;
    } else {
      this.currentChar = this.input[this.position];
    }
  }

  peek(offset = 1) {
    const peekPos = this.position + offset;
    if (peekPos >= this.input.length) {
      return null;
    }
    return this.input[peekPos];
  }

  skipWhitespace() {
    while (this.currentChar !== null && /\s/.test(this.currentChar) && this.currentChar !== '\n') {
      this.advance();
    }
  }

  skipSingleLineComment() {
    // Skip // ingane aan
    while (this.currentChar !== null && this.currentChar !== '\n') {
      this.advance();
    }
  }

  skipMultiLineComment() {
    // Skip /* ... */
    this.advance(); // skip *
    this.advance(); // skip /
    
    while (this.currentChar !== null) {
      if (this.currentChar === '*' && this.peek() === '/') {
        this.advance(); // skip *
        this.advance(); // skip /
        break;
      }
      this.advance();
    }
  }

  readNumber() {
    const startLine = this.line;
    const startColumn = this.column;
    let numStr = '';
    let hasDot = false;

    while (this.currentChar !== null && (/\d/.test(this.currentChar) || this.currentChar === '.')) {
      if (this.currentChar === '.') {
        if (hasDot) {
          this.error('Invalid number: multiple decimal points');
        }
        hasDot = true;
      }
      numStr += this.currentChar;
      this.advance();
    }

    const value = hasDot ? parseFloat(numStr) : parseInt(numStr, 10);
    return new Token(TokenType.NUMBER, value, startLine, startColumn);
  }

  readString(quote) {
    const startLine = this.line;
    const startColumn = this.column;
    let str = '';
    
    this.advance(); // skip opening quote

    while (this.currentChar !== null && this.currentChar !== quote) {
      if (this.currentChar === '\\') {
        this.advance();
        if (this.currentChar === null) {
          this.error('Unterminated string');
        }
        
        // Handle escape sequences
        switch (this.currentChar) {
          case 'n':
            str += '\n';
            break;
          case 't':
            str += '\t';
            break;
          case 'r':
            str += '\r';
            break;
          case '\\':
            str += '\\';
            break;
          case quote:
            str += quote;
            break;
          default:
            str += this.currentChar;
        }
      } else {
        str += this.currentChar;
      }
      this.advance();
    }

    if (this.currentChar === null) {
      this.error('Unterminated string');
    }

    this.advance(); // skip closing quote
    return new Token(TokenType.STRING, str, startLine, startColumn);
  }

  readIdentifier() {
    const startLine = this.line;
    const startColumn = this.column;
    let identifier = '';

    while (this.currentChar !== null && /[a-zA-Z0-9_]/.test(this.currentChar)) {
      identifier += this.currentChar;
      this.advance();
    }

    // Check if it's a keyword
    const tokenType = KEYWORDS[identifier] || TokenType.IDENTIFIER;
    
    // Handle boolean and null literals
    let value = identifier;
    if (tokenType === TokenType.SHERIYA) value = true;
    if (tokenType === TokenType.SHERIYALLA) value = false;
    if (tokenType === TokenType.ONNUM_ILLA) value = null;

    return new Token(tokenType, value, startLine, startColumn);
  }

  getNextToken() {
    while (this.currentChar !== null) {
      const startLine = this.line;
      const startColumn = this.column;

      // Skip whitespace
      if (/\s/.test(this.currentChar) && this.currentChar !== '\n') {
        this.skipWhitespace();
        continue;
      }

      // Newline
      if (this.currentChar === '\n') {
        this.advance();
        continue; // We'll treat newlines as optional statement terminators
      }

      // Comments
      if (this.currentChar === '/' && this.peek() === '/') {
        this.advance();
        this.advance();
        this.skipSingleLineComment();
        continue;
      }

      if (this.currentChar === '/' && this.peek() === '*') {
        this.skipMultiLineComment();
        continue;
      }

      // Numbers
      if (/\d/.test(this.currentChar)) {
        return this.readNumber();
      }

      // Strings
      if (this.currentChar === '"' || this.currentChar === "'") {
        return this.readString(this.currentChar);
      }

      // Identifiers and Keywords
      if (/[a-zA-Z_]/.test(this.currentChar)) {
        return this.readIdentifier();
      }

      // Two-character operators
      if (this.currentChar === '=' && this.peek() === '=') {
        this.advance();
        this.advance();
        return new Token(TokenType.SAME_AANO, '==', startLine, startColumn);
      }

      if (this.currentChar === '=' && this.peek() === '=' && this.peek(2) === '=') {
        this.advance();
        this.advance();
        this.advance();
        return new Token(TokenType.BILKUL_SAME, '===', startLine, startColumn);
      }

      if (this.currentChar === '!' && this.peek() === '=') {
        this.advance();
        this.advance();
        return new Token(TokenType.VENDATHILLA, '!=', startLine, startColumn);
      }

      if (this.currentChar === '>' && this.peek() === '=') {
        this.advance();
        this.advance();
        return new Token(TokenType.VELLIYATHUM_SAME, '>=', startLine, startColumn);
      }

      if (this.currentChar === '<' && this.peek() === '=') {
        this.advance();
        this.advance();
        return new Token(TokenType.CHERIYATHUM_SAME, '<=', startLine, startColumn);
      }

      if (this.currentChar === '&' && this.peek() === '&') {
        this.advance();
        this.advance();
        return new Token(TokenType.PINNEM, '&&', startLine, startColumn);
      }

      if (this.currentChar === '|' && this.peek() === '|') {
        this.advance();
        this.advance();
        return new Token(TokenType.ALLEL, '||', startLine, startColumn);
      }

      // Single-character tokens
      const char = this.currentChar;
      this.advance();

      switch (char) {
        case '+':
          return new Token(TokenType.PLUS, '+', startLine, startColumn);
        case '-':
          return new Token(TokenType.MINUS, '-', startLine, startColumn);
        case '*':
          return new Token(TokenType.MULTIPLY, '*', startLine, startColumn);
        case '/':
          return new Token(TokenType.DIVIDE, '/', startLine, startColumn);
        case '%':
          return new Token(TokenType.MODULO, '%', startLine, startColumn);
        case '=':
          return new Token(TokenType.EQUALS, '=', startLine, startColumn);
        case '>':
          return new Token(TokenType.VELLIYA, '>', startLine, startColumn);
        case '<':
          return new Token(TokenType.CHERIYA, '<', startLine, startColumn);
        case '!':
          return new Token(TokenType.ONNUM_VENDA, '!', startLine, startColumn);
        case '(':
          return new Token(TokenType.LPAREN, '(', startLine, startColumn);
        case ')':
          return new Token(TokenType.RPAREN, ')', startLine, startColumn);
        case '{':
          return new Token(TokenType.LBRACE, '{', startLine, startColumn);
        case '}':
          return new Token(TokenType.RBRACE, '}', startLine, startColumn);
        case '[':
          return new Token(TokenType.LBRACKET, '[', startLine, startColumn);
        case ']':
          return new Token(TokenType.RBRACKET, ']', startLine, startColumn);
        case ',':
          return new Token(TokenType.COMMA, ',', startLine, startColumn);
        case ';':
          return new Token(TokenType.SEMICOLON, ';', startLine, startColumn);
        case '.':
          return new Token(TokenType.DOT, '.', startLine, startColumn);
        case ':':
          return new Token(TokenType.COLON, ':', startLine, startColumn);
        default:
          this.error(`Unexpected character: '${char}'`);
      }
    }

    return new Token(TokenType.EOF, null, this.line, this.column);
  }

  tokenize() {
    const tokens = [];
    let token = this.getNextToken();

    while (token.type !== TokenType.EOF) {
      tokens.push(token);
      token = this.getNextToken();
    }

    tokens.push(token); // Add EOF token
    return tokens;
  }
}

module.exports = Lexer;