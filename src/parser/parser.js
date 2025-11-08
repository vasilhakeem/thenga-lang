const { TokenType } = require('../lexer/tokens');
const {
  Program,
  NumberLiteral,
  StringLiteral,
  BooleanLiteral,
  NullLiteral,
  ArrayLiteral,
  ObjectLiteral,
  Identifier,
  VariableDeclaration,
  Assignment,
  BinaryOperation,
  UnaryOperation,
  FunctionDeclaration,
  FunctionCall,
  ReturnStatement,
  IfStatement,
  WhileLoop,
  ForLoop,
  BreakStatement,
  ContinueStatement,
  TryStatement,
  ThrowStatement,
  MemberAccess,
  IndexAccess,
  PrintStatement,
  InputStatement,
  DeleteStatement,
  TypeOfExpression,
  CopyExpression,
  AssertStatement,
  DebugStatement,
  SleepStatement,
  PassStatement,
  WarningStatement,
  ValidateExpression,
  TruthyCheckExpression,
  Block,
  AwaitExpression
} = require('./ast');

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
    this.currentToken = this.tokens[this.position];
  }

  error(message) {
    const token = this.currentToken;
    throw new Error(`Parser Error at ${token.line}:${token.column} - ${message}`);
  }

  advance() {
    this.position++;
    if (this.position < this.tokens.length) {
      this.currentToken = this.tokens[this.position];
    }
  }

  peek(offset = 1) {
    const pos = this.position + offset;
    if (pos < this.tokens.length) {
      return this.tokens[pos];
    }
    return this.tokens[this.tokens.length - 1];
  }

  expect(type) {
    if (this.currentToken.type !== type) {
      this.error(`Expected ${type}, got ${this.currentToken.type}`);
    }
    const token = this.currentToken;
    this.advance();
    return token;
  }

  match(...types) {
    return types.includes(this.currentToken.type);
  }

  // Main parse method
  parse() {
    const statements = [];
    
    while (this.currentToken.type !== TokenType.EOF) {
      statements.push(this.statement());
      
      // Optional semicolon
      if (this.match(TokenType.SEMICOLON)) {
        this.advance();
      }
    }
    
    return new Program(statements);
  }

  statement() {
    // Variable declaration
    if (this.match(TokenType.ITH_AAN, TokenType.ITH_FIXED_AAN)) {
      return this.variableDeclaration();
    }

    // Function declaration
    if (this.match(TokenType.PANI)) {
      return this.functionDeclaration();
    }

    // Print statement
    if (this.match(TokenType.PARA)) {
      return this.printStatement();
    }

    // Debug statement
    if (this.match(TokenType.ENTHADA_ITH)) {
      return this.debugStatement();
    }

    // Warning statement
    if (this.match(TokenType.KETT_PARANJU)) {
      return this.warningStatement();
    }

    // If statement
    if (this.match(TokenType.SERIYANO)) {
      return this.ifStatement();
    }

    // While loop
    if (this.match(TokenType.ODI_REPEAT_MWONE)) {
      return this.whileLoop();
    }

    // For loop
    if (this.match(TokenType.REPEAT_ADI)) {
      return this.forLoop();
    }

    // Break
    if (this.match(TokenType.ODARUTH_MONE)) {
      this.advance();
      return new BreakStatement();
    }

    // Continue
    if (this.match(TokenType.VITT_KALA)) {
      this.advance();
      return new ContinueStatement();
    }

    // Return
    if (this.match(TokenType.THIRICH_THA)) {
      return this.returnStatement();
    }

    // Try-catch
    if (this.match(TokenType.TRY_CHEYTH_NOKK)) {
      return this.tryStatement();
    }

    // Throw
    if (this.match(TokenType.THERI_VILI)) {
      return this.throwStatement();
    }

    // Delete
    if (this.match(TokenType.NEE_PO_MONE_DINESHA, TokenType.SHERIKKUM_POKKODA)) {
      return this.deleteStatement();
    }

    // Assert
    if (this.match(TokenType.ADIPOLI_AAN, TokenType.ITH_MANASILAAYO)) {
      return this.assertStatement();
    }

    // Sleep
    if (this.match(TokenType.SCENE_IDD)) {
      return this.sleepStatement();
    }

    // Pass
    if (this.match(TokenType.CHUMMA_IRI_MONE)) {
      this.advance();
      return new PassStatement();
    }

    // Expression statement (includes assignment)
    return this.expressionStatement();
  }

  variableDeclaration() {
    const isConstant = this.currentToken.type === TokenType.ITH_FIXED_AAN;
    this.advance();

    const name = this.expect(TokenType.IDENTIFIER).value;
    this.expect(TokenType.EQUALS);
    const value = this.expression();

    return new VariableDeclaration(name, value, isConstant);
  }

  functionDeclaration() {
    this.advance(); // skip 'pani'
    
    const isAsync = false; // We'll handle async later if needed
    const name = this.expect(TokenType.IDENTIFIER).value;
    
    this.expect(TokenType.LPAREN);
    const params = [];
    
    if (!this.match(TokenType.RPAREN)) {
      params.push(this.expect(TokenType.IDENTIFIER).value);
      
      while (this.match(TokenType.COMMA)) {
        this.advance();
        params.push(this.expect(TokenType.IDENTIFIER).value);
      }
    }
    
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    
    const body = this.block();
    
    this.expect(TokenType.RBRACE);
    
    return new FunctionDeclaration(name, params, body, isAsync);
  }

  printStatement() {
    this.advance(); // skip 'para'
    this.expect(TokenType.LPAREN);
    const value = this.expression();
    this.expect(TokenType.RPAREN);
    return new PrintStatement(value);
  }

  debugStatement() {
    this.advance(); // skip 'enthada_ith'
    this.expect(TokenType.LPAREN);
    const value = this.expression();
    this.expect(TokenType.RPAREN);
    return new DebugStatement(value);
  }

  warningStatement() {
    this.advance(); // skip 'kett_paranju'
    this.expect(TokenType.LPAREN);
    const message = this.expression();
    this.expect(TokenType.RPAREN);
    return new WarningStatement(message);
  }

  ifStatement() {
    this.advance(); // skip 'seriyano'
    this.expect(TokenType.LPAREN);
    const condition = this.expression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const thenBlock = this.block();
    this.expect(TokenType.RBRACE);

    const elseIfBlocks = [];
    let elseBlock = null;

    // Handle else if (allelum)
    while (this.match(TokenType.ALLELUM)) {
      this.advance();
      this.expect(TokenType.LPAREN);
      const elseIfCondition = this.expression();
      this.expect(TokenType.RPAREN);
      this.expect(TokenType.LBRACE);
      const elseIfBody = this.block();
      this.expect(TokenType.RBRACE);
      elseIfBlocks.push({ condition: elseIfCondition, block: elseIfBody });
    }

    // Handle else (allengil)
    if (this.match(TokenType.ALLENGIL)) {
      this.advance();
      this.expect(TokenType.LBRACE);
      elseBlock = this.block();
      this.expect(TokenType.RBRACE);
    }

    return new IfStatement(condition, thenBlock, elseIfBlocks, elseBlock);
  }

  whileLoop() {
    this.advance(); // skip 'odi_repeat_mwone'
    this.expect(TokenType.LPAREN);
    const condition = this.expression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.block();
    this.expect(TokenType.RBRACE);
    return new WhileLoop(condition, body);
  }

  forLoop() {
    this.advance(); // skip 'repeat_adi'
    this.expect(TokenType.LPAREN);
    const times = this.expression();
    this.expect(TokenType.RPAREN);
    this.expect(TokenType.LBRACE);
    const body = this.block();
    this.expect(TokenType.RBRACE);
    return new ForLoop(times, body);
  }

  returnStatement() {
    this.advance(); // skip 'thirich_tha'
    
    // Return can be empty
    if (this.match(TokenType.SEMICOLON, TokenType.RBRACE)) {
      return new ReturnStatement(null);
    }
    
    const value = this.expression();
    return new ReturnStatement(value);
  }

  tryStatement() {
    this.advance(); // skip 'try_cheyth_nokk'
    this.expect(TokenType.LBRACE);
    const tryBlock = this.block();
    this.expect(TokenType.RBRACE);

    let catchBlock = null;
    let errorVar = null;

    if (this.match(TokenType.PIDIKK)) {
      this.advance();
      this.expect(TokenType.LPAREN);
      errorVar = this.expect(TokenType.IDENTIFIER).value;
      this.expect(TokenType.RPAREN);
      this.expect(TokenType.LBRACE);
      catchBlock = this.block();
      this.expect(TokenType.RBRACE);
    }

    let finallyBlock = null;
    if (this.match(TokenType.ETTAVUM_AVASANAM)) {
      this.advance();
      this.expect(TokenType.LBRACE);
      finallyBlock = this.block();
      this.expect(TokenType.RBRACE);
    }

    return new TryStatement(tryBlock, catchBlock, finallyBlock, errorVar);
  }

  throwStatement() {
    this.advance(); // skip 'theri_vili'
    this.expect(TokenType.LPAREN);
    const value = this.expression();
    this.expect(TokenType.RPAREN);
    return new ThrowStatement(value);
  }

  deleteStatement() {
    const force = this.currentToken.type === TokenType.SHERIKKUM_POKKODA;
    this.advance();
    this.expect(TokenType.LPAREN);
    const target = this.expression();
    this.expect(TokenType.RPAREN);
    return new DeleteStatement(target, force);
  }

  assertStatement() {
    const isDetailed = this.currentToken.type === TokenType.ITH_MANASILAAYO;
    this.advance();
    this.expect(TokenType.LPAREN);
    const condition = this.expression();
    
    let message = null;
    if (isDetailed && this.match(TokenType.COMMA)) {
      this.advance();
      message = this.expression();
    }
    
    this.expect(TokenType.RPAREN);
    return new AssertStatement(condition, message);
  }

  sleepStatement() {
    this.advance(); // skip 'scene_idd'
    this.expect(TokenType.LPAREN);
    const duration = this.expression();
    this.expect(TokenType.RPAREN);
    return new SleepStatement(duration);
  }

  expressionStatement() {
    const expr = this.expression();
    
    // Check for assignment
    if (this.match(TokenType.EQUALS)) {
      this.advance();
      const value = this.expression();
      return new Assignment(expr, value);
    }
    
    return expr;
  }

  block() {
    const statements = [];
    
    while (!this.match(TokenType.RBRACE) && !this.match(TokenType.EOF)) {
      statements.push(this.statement());
      
      if (this.match(TokenType.SEMICOLON)) {
        this.advance();
      }
    }
    
    return new Block(statements);
  }

  expression() {
    return this.logicalOr();
  }

  logicalOr() {
    let left = this.logicalAnd();

    while (this.match(TokenType.ALLEL)) {
      const operator = this.currentToken.value;
      this.advance();
      const right = this.logicalAnd();
      left = new BinaryOperation(left, operator, right);
    }

    return left;
  }

  logicalAnd() {
    let left = this.equality();

    while (this.match(TokenType.PINNEM)) {
      const operator = this.currentToken.value;
      this.advance();
      const right = this.equality();
      left = new BinaryOperation(left, operator, right);
    }

    return left;
  }

  equality() {
    let left = this.comparison();

    while (this.match(TokenType.SAME_AANO, TokenType.BILKUL_SAME, TokenType.VENDATHILLA)) {
      const operator = this.currentToken.value;
      this.advance();
      const right = this.comparison();
      left = new BinaryOperation(left, operator, right);
    }

    return left;
  }

  comparison() {
    let left = this.term();

    while (this.match(
      TokenType.VELLIYA,
      TokenType.CHERIYA,
      TokenType.VELLIYATHUM_SAME,
      TokenType.CHERIYATHUM_SAME
    )) {
      const operator = this.currentToken.value;
      this.advance();
      const right = this.term();
      left = new BinaryOperation(left, operator, right);
    }

    return left;
  }

  term() {
    let left = this.factor();

    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.currentToken.value;
      this.advance();
      const right = this.factor();
      left = new BinaryOperation(left, operator, right);
    }

    return left;
  }

  factor() {
    let left = this.unary();

    while (this.match(TokenType.MULTIPLY, TokenType.DIVIDE, TokenType.MODULO)) {
      const operator = this.currentToken.value;
      this.advance();
      const right = this.unary();
      left = new BinaryOperation(left, operator, right);
    }

    return left;
  }

  unary() {
    if (this.match(TokenType.ONNUM_VENDA, TokenType.MINUS)) {
      const operator = this.currentToken.value;
      this.advance();
      const operand = this.unary();
      return new UnaryOperation(operator, operand);
    }

    return this.postfix();
  }

  postfix() {
    let expr = this.primary();

    while (true) {
      if (this.match(TokenType.DOT)) {
        this.advance();
        const property = this.expect(TokenType.IDENTIFIER).value;
        expr = new MemberAccess(expr, property);
      } else if (this.match(TokenType.LBRACKET)) {
        this.advance();
        const index = this.expression();
        this.expect(TokenType.RBRACKET);
        expr = new IndexAccess(expr, index);
      } else if (this.match(TokenType.LPAREN)) {
        // Function call
        this.advance();
        const args = [];
        
        if (!this.match(TokenType.RPAREN)) {
          args.push(this.expression());
          
          while (this.match(TokenType.COMMA)) {
            this.advance();
            args.push(this.expression());
          }
        }
        
        this.expect(TokenType.RPAREN);
        expr = new FunctionCall(expr, args);
      } else {
        break;
      }
    }

    return expr;
  }

  primary() {
    // Number
    if (this.match(TokenType.NUMBER)) {
      const value = this.currentToken.value;
      this.advance();
      return new NumberLiteral(value);
    }

    // String
    if (this.match(TokenType.STRING)) {
      const value = this.currentToken.value;
      this.advance();
      return new StringLiteral(value);
    }

    // Boolean
    if (this.match(TokenType.SHERIYA, TokenType.SHERIYALLA)) {
      const value = this.currentToken.value;
      this.advance();
      return new BooleanLiteral(value);
    }

    // Null
    if (this.match(TokenType.ONNUM_ILLA)) {
      this.advance();
      return new NullLiteral();
    }

    // Array literal
    if (this.match(TokenType.LBRACKET)) {
      return this.arrayLiteral();
    }

    // Object literal
    if (this.match(TokenType.LBRACE)) {
      return this.objectLiteral();
    }

    // Parenthesized expression
    if (this.match(TokenType.LPAREN)) {
      this.advance();
      const expr = this.expression();
      this.expect(TokenType.RPAREN);
      return expr;
    }

    // Special functions
    if (this.match(TokenType.CHODHIK)) {
      return this.inputExpression();
    }

    if (this.match(TokenType.ITHENTHONN)) {
      return this.typeofExpression();
    }

    if (this.match(TokenType.COPY_ADI)) {
      return this.copyExpression();
    }

    if (this.match(TokenType.NER_AANO_MWONE)) {
      return this.truthyCheckExpression();
    }

    if (this.match(TokenType.AALU_SHERI_AANO)) {
      return this.validateExpression();
    }

    if (this.match(TokenType.RANDOM)) {
      return this.randomExpression();
    }

    // Built-in math functions
    if (this.match(TokenType.KOOTTU, TokenType.KURAKKU, TokenType.GUNIKKU, TokenType.HARIKKU)) {
      return this.mathFunctionCall();
    }

    // String functions
    if (this.match(TokenType.JOIN_PANNUDA, TokenType.SPLIT_PANNUDA, TokenType.TRIM_PANNUDA, TokenType.KOOTI_VEKKADA)) {
      return this.stringFunctionCall();
    }

    // Identifier (variable or function name)
    if (this.match(TokenType.IDENTIFIER)) {
      const name = this.currentToken.value;
      this.advance();
      return new Identifier(name);
    }

    this.error(`Unexpected token: ${this.currentToken.type}`);
  }

  arrayLiteral() {
    this.advance(); // skip '['
    const elements = [];

    if (!this.match(TokenType.RBRACKET)) {
      elements.push(this.expression());

      while (this.match(TokenType.COMMA)) {
        this.advance();
        if (this.match(TokenType.RBRACKET)) break; // trailing comma
        elements.push(this.expression());
      }
    }

    this.expect(TokenType.RBRACKET);
    return new ArrayLiteral(elements);
  }

  objectLiteral() {
    this.advance(); // skip '{'
    const properties = [];

    if (!this.match(TokenType.RBRACE)) {
      do {
        if (this.match(TokenType.RBRACE)) break; // trailing comma
        
        const key = this.match(TokenType.STRING) 
          ? this.currentToken.value 
          : this.expect(TokenType.IDENTIFIER).value;
        
        if (this.match(TokenType.STRING)) this.advance();
        
        this.expect(TokenType.COLON);
        const value = this.expression();
        properties.push({ key, value });

        if (!this.match(TokenType.COMMA)) break;
        this.advance();
      } while (!this.match(TokenType.RBRACE));
    }

    this.expect(TokenType.RBRACE);
    return new ObjectLiteral(properties);
  }

  inputExpression() {
    this.advance(); // skip 'chodhik'
    this.expect(TokenType.LPAREN);
    const prompt = this.expression();
    this.expect(TokenType.RPAREN);
    return new InputStatement(prompt);
  }

  typeofExpression() {
    this.advance(); // skip 'ithenthonn'
    this.expect(TokenType.LPAREN);
    const value = this.expression();
    this.expect(TokenType.RPAREN);
    return new TypeOfExpression(value);
  }

  copyExpression() {
    this.advance(); // skip 'copy_adi'
    this.expect(TokenType.LPAREN);
    const value = this.expression();
    this.expect(TokenType.RPAREN);
    return new CopyExpression(value);
  }

  truthyCheckExpression() {
    this.advance(); // skip 'ner_aano_mwone'
    this.expect(TokenType.LPAREN);
    const value = this.expression();
    this.expect(TokenType.RPAREN);
    return new TruthyCheckExpression(value);
  }

  validateExpression() {
    this.advance(); // skip 'aalu_sheri_aano'
    this.expect(TokenType.LPAREN);
    const value = this.expression();
    this.expect(TokenType.RPAREN);
    return new ValidateExpression(value);
  }

  randomExpression() {
    this.advance(); // skip 'random'
    this.expect(TokenType.LPAREN);
    this.expect(TokenType.RPAREN);
    return new FunctionCall(new Identifier('random'), []);
  }

  mathFunctionCall() {
    const funcName = this.currentToken.type;
    this.advance();
    this.expect(TokenType.LPAREN);
    
    const args = [this.expression()];
    this.expect(TokenType.COMMA);
    args.push(this.expression());
    
    this.expect(TokenType.RPAREN);
    
    const funcMap = {
      [TokenType.KOOTTU]: 'add',
      [TokenType.KURAKKU]: 'subtract',
      [TokenType.GUNIKKU]: 'multiply',
      [TokenType.HARIKKU]: 'divide'
    };
    
    return new FunctionCall(new Identifier(funcMap[funcName]), args);
  }

  stringFunctionCall() {
    const funcName = this.currentToken.type;
    this.advance();
    this.expect(TokenType.LPAREN);
    
    const args = [];
    if (!this.match(TokenType.RPAREN)) {
      args.push(this.expression());
      
      while (this.match(TokenType.COMMA)) {
        this.advance();
        args.push(this.expression());
      }
    }
    
    this.expect(TokenType.RPAREN);
    
    const funcMap = {
      [TokenType.JOIN_PANNUDA]: 'join',
      [TokenType.SPLIT_PANNUDA]: 'split',
      [TokenType.TRIM_PANNUDA]: 'trim',
      [TokenType.KOOTI_VEKKADA]: 'concat'
    };
    
    return new FunctionCall(new Identifier(funcMap[funcName]), args);
  }
}

module.exports = Parser;