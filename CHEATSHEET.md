# 🥥 Thenga Lang Cheat Sheet

## Installation Commands

```bash
# Setup
npm install
chmod +x bin/thenga.js
npm link

# Quick start
./quick-start.sh
```

## CLI Commands

```bash
thenga --version              # Show version
thenga --help                 # Show help
thenga run <file>             # Run a file
thenga repl                   # Start REPL
thenga examples               # Show examples
thenga tokenize <file>        # Debug: show tokens
thenga parse <file>           # Debug: show AST
```

## Syntax Quick Reference

### Variables & Constants
```javascript
ith_aan x = 10;               // Variable
ith_fixed_aan PI = 3.14;      // Constant
```

### Data Types
```javascript
42                            // Number
3.14                          // Float
"text"                        // String
sheriya                       // true
sheriyalla                    // false
onnum_illa                    // null
[1, 2, 3]                     // Array
{key: "value"}                // Object
```

### Operators

#### Arithmetic
```javascript
+  -  *  /  %                 // Basic math
```

#### Comparison
```javascript
velliya                       // >
cheriya                       // <
velliyathum_same              // >=
cheriyathum_same              // <=
same_aano                     // ==
bilkul_same                   // ===
vendathilla                   // !=
```

#### Logical
```javascript
pinnem                        // &&
allel                         // ||
onnum_venda                   // !
```

### Input/Output
```javascript
para(x);                      // Print
chodhik("Prompt?");           // Input
log_cheyy(x);              // Detailed log
enthada_ith(x);               // Debug print
kett_paranju("Warning!");     // Warning
```

### Conditionals
```javascript
seriyano(condition) {         // if
    // code
} allelum(condition2) {       // else if
    // code
} allengil {                  // else
    // code
}
```

### Loops
```javascript
repeat_adi(5) {               // For loop (i = 0 to 4)
    para(i);
}

odi_repeat_mwone(condition) { // While loop
    // code
}

odaruth_mone;                 // break
vitt_kala;                    // continue
```

### Functions
```javascript
pani name(param1, param2) {   // Function declaration
    thirich_tha(value);       // Return
}

vili(function_name);          // Call function
```

### Arrays
```javascript
ith_aan arr = [1, 2, 3];
arr[0]                        // Access element
length(arr)                   // Get length
push(arr, 4)                  // Add element
pop(arr)                      // Remove last
```

### Objects
```javascript
ith_aan obj = {key: "value"};
obj.key                       // Access property
obj.key = "new"               // Modify property
```

### String Operations
```javascript
join_pannuda(arr, ",")        // Join array
split_pannuda(str, ",")           // Split string
trim_pannuda(str)               // Trim
kooti_vekkada(s1, s2)        // Concatenate
```

### Math Functions
```javascript
koottu(a, b)                  // Add
kurakku(a, b)                 // Subtract
gunikku(a, b)                  // Multiply
harikku(a, b)                 // Divide
random()                      // Random 0-1
```

### Error Handling
```javascript
try_cheyth_nokk {
    theri_vili("Error!");     // Throw
} pidikk(error) {             // Catch
    para(error);
} ettavum_avasanam {          // Finally
    // cleanup
}
```

### Special Functions (Movie References!)
```javascript
nee_po_mone_dinesha(x);       // Delete (CID Moosa)
sherikkum_pokkoda(x);         // Force delete
ithenthonn(x);                // typeof
copy_adi(x);                  // Deep copy
adipoli_aan(cond);            // Assert
ner_aano_mwone(x);            // Check truthy
aalu_sheri_aano(obj);         // Validate object
scene_idd(1000);              // Sleep (ms)
chumma_iri_mone;              // Pass/no-op
```

### Comments
```javascript
// ingane aan Single line

/* pand_oru_katha_undayirunu...
   Multi-line comment
*/
```

## Common Patterns

### Hello World
```javascript
para("Enthaada mone!");
```

