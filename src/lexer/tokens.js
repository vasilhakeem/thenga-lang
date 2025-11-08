// Token types for Thenga Lang
const TokenType = {
  // Literals
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  IDENTIFIER: 'IDENTIFIER',
  
  // Keywords - Variables
  ITH_AAN: 'ITH_AAN',                    // variable declaration
  ITH_FIXED_AAN: 'ITH_FIXED_AAN',        // constant declaration
  
  // Keywords - Boolean
  SHERIYA: 'SHERIYA',                    // true
  SHERIYALLA: 'SHERIYALLA',              // false
  ONNUM_ILLA: 'ONNUM_ILLA',              // null
  
  // Keywords - I/O
  PARA: 'PARA',                          // print
  CHODHIK: 'CHODHIK',                    // input
  THERI_VILI: 'THERI_VILI',              // throw error
  LOG_CHEYY: 'LOG_CHEYY',          // console.log detailed
  
  // Keywords - Conditionals
  SERIYANO: 'SERIYANO',                  // if
  ALLELUM: 'ALLELUM',                    // else if
  ALLENGIL: 'ALLENGIL',                  // else
  
  // Keywords - Loops
  REPEAT_ADI: 'REPEAT_ADI',              // for loop
  ODI_REPEAT_MWONE: 'ODI_REPEAT_MWONE',  // while loop
  ODARUTH_MONE: 'ODARUTH_MONE',          // break
  VITT_KALA: 'VITT_KALA',                // continue
  
  // Keywords - Functions
  PANI: 'PANI',                          // function
  THIRICH_THA: 'THIRICH_THA',            // return
  VILI: 'VILI',                          // call
  
  // Keywords - Memory Management
  NEE_PO_MONE_DINESHA: 'NEE_PO_MONE_DINESHA',  // delete
  SHERIKKUM_POKKODA: 'SHERIKKUM_POKKODA',      // force delete
  ITHENTHONN: 'ITHENTHONN',                    // typeof
  COPY_ADI: 'COPY_ADI',                        // deep copy
  
  // Keywords - Data Structures
  ARRAY: 'ARRAY',
  PUSH: 'PUSH',
  POP: 'POP',
  LENGTH: 'LENGTH',
  
  // Keywords - String Operations
  JOIN_PANNUDA: 'JOIN_PANNUDA',
  SPLIT_PANNUDA: 'SPLIT_PANNUDA',
  TRIM_PANNUDA: 'TRIM_PANNUDA',
  KOOTI_VEKKADA: 'KOOTI_VEKKADA',
  
  // Keywords - Math
  KOOTTU: 'KOOTTU',                      // add
  KURAKKU: 'KURAKKU',                    // subtract
  GUNIKKU: 'GUNIKKU',                      // multiply
  HARIKKU: 'HARIKKU',                    // divide
  RANDOM: 'RANDOM',                      // random
  
  // Keywords - Special Functions
  ADIPOLI_AAN: 'ADIPOLI_AAN',
  NER_AANO_MWONE: 'NER_AANO_MWONE',
  ENTHADA_ITH: 'ENTHADA_ITH',
  SCENE_IDD: 'SCENE_IDD',
  CHUMMA_IRI_MONE: 'CHUMMA_IRI_MONE',
  ITH_MANASILAAYO: 'ITH_MANASILAAYO',
  AALU_SHERI_AANO: 'AALU_SHERI_AANO',
  KETT_PARANJU: 'KETT_PARANJU',
  
  // Keywords - Control Flow
  TRY_CHEYTH_NOKK: 'TRY_CHEYTH_NOKK',
  PIDIKK: 'PIDIKK',
  ETTAVUM_AVASANAM: 'ETTAVUM_AVASANAM',
  
  // Keywords - Async
  KATH_MONE: 'KATH_MONE',
  PINNE_PARAYAM: 'PINNE_PARAYAM',
  PAND_MUNNE: 'PAND_MUNNE',
  
  // Operators - Comparison
  SAME_AANO: 'SAME_AANO',                // ==
  BILKUL_SAME: 'BILKUL_SAME',            // ===
  VELLIYA: 'VELLIYA',                    // >
  CHERIYA: 'CHERIYA',                    // <
  VELLIYATHUM_SAME: 'VELLIYATHUM_SAME',  // >=
  CHERIYATHUM_SAME: 'CHERIYATHUM_SAME',  // <=
  VENDATHILLA: 'VENDATHILLA',            // !=
  
  // Operators - Logical
  PINNEM: 'PINNEM',                      // &&
  ALLEL: 'ALLEL',                        // ||
  ONNUM_VENDA: 'ONNUM_VENDA',            // !
  
  // Operators - Arithmetic
  PLUS: 'PLUS',
  MINUS: 'MINUS',
  MULTIPLY: 'MULTIPLY',
  DIVIDE: 'DIVIDE',
  MODULO: 'MODULO',
  
  // Assignment
  EQUALS: 'EQUALS',
  
  // Delimiters
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  LBRACE: 'LBRACE',
  RBRACE: 'RBRACE',
  LBRACKET: 'LBRACKET',
  RBRACKET: 'RBRACKET',
  COMMA: 'COMMA',
  SEMICOLON: 'SEMICOLON',
  DOT: 'DOT',
  COLON: 'COLON',
  
  // Special
  NEWLINE: 'NEWLINE',
  EOF: 'EOF',
  COMMENT: 'COMMENT',
};

