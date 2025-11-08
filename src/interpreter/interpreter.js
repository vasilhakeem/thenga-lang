const readline = require('readline');

// Special control flow exceptions
class ReturnValue {
  constructor(value) {
    this.value = value;
  }
}

class BreakException {}
class ContinueException {}

class ThengaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ThengaError';
  }
}

class Environment {
  constructor(parent = null) {
    this.parent = parent;
    this.variables = new Map();
    this.constants = new Set();
  }

  define(name, value, isConstant = false) {
    if (this.variables.has(name)) {
      throw new ThengaError(`Variable '${name}' already declared`);
    }
    this.variables.set(name, value);
    if (isConstant) {
      this.constants.add(name);
    }
  }

  get(name) {
    if (this.variables.has(name)) {
      return this.variables.get(name);
    }
    if (this.parent) {
      return this.parent.get(name);
    }
    throw new ThengaError(`Undefined variable: '${name}'`);
  }

  set(name, value) {
    if (this.variables.has(name)) {
      if (this.constants.has(name)) {
        throw new ThengaError(`Cannot reassign constant: '${name}'`);
      }
      this.variables.set(name, value);
      return;
    }
    if (this.parent) {
      this.parent.set(name, value);
      return;
    }
    throw new ThengaError(`Undefined variable: '${name}'`);
  }

  delete(name) {
    if (this.constants.has(name)) {
      throw new ThengaError(`Cannot delete constant: '${name}'`);
    }
    if (this.variables.has(name)) {
      this.variables.delete(name);
      return true;
    }
    if (this.parent) {
      return this.parent.delete(name);
    }
    return false;
  }
}

class Interpreter {
  constructor(outputCallback = console.log, inputCallback = null) {
    this.globalEnv = new Environment();
    this.outputCallback = outputCallback;
    this.inputCallback = inputCallback;
    this.setupBuiltins();
  }

  setupBuiltins() {
    // Math functions
    this.globalEnv.define('add', (a, b) => a + b);
    this.globalEnv.define('subtract', (a, b) => a - b);
    this.globalEnv.define('multiply', (a, b) => a * b);
    this.globalEnv.define('divide', (a, b) => {
      if (b === 0) throw new ThengaError('Division by zero');
      return a / b;
    });
    this.globalEnv.define('random', () => Math.random());

    // String functions
    this.globalEnv.define('join', (arr, sep = ',') => {
      if (!Array.isArray(arr)) throw new ThengaError('join requires an array');
      return arr.join(sep);
    });
    this.globalEnv.define('split', (str, sep = ',') => {
      if (typeof str !== 'string') throw new ThengaError('split requires a string');
      return str.split(sep);
    });
    this.globalEnv.define('trim', (str) => {
      if (typeof str !== 'string') throw new ThengaError('trim requires a string');
      return str.trim();
    });
    this.globalEnv.define('concat', (...args) => {
      return args.map(a => String(a)).join('');
    });

    // Array methods
    this.globalEnv.define('push', (arr, ...items) => {
      if (!Array.isArray(arr)) throw new ThengaError('push requires an array');
      arr.push(...items);
      return arr.length;
    });
    this.globalEnv.define('pop', (arr) => {
      if (!Array.isArray(arr)) throw new ThengaError('pop requires an array');
      return arr.pop();
    });
    this.globalEnv.define('length', (arr) => {
      if (Array.isArray(arr) || typeof arr === 'string') return arr.length;
      if (typeof arr === 'object' && arr !== null) return Object.keys(arr).length;
      throw new ThengaError('length requires an array, string, or object');
    });
  }

  interpret(ast) {
    try {
      return this.visit(ast, this.globalEnv);
    } catch (error) {
      if (error instanceof ThengaError) {
        throw error;
      }
      throw new ThengaError(`Runtime error: ${error.message}`);
    }
  }

  visit(node, env) {
    const methodName = `visit${node.type}`;
    if (typeof this[methodName] === 'function') {
      return this[methodName](node, env);
    }
    throw new ThengaError(`No visit method for ${node.type}`);
  }

  visitProgram(node, env) {
    let result = null;
    for (const statement of node.statements) {
      result = this.visit(statement, env);
    }
    return result;
  }

  visitBlock(node, env) {
    let result = null;
    for (const statement of node.statements) {
      result = this.visit(statement, env);
    }
    return result;
  }

  visitNumberLiteral(node, env) {
    return node.value;
  }

  visitStringLiteral(node, env) {
    return node.value;
  }

  visitBooleanLiteral(node, env) {
    return node.value;
  }

  visitNullLiteral(node, env) {
    return null;
  }

  visitArrayLiteral(node, env) {
    return node.elements.map(el => this.visit(el, env));
  }

  visitObjectLiteral(node, env) {
    const obj = {};
    for (const prop of node.properties) {
      obj[prop.key] = this.visit(prop.value, env);
    }
    return obj;
  }

