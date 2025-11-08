# 🥥 Thenga Lang

**Manglish Programming Language**

Thenga Lang is a fun, lightweight programming language inspired by Malayalam language and Malayalam movie culture. Built with Node.js, it brings the flavor of Kerala to programming!

## 🚀 Features

- **Malayalam Syntax**: Write code in Malayalam-inspired keywords
- **Full-Featured**: Variables, functions, loops, conditionals, error handling
- **Interactive REPL**: Test your code instantly
- **npm Installable**: Easy to install and use
- **Lightweight**: Fast and efficient interpreter

## 📦 Installation

### From Source (Development)

```bash
# Clone the repository
git clone <your-repo-url>
cd thenga-lang

# Install dependencies
npm install

# Link globally for testing
npm link

# Now you can use 'thenga' command anywhere
thenga --version
```

### From npm (After Publishing)

```bash
npm install -g thenga-lang
```

## 🎮 Usage

### Run a file

```bash
thenga run myfile.thenga
```

### Start REPL

```bash
thenga repl
```

### Show examples

```bash
thenga examples
```

### Debug tools

```bash
# Show tokens
thenga tokenize myfile.thenga

# Show AST
thenga parse myfile.thenga
```

## 📚 Syntax Guide

### Variables

```javascript
ith_aan x = 10;              // Variable declaration
ith_fixed_aan PI = 3.14;     // Constant declaration
```

### Data Types

```javascript
sheriya                      // true
sheriyalla                   // false
onnum_illa                   // null
```

### Output/Input

```javascript
para("Hello!");              // Print
chodhik("Your name?");       // Input (returns string)
enthada_ith(x);              // Debug print with type info
kett_paranju("Warning!");    // Warning message
```

### Conditionals

```javascript
seriyano(x velliya 5) {      // if (x > 5)
    para("Big number");
} allelum(x same_aano 5) {   // else if (x == 5)
    para("Equal to 5");
} allengil {                 // else
    para("Small number");
}
```

### Loops

```javascript
// For loop - repeat 5 times
repeat_adi(5) {
    para(i);                 // i is auto-available (0 to 4)
}

// While loop
ith_aan count = 0;
odi_repeat_mwone(count cheriya 5) {
    para(count);
    count = count + 1;
}

odaruth_mone;                // break
vitt_kala;                   // continue
```

### Functions

```javascript
pani greet(name) {           // Function declaration
    thirich_tha("Hello " + name);  // return
}

ith_aan result = greet("Mone");
para(result);
```

### Arrays

```javascript
ith_aan numbers = [1, 2, 3, 4, 5];
para(numbers[0]);            // Access element
para(length(numbers));       // Get length
```

### Objects

```javascript
ith_aan person = {
    name: "Rajesh",
    age: 30
};

para(person.name);           // Access property
person.age = 31;             // Modify property
```

### Math Operations

```javascript
koottu(a, b)                 // Add
kurakku(a, b)                // Subtract
gunikku(a, b)                 // Multiply
harikku(a, b)                // Divide
random()                     // Random number (0-1)

// Regular operators also work
ith_aan sum = 10 + 5;
ith_aan product = 10 * 5;
```

### String Operations

```javascript
join_pannuda(arr, sep)       // Join array to string
split_pannuda(str, sep)          // Split string
trim_pannuda(str)              // Trim whitespace
kooti_vekkada(str1, str2)   // Concatenate strings
```

### Comparison Operators

```javascript
same_aano                    // ==
bilkul_same                  // ===
velliya                      // >
cheriya                      // <
velliyathum_same             // >=
cheriyathum_same             // <=
vendathilla                  // !=
```

### Logical Operators

```javascript
pinnem                       // &&
allel                        // ||
onnum_venda                  // !
```

### Error Handling

```javascript
try_cheyth_nokk {
    theri_vili("Error message");  // throw
} pidikk(error) {
    para("Caught: " + error);
} ettavum_avasanam {
    para("Finally block");
}
```

### Special Functions

```javascript
nee_po_mone_dinesha(x);      // Delete variable (CID Moosa ref)
adipoli_aan(condition);      // Assert - throws if false
ner_aano_mwone(x);           // Check if truthy
ithenthonn(x);               // typeof
copy_adi(x);                 // Deep copy
aalu_sheri_aano(obj);        // Validate object (not null/empty)
scene_idd(1000);             // Sleep/wait (milliseconds)
chumma_iri_mone;             // Pass/no-op statement
```

### Comments

```javascript
// ingane aan This is a single-line comment

/* pand_oru_katha_undayirunu...
   This is a multi-line comment
   (Once upon a time there was a story...)
*/
```

## 📖 Example Programs

### Hello World

```javascript
para("Enthaada mone!");
```

### Fibonacci Sequence

```javascript
pani fibonacci(n) {
    seriyano(n cheriyathum_same 1) {
        thirich_tha(0);
    }
    seriyano(n same_aano 2) {
        thirich_tha(1);
    }
    thirich_tha(fibonacci(n - 1) + fibonacci(n - 2));
}

repeat_adi(10) {
    para("F(" + i + ") = " + fibonacci(i + 1));
}
```

### Prime Number Checker

```javascript
pani is_prime(n) {
    seriyano(n cheriyathum_same 2) {
        thirich_tha(sheriyalla);
    }
    
    ith_aan i = 2;
    odi_repeat_mwone(i cheriya n) {
        seriyano((n % i) same_aano 0) {
            thirich_tha(sheriyalla);
        }
        i = i + 1;
    }
    
    thirich_tha(sheriya);
}

para(is_prime(17));  // sheriya
```

## 🎯 REPL Commands

When using `thenga repl`:

- `help` - Show help message
- `clear` - Clear screen
- `exit` or `quit` - Exit REPL
- Type any Thenga code and press Enter to execute

## 🏗️ Architecture

```
thenga-lang/
├── src/
│   ├── lexer/
│   │   ├── tokens.js      # Token definitions
│   │   └── lexer.js       # Lexical analyzer
│   ├── parser/
│   │   ├── ast.js         # AST node definitions
│   │   └── parser.js      # Parser
│   ├── interpreter/
│   │   └── interpreter.js # Interpreter/Executor
│   └── index.js           # Main API
├── bin/
│   └── thenga.js          # CLI tool
├── examples/              # Example programs
└── tests/                 # Test files
```

## 🧪 Testing

Create a test file `test.thenga`:

```javascript
para("Testing Thenga Lang!");

ith_aan x = 42;
adipoli_aan(x velliya 0);
para("Test passed!");
```

Run it:

```bash
thenga run test.thenga
```


**Made with ❤️ and 🥥 by Malayalam developers, for Malayalam developers!**

*Enth parayanam... Start coding in Malayalam, mone!* 🚀
