module.exports = {
  // Configuração do parser para o ESLint usar o TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Caminho para o arquivo tsconfig.json
    project: 'tsconfig.json',
    // Diretório raiz do projeto TypeScript
    tsconfigRootDir: __dirname,
    // Tipo de módulo (por exemplo, 'module' ou 'commonjs')
    sourceType: 'module',
  },
  // Lista de plugins usados (neste caso, apenas o do TypeScript)
  plugins: ['@typescript-eslint/eslint-plugin'],
  // Extensões de regras predefinidas para TypeScript e Prettier
  extends: [
    'plugin:@typescript-eslint/recommended', // Configurações recomendadas para TypeScript
    'plugin:prettier/recommended', // Configuração para integração com o Prettier
  ],
  // Configuração global para o ESLint (por exemplo, ambiente Node.js e Jest)
  root: true,
  env: {
    node: true, // Habilita variáveis globais do Node.js
    jest: true, // Habilita variáveis globais do Jest para testes
  },
  // Padrões de arquivos que devem ser ignorados pelo ESLint
  ignorePatterns: ['.eslintrc.js'],
  
  // Configuração de regras personalizadas
  rules: {
    // Exemplos de regras personalizadas:
    '@typescript-eslint/interface-name-prefix': 'off', // Desativa a regra que exige prefixo "I" para nomes de interfaces
    '@typescript-eslint/explicit-function-return-type': 'off', // Desativa a regra que exige declarações explícitas de tipos de retorno para funções públicas
    '@typescript-eslint/module-boundary-types': 'off', // Desativa a regra que exige declarações explícitas de tipos de retorno para funções públicas
    '@typescript-eslint/no-explicit-any': 'error', // Define como erro o uso explícito do tipo "any"
    '@typescript-eslint/no-inferrable-types': 'error', // Define como erro a inferência de tipos como "any" quando não são explicitamente definidos
  },
};