// Keywords mapping
const KEYWORDS = {
  // Variables
  'ith_aan': TokenType.ITH_AAN,
  'ith_fixed_aan': TokenType.ITH_FIXED_AAN,
  
  // Boolean
  'sheriya': TokenType.SHERIYA,
  'sheriyalla': TokenType.SHERIYALLA,
  'onnum_illa': TokenType.ONNUM_ILLA,
  
  // I/O
  'para': TokenType.PARA,
  'chodhik': TokenType.CHODHIK,
  'theri_vili': TokenType.THERI_VILI,
  'log_cheyy': TokenType.LOG_CHEYY,
  
  // Conditionals
  'seriyano': TokenType.SERIYANO,
  'allelum': TokenType.ALLELUM,
  'allengil': TokenType.ALLENGIL,
  
  // Loops
  'repeat_adi': TokenType.REPEAT_ADI,
  'odi_repeat_mwone': TokenType.ODI_REPEAT_MWONE,
  'odaruth_mone': TokenType.ODARUTH_MONE,
  'vitt_kala': TokenType.VITT_KALA,
  
  // Functions
  'pani': TokenType.PANI,
  'thirich_tha': TokenType.THIRICH_THA,
  'vili': TokenType.VILI,
  
  // Memory
  'nee_po_mone_dinesha': TokenType.NEE_PO_MONE_DINESHA,
  'sherikkum_pokkoda': TokenType.SHERIKKUM_POKKODA,
  'ithenthonn': TokenType.ITHENTHONN,
  'copy_adi': TokenType.COPY_ADI,
  
  // Data Structures
  'array': TokenType.ARRAY,
  'push': TokenType.PUSH,
  'pop': TokenType.POP,
  'length': TokenType.LENGTH,
  
  // String Operations
  'join_pannuda': TokenType.JOIN_PANNUDA,
  'split_pannuda': TokenType.SPLIT_PANNUDA,
  'trim_pannuda': TokenType.TRIM_PANNUDA,
  'kooti_vekkada': TokenType.KOOTI_VEKKADA,
  
  // Math
  'koottu': TokenType.KOOTTU,
  'kurakku': TokenType.KURAKKU,
  'gunikku': TokenType.GUNIKKU,
  'harikku': TokenType.HARIKKU,
  'random': TokenType.RANDOM,
  
  // Special Functions
  'adipoli_aan': TokenType.ADIPOLI_AAN,
  'ner_aano_mwone': TokenType.NER_AANO_MWONE,
  'enthada_ith': TokenType.ENTHADA_ITH,
  'scene_idd': TokenType.SCENE_IDD,
  'chumma_iri_mone': TokenType.CHUMMA_IRI_MONE,
  'ith_manasilaayo': TokenType.ITH_MANASILAAYO,
  'aalu_sheri_aano': TokenType.AALU_SHERI_AANO,
  'kett_paranju': TokenType.KETT_PARANJU,
  
  // Control Flow
  'try_cheyth_nokk': TokenType.TRY_CHEYTH_NOKK,
  'pidikk': TokenType.PIDIKK,
  'ettavum_avasanam': TokenType.ETTAVUM_AVASANAM,
  
  // Async
  'kath_mone': TokenType.KATH_MONE,
  'pinne_parayam': TokenType.PINNE_PARAYAM,
  'pand_munne': TokenType.PAND_MUNNE,
  
  // Comparison
  'same_aano': TokenType.SAME_AANO,
  'bilkul_same': TokenType.BILKUL_SAME,
  'velliya': TokenType.VELLIYA,
  'cheriya': TokenType.CHERIYA,
  'velliyathum_same': TokenType.VELLIYATHUM_SAME,
  'cheriyathum_same': TokenType.CHERIYATHUM_SAME,
  'vendathilla': TokenType.VENDATHILLA,
  
  // Logical
  'pinnem': TokenType.PINNEM,
  'allel': TokenType.ALLEL,
  'onnum_venda': TokenType.ONNUM_VENDA,
};

class Token {
  constructor(type, value, line, column) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }

  toString() {
    return `Token(${this.type}, ${this.value}, ${this.line}:${this.column})`;
  }
}

module.exports = {
  TokenType,
  KEYWORDS,
  Token
};