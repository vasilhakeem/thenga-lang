#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');
const ThengaLang = require('../src/index');
const { version } = require('../package.json');

const thenga = new ThengaLang();

// ASCII Art Logo
const logo = `
${chalk.yellow('╔════════════════════════════════════╗')}
${chalk.yellow('║')}   ${chalk.bold.green('🥥  THENGA LANG  🥥')}          ${chalk.yellow('║')}
${chalk.yellow('║')}   ${chalk.cyan('Malayalam Programming Language')}  ${chalk.yellow('║')}
${chalk.yellow('╚════════════════════════════════════╝')}
`;

program
  .name('thenga')
  .description('Thenga Lang - Malayalam Programming Language')
  .version(version);

// Run a file
program
  .command('run <file>')
  .description('Run a Thenga Lang file')
  .action((file) => {
    try {
      const filepath = path.resolve(file);
      
      if (!fs.existsSync(filepath)) {
        console.error(chalk.red(`Error: File not found: ${file}`));
        process.exit(1);
      }

      console.log(chalk.cyan(`Running: ${file}\n`));
      thenga.runFile(filepath);
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// REPL Mode
program
  .command('repl')
  .description('Start Thenga Lang REPL')
  .action(() => {
    console.log(logo);
    console.log(chalk.green('Welcome to Thenga Lang REPL!'));
    console.log(chalk.gray('Type your code and press Enter. Type "exit" to quit.\n'));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.yellow('thenga> ')
    });

    let multilineBuffer = '';
    let braceCount = 0;

    rl.prompt();

    rl.on('line', (line) => {
      const trimmed = line.trim();

      // Exit command
      if (trimmed === 'exit' || trimmed === 'quit') {
        console.log(chalk.cyan('\nPoda mone! Bye! 👋'));
        process.exit(0);
      }

      // Clear command
      if (trimmed === 'clear') {
        console.clear();
        console.log(logo);
        rl.prompt();
        return;
      }

      // Help command
      if (trimmed === 'help') {
        showHelp();
        rl.prompt();
        return;
      }

      // Track braces for multiline input
      for (const char of line) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
      }

      multilineBuffer += line + '\n';

      // If braces are balanced and we have content, execute
      if (braceCount === 0 && multilineBuffer.trim()) {
        try {
          const result = thenga.run(multilineBuffer);
          if (result !== null && result !== undefined) {
            console.log(chalk.green('→'), result);
          }
        } catch (error) {
          console.error(chalk.red('Error:'), error.message);
        }
        multilineBuffer = '';
      }

      // Show continuation prompt if in multiline mode
      if (braceCount > 0) {
        rl.setPrompt(chalk.yellow('...   > '));
      } else {
        rl.setPrompt(chalk.yellow('thenga> '));
      }

      rl.prompt();
    });

    rl.on('close', () => {
      console.log(chalk.cyan('\nPoda mone! Bye! 👋'));
      process.exit(0);
    });
  });

// Tokenize command (for debugging)
program
  .command('tokenize <file>')
  .description('Show tokens for a Thenga Lang file')
  .action((file) => {
    try {
      const filepath = path.resolve(file);
      const code = fs.readFileSync(filepath, 'utf-8');
      const tokens = thenga.tokenize(code);

      console.log(chalk.cyan('Tokens:\n'));
      tokens.forEach((token, index) => {
        console.log(`${chalk.gray(index.toString().padStart(3))}: ${chalk.yellow(token.type.padEnd(20))} ${chalk.white(JSON.stringify(token.value))}`);
      });
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Parse command (for debugging)
program
  .command('parse <file>')
  .description('Show AST for a Thenga Lang file')
  .action((file) => {
    try {
      const filepath = path.resolve(file);
      const code = fs.readFileSync(filepath, 'utf-8');
      const ast = thenga.parse(code);

      console.log(chalk.cyan('Abstract Syntax Tree:\n'));
      console.log(JSON.stringify(ast, null, 2));
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Examples command
program
  .command('examples')
  .description('Show Thenga Lang examples')
  .action(() => {
    console.log(logo);
    console.log(chalk.bold.cyan('📚 Thenga Lang Examples:\n'));

    console.log(chalk.yellow('1. Hello World:'));
    console.log(chalk.gray('   para("Enthaada mone!");\n'));

    console.log(chalk.yellow('2. Variables:'));
    console.log(chalk.gray('   ith_aan x = 10;'));
    console.log(chalk.gray('   ith_fixed_aan name = "Machan";'));
    console.log(chalk.gray('   para(name);\n'));

    console.log(chalk.yellow('3. Conditionals:'));
    console.log(chalk.gray('   ith_aan age = 25;'));
    console.log(chalk.gray('   seriyano(age velliya 18) {'));
    console.log(chalk.gray('       para("You can vote mone!");'));
    console.log(chalk.gray('   } allengil {'));
    console.log(chalk.gray('       para("Too young machan");'));
    console.log(chalk.gray('   }\n'));

    console.log(chalk.yellow('4. Loops:'));
    console.log(chalk.gray('   repeat_adi(5) {'));
    console.log(chalk.gray('       para("Iteration " + i);'));
    console.log(chalk.gray('   }\n'));

    console.log(chalk.yellow('5. Functions:'));
    console.log(chalk.gray('   pani greet(name) {'));
    console.log(chalk.gray('       thirich_tha("Hello " + name);'));
    console.log(chalk.gray('   }'));
    console.log(chalk.gray('   para(greet("Mone"));\n'));

    console.log(chalk.yellow('6. Arrays:'));
    console.log(chalk.gray('   ith_aan numbers = [1, 2, 3, 4, 5];'));
    console.log(chalk.gray('   para(numbers[0]);\n'));

    console.log(chalk.cyan('Type "thenga repl" to try them out!\n'));
  });

function showHelp() {
  console.log(chalk.bold.cyan('\n📖 Thenga Lang REPL Commands:\n'));
  console.log(chalk.yellow('  help     ') + chalk.gray('- Show this help message'));
  console.log(chalk.yellow('  clear    ') + chalk.gray('- Clear the screen'));
  console.log(chalk.yellow('  exit/quit') + chalk.gray('- Exit REPL'));
  console.log(chalk.yellow('  examples ') + chalk.gray('- Show code examples'));
  console.log();
}

// If no command provided, show help
if (process.argv.length === 2) {
  console.log(logo);
  program.help();
}

program.parse(process.argv);
