module.exports = {
    // Specify the environments where your code will run
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    // Specify the parser options (if using TypeScript)
    parserOptions: {
      ecmaVersion: 2018, // or newer
      sourceType: 'module', // 'script' or 'module'
    },
    // Extend configurations from popular style guides or plugins
    extends: [
      'eslint:recommended', // ESLint's recommended rules
      'plugin:@typescript-eslint/recommended', // Recommended rules for TypeScript
      'plugin:react/recommended', // Recommended rules for React
      // Add more configurations as needed
    ],
    // Specify plugins for additional rules
    plugins: ['@typescript-eslint', 'react'],
    // Define your custom rules or override existing ones
    rules: {
      // Example custom rule: enforce semicolons at the end of statements
      'semi': ['error', 'always'],
      // Add more rules as needed
    },
    // Specify settings for specific plugins or environments
    settings: {
      react: {
        version: 'detect', // Automatically detect the version of React
      },
    },
  };
  