### Variable Swap
```javascript
ith_aan temp = a;
a = b;
b = temp;
```

### Sum Array
```javascript
pani sum_array(arr) {
    ith_aan total = 0;
    repeat_adi(length(arr)) {
        total = total + arr[i];
    }
    thirich_tha(total);
}
```

### Find Max
```javascript
pani find_max(arr) {
    ith_aan max = arr[0];
    repeat_adi(length(arr)) {
        seriyano(arr[i] velliya max) {
            max = arr[i];
        }
    }
    thirich_tha(max);
}
```

### Is Even
```javascript
pani is_even(n) {
    thirich_tha((n % 2) same_aano 0);
}
```

### Factorial
```javascript
pani factorial(n) {
    seriyano(n cheriyathum_same 1) {
        thirich_tha(1);
    }
    thirich_tha(n * factorial(n - 1));
}
```

### Fibonacci
```javascript
pani fib(n) {
    seriyano(n cheriyathum_same 1) {
        thirich_tha(0);
    }
    seriyano(n same_aano 2) {
        thirich_tha(1);
    }
    thirich_tha(fib(n - 1) + fib(n - 2));
}
```

### Count Occurrences
```javascript
pani count(arr, value) {
    ith_aan count = 0;
    repeat_adi(length(arr)) {
        seriyano(arr[i] same_aano value) {
            count = count + 1;
        }
    }
    thirich_tha(count);
}
```

### Reverse String
```javascript
pani reverse(str) {
    ith_aan arr = split_pannuda(str, "");
    ith_aan reversed = [];
    ith_aan i = length(arr) - 1;
    odi_repeat_mwone(i velliyathum_same 0) {
        push(reversed, arr[i]);
        i = i - 1;
    }
    thirich_tha(join_pannuda(reversed, ""));
}
```

## REPL Commands

```
help                          # Show help
clear                         # Clear screen
exit / quit                   # Exit REPL
```

## File Extensions

```
.thenga                       # Thenga Lang source files
```

## Error Messages

| Error | Meaning |
|-------|---------|
| `Undefined variable: 'x'` | Variable not declared |
| `Cannot reassign constant` | Trying to change constant |
| `Division by zero` | Dividing by 0 |
| `Assertion Error` | Assert failed |
| `Function 'x' expects Y arguments` | Wrong argument count |
| `'x' is not a function` | Calling non-function |

## Best Practices

1. **Use meaningful names**: `ith_aan count` not `ith_aan c`
2. **Add comments**: Use `// ingane aan` for clarity
3. **Handle errors**: Wrap risky code in `try_cheyth_nokk`
4. **Avoid deep recursion**: Use iteration when possible
5. **Test incrementally**: Use REPL for quick tests
6. **Use constants**: `ith_fixed_aan` for unchanging values

## Quick Tips

- **Auto-variable `i`**: Available in `repeat_adi` loops
- **Truthy values**: Numbers (except 0), non-empty strings, objects
- **Falsy values**: `0`, `""`, `sheriyalla`, `onnum_illa`
- **Array indices**: Start at 0
- **Function scope**: Variables declared in functions are local

## Common Mistakes

❌ **Wrong:**
```javascript
ith_fixed_aan x = 10;
x = 20;  // Error: can't reassign constant
```

✅ **Correct:**
```javascript
ith_aan x = 10;
x = 20;  // OK
```

❌ **Wrong:**
```javascript
para(undefined_var);  // Error: undefined
```

✅ **Correct:**
```javascript
ith_aan var = "value";
para(var);
```

❌ **Wrong:**
```javascript
seriyano x velliya 5 {  // Missing parentheses
```

✅ **Correct:**
```javascript
seriyano(x velliya 5) {
```

## Resources

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Setup instructions
- **examples/** - Example programs
- **GitHub** - Report issues and contribute

---

**Keep this cheat sheet handy while coding!** 🥥

*Last updated: 2025*
