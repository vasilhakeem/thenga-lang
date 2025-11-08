// Abstract Syntax Tree Node Definitions

class ASTNode {
  constructor(type) {
    this.type = type;
  }
}

// Program root
class Program extends ASTNode {
  constructor(statements) {
    super('Program');
    this.statements = statements;
  }
}

// Literals
class NumberLiteral extends ASTNode {
  constructor(value) {
    super('NumberLiteral');
    this.value = value;
  }
}

class StringLiteral extends ASTNode {
  constructor(value) {
    super('StringLiteral');
    this.value = value;
  }
}

class BooleanLiteral extends ASTNode {
  constructor(value) {
    super('BooleanLiteral');
    this.value = value;
  }
}

class NullLiteral extends ASTNode {
  constructor() {
    super('NullLiteral');
    this.value = null;
  }
}

class ArrayLiteral extends ASTNode {
  constructor(elements) {
    super('ArrayLiteral');
    this.elements = elements;
  }
}

class ObjectLiteral extends ASTNode {
  constructor(properties) {
    super('ObjectLiteral');
    this.properties = properties; // Array of {key, value} pairs
  }
}

// Variables
class Identifier extends ASTNode {
  constructor(name) {
    super('Identifier');
    this.name = name;
  }
}

class VariableDeclaration extends ASTNode {
  constructor(name, value, isConstant = false) {
    super('VariableDeclaration');
    this.name = name;
    this.value = value;
    this.isConstant = isConstant;
  }
}

class Assignment extends ASTNode {
  constructor(left, right) {
    super('Assignment');
    this.left = left;
    this.right = right;
  }
}

// Binary Operations
class BinaryOperation extends ASTNode {
  constructor(left, operator, right) {
    super('BinaryOperation');
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

// Unary Operations
class UnaryOperation extends ASTNode {
  constructor(operator, operand) {
    super('UnaryOperation');
    this.operator = operator;
    this.operand = operand;
  }
}

// Function related
class FunctionDeclaration extends ASTNode {
  constructor(name, params, body, isAsync = false) {
    super('FunctionDeclaration');
    this.name = name;
    this.params = params;
    this.body = body;
    this.isAsync = isAsync;
  }
}

class FunctionCall extends ASTNode {
  constructor(name, args) {
    super('FunctionCall');
    this.name = name;
    this.args = args;
  }
}

class ReturnStatement extends ASTNode {
  constructor(value) {
    super('ReturnStatement');
    this.value = value;
  }
}

// Control Flow
class IfStatement extends ASTNode {
  constructor(condition, thenBlock, elseIfBlocks = [], elseBlock = null) {
    super('IfStatement');
    this.condition = condition;
    this.thenBlock = thenBlock;
    this.elseIfBlocks = elseIfBlocks; // Array of {condition, block}
    this.elseBlock = elseBlock;
  }
}

class WhileLoop extends ASTNode {
  constructor(condition, body) {
    super('WhileLoop');
    this.condition = condition;
    this.body = body;
  }
}

class ForLoop extends ASTNode {
  constructor(times, body) {
    super('ForLoop');
    this.times = times;
    this.body = body;
  }
}

class BreakStatement extends ASTNode {
  constructor() {
    super('BreakStatement');
  }
}

class ContinueStatement extends ASTNode {
  constructor() {
    super('ContinueStatement');
  }
}

// Error Handling
class TryStatement extends ASTNode {
  constructor(tryBlock, catchBlock, finallyBlock = null, errorVar = null) {
    super('TryStatement');
    this.tryBlock = tryBlock;
    this.catchBlock = catchBlock;
    this.finallyBlock = finallyBlock;
    this.errorVar = errorVar;
  }
}

class ThrowStatement extends ASTNode {
  constructor(value) {
    super('ThrowStatement');
    this.value = value;
  }
}

// Member Access
class MemberAccess extends ASTNode {
  constructor(object, property) {
    super('MemberAccess');
    this.object = object;
    this.property = property;
  }
}

class IndexAccess extends ASTNode {
  constructor(object, index) {
    super('IndexAccess');
    this.object = object;
    this.index = index;
  }
}

// Special Statements
class PrintStatement extends ASTNode {
  constructor(value) {
    super('PrintStatement');
    this.value = value;
  }
}

class InputStatement extends ASTNode {
  constructor(prompt) {
    super('InputStatement');
    this.prompt = prompt;
  }
}

class DeleteStatement extends ASTNode {
  constructor(target, force = false) {
    super('DeleteStatement');
    this.target = target;
    this.force = force;
  }
}

class TypeOfExpression extends ASTNode {
  constructor(value) {
    super('TypeOfExpression');
    this.value = value;
  }
}

class CopyExpression extends ASTNode {
  constructor(value) {
    super('CopyExpression');
    this.value = value;
  }
}

class AssertStatement extends ASTNode {
  constructor(condition, message = null) {
    super('AssertStatement');
    this.condition = condition;
    this.message = message;
  }
}

class DebugStatement extends ASTNode {
  constructor(value) {
    super('DebugStatement');
    this.value = value;
  }
}

class SleepStatement extends ASTNode {
  constructor(duration) {
    super('SleepStatement');
    this.duration = duration;
  }
}

class PassStatement extends ASTNode {
  constructor() {
    super('PassStatement');
  }
}

class WarningStatement extends ASTNode {
  constructor(message) {
    super('WarningStatement');
    this.message = message;
  }
}

class ValidateExpression extends ASTNode {
  constructor(value) {
    super('ValidateExpression');
    this.value = value;
  }
}

class TruthyCheckExpression extends ASTNode {
  constructor(value) {
    super('TruthyCheckExpression');
    this.value = value;
  }
}

// Block
class Block extends ASTNode {
  constructor(statements) {
    super('Block');
    this.statements = statements;
  }
}

// Async/Await
class AwaitExpression extends ASTNode {
  constructor(expression) {
    super('AwaitExpression');
    this.expression = expression;
  }
}

class PromiseExpression extends ASTNode {
  constructor(callback) {
    super('PromiseExpression');
    this.callback = callback;
  }
}

module.exports = {
  ASTNode,
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
  AwaitExpression,
  PromiseExpression
};