  visitIdentifier(node, env) {
    return env.get(node.name);
  }

  visitVariableDeclaration(node, env) {
    const value = this.visit(node.value, env);
    env.define(node.name, value, node.isConstant);
    return value;
  }

  visitAssignment(node, env) {
    const value = this.visit(node.right, env);

    if (node.left.type === 'Identifier') {
      env.set(node.left.name, value);
    } else if (node.left.type === 'MemberAccess') {
      const obj = this.visit(node.left.object, env);
      obj[node.left.property] = value;
    } else if (node.left.type === 'IndexAccess') {
      const obj = this.visit(node.left.object, env);
      const index = this.visit(node.left.index, env);
      obj[index] = value;
    } else {
      throw new ThengaError('Invalid assignment target');
    }

    return value;
  }

  visitBinaryOperation(node, env) {
    const left = this.visit(node.left, env);
    const right = this.visit(node.right, env);

    switch (node.operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/':
        if (right === 0) throw new ThengaError('Division by zero');
        return left / right;
      case '%': return left % right;
      case '>': return left > right;
      case '<': return left < right;
      case '>=': return left >= right;
      case '<=': return left <= right;
      case '==': return left == right;
      case '===': return left === right;
      case '!=': return left != right;
      case '&&': return left && right;
      case '||': return left || right;
      default:
        throw new ThengaError(`Unknown operator: ${node.operator}`);
    }
  }

  visitUnaryOperation(node, env) {
    const operand = this.visit(node.operand, env);

    switch (node.operator) {
      case '!': return !operand;
      case '-': return -operand;
      default:
        throw new ThengaError(`Unknown unary operator: ${node.operator}`);
    }
  }

  visitFunctionDeclaration(node, env) {
    const func = {
      params: node.params,
      body: node.body,
      env: env,
      isAsync: node.isAsync
    };
    env.define(node.name, func);
    return func;
  }

  visitFunctionCall(node, env) {
    let func;
    let funcName;

    if (node.name.type === 'Identifier') {
      funcName = node.name.name;
      func = env.get(funcName);
    } else {
      func = this.visit(node.name, env);
    }

    const args = node.args.map(arg => this.visit(arg, env));

    // Built-in function (JavaScript function)
    if (typeof func === 'function') {
      return func(...args);
    }

    // User-defined function
    if (func && func.params && func.body) {
      const funcEnv = new Environment(func.env);

      // Bind parameters
      if (args.length !== func.params.length) {
        throw new ThengaError(
          `Function '${funcName}' expects ${func.params.length} arguments, got ${args.length}`
        );
      }

      for (let i = 0; i < func.params.length; i++) {
        funcEnv.define(func.params[i], args[i]);
      }

      // Execute function body
      try {
        this.visit(func.body, funcEnv);
        return null; // No explicit return
      } catch (error) {
        if (error instanceof ReturnValue) {
          return error.value;
        }
        throw error;
      }
    }

    throw new ThengaError(`'${funcName}' is not a function`);
  }

  visitReturnStatement(node, env) {
    const value = node.value ? this.visit(node.value, env) : null;
    throw new ReturnValue(value);
  }

  visitIfStatement(node, env) {
    const condition = this.visit(node.condition, env);

    if (this.isTruthy(condition)) {
      return this.visit(node.thenBlock, env);
    }

    // Check else-if blocks
    for (const elseIfBlock of node.elseIfBlocks) {
      const elseIfCondition = this.visit(elseIfBlock.condition, env);
      if (this.isTruthy(elseIfCondition)) {
        return this.visit(elseIfBlock.block, env);
      }
    }

    // Else block
    if (node.elseBlock) {
      return this.visit(node.elseBlock, env);
    }

    return null;
  }

  visitWhileLoop(node, env) {
    let result = null;

    try {
      while (this.isTruthy(this.visit(node.condition, env))) {
        try {
          result = this.visit(node.body, env);
        } catch (error) {
          if (error instanceof ContinueException) {
            continue;
          }
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof BreakException) {
        return result;
      }
      throw error;
    }

    return result;
  }

  visitForLoop(node, env) {
    const times = this.visit(node.times, env);

    if (typeof times !== 'number' || times < 0) {
      throw new ThengaError('For loop requires a non-negative number');
    }

    let result = null;

    try {
      for (let i = 0; i < times; i++) {
        const loopEnv = new Environment(env);
        loopEnv.define('i', i);

        try {
          result = this.visit(node.body, loopEnv);
        } catch (error) {
          if (error instanceof ContinueException) {
            continue;
          }
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof BreakException) {
        return result;
      }
      throw error;
    }

    return result;
  }

  visitBreakStatement(node, env) {
    throw new BreakException();
  }

  visitContinueStatement(node, env) {
    throw new ContinueException();
  }

  visitTryStatement(node, env) {
    let result = null;

    try {
      result = this.visit(node.tryBlock, env);
    } catch (error) {
      if (node.catchBlock) {
        const catchEnv = new Environment(env);
        if (node.errorVar) {
          const errorMessage = error instanceof ThengaError 
            ? error.message 
            : String(error);
          catchEnv.define(node.errorVar, errorMessage);
        }
        result = this.visit(node.catchBlock, catchEnv);
      } else {
        throw error;
      }
    } finally {
      if (node.finallyBlock) {
        this.visit(node.finallyBlock, env);
      }
    }

    return result;
  }

  visitThrowStatement(node, env) {
    const value = this.visit(node.value, env);
    throw new ThengaError(String(value));
  }

  visitMemberAccess(node, env) {
    const obj = this.visit(node.object, env);
    
    if (obj === null || obj === undefined) {
      throw new ThengaError(`Cannot access property '${node.property}' of ${obj}`);
    }

    return obj[node.property];
  }

  visitIndexAccess(node, env) {
    const obj = this.visit(node.object, env);
    const index = this.visit(node.index, env);

    if (obj === null || obj === undefined) {
      throw new ThengaError(`Cannot access index of ${obj}`);
    }

    return obj[index];
  }

  visitPrintStatement(node, env) {
    const value = this.visit(node.value, env);
    this.outputCallback(this.stringify(value));
    return null;
  }

  visitInputStatement(node, env) {
    const prompt = this.visit(node.prompt, env);
    
    if (this.inputCallback) {
      return this.inputCallback(String(prompt));
    }

    // Synchronous readline for CLI
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(String(prompt) + ' ', (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  visitDeleteStatement(node, env) {
    if (node.target.type === 'Identifier') {
      return env.delete(node.target.name);
    }
    throw new ThengaError('Can only delete variables');
  }

  visitTypeOfExpression(node, env) {
    const value = this.visit(node.value, env);
    return typeof value;
  }

  visitCopyExpression(node, env) {
    const value = this.visit(node.value, env);
    return this.deepCopy(value);
  }

  visitAssertStatement(node, env) {
    const condition = this.visit(node.condition, env);
    
    if (!this.isTruthy(condition)) {
      const message = node.message 
        ? this.visit(node.message, env)
        : 'Assertion failed';
      throw new ThengaError(`Assertion Error: ${message}`);
    }
    
    return null;
  }

  visitDebugStatement(node, env) {
    const value = this.visit(node.value, env);
    const debugInfo = `[DEBUG] ${this.stringify(value)} (Type: ${typeof value})`;
    this.outputCallback(debugInfo);
    return null;
  }

  visitSleepStatement(node, env) {
    const duration = this.visit(node.duration, env);
    
    if (typeof duration !== 'number' || duration < 0) {
      throw new ThengaError('Sleep duration must be a non-negative number');
    }

    // Return a promise for async sleep
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  visitPassStatement(node, env) {
    return null;
  }

  visitWarningStatement(node, env) {
    const message = this.visit(node.message, env);
    this.outputCallback(`[WARNING] ${this.stringify(message)}`);
    return null;
  }

  visitValidateExpression(node, env) {
    const value = this.visit(node.value, env);
    
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).length > 0;
    }
    
    return value !== null && value !== undefined;
  }

  visitTruthyCheckExpression(node, env) {
    const value = this.visit(node.value, env);
    return this.isTruthy(value);
  }

  visitAwaitExpression(node, env) {
    const value = this.visit(node.expression, env);
    
    if (value instanceof Promise) {
      return value;
    }
    
    return Promise.resolve(value);
  }

  // Helper methods
  isTruthy(value) {
    if (value === null || value === undefined || value === false) {
      return false;
    }
    if (typeof value === 'number' && value === 0) {
      return false;
    }
    if (typeof value === 'string' && value === '') {
      return false;
    }
    return true;
  }

  stringify(value) {
    if (value === null) return 'onnum_illa';
    if (value === undefined) return 'onnum_illa';
    if (typeof value === 'boolean') return value ? 'sheriya' : 'sheriyalla';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (Array.isArray(value)) {
      return '[' + value.map(v => this.stringify(v)).join(', ') + ']';
    }
    if (typeof value === 'object') {
      const pairs = Object.entries(value)
        .map(([k, v]) => `${k}: ${this.stringify(v)}`);
      return '{' + pairs.join(', ') + '}';
    }
    if (typeof value === 'function') return '<function>';
    return String(value);
  }

  deepCopy(value) {
    if (value === null || typeof value !== 'object') {
      return value;
    }
    
    if (Array.isArray(value)) {
      return value.map(item => this.deepCopy(item));
    }
    
    const copy = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        copy[key] = this.deepCopy(value[key]);
      }
    }
    return copy;
  }
}

module.exports = { Interpreter, ThengaError };