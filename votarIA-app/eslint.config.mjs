import jsdoc from 'eslint-plugin-jsdoc';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // 1. Global Ignores (Replaces .eslintignore)
  {
    ignores: [
      "**/node_modules/",
      "**/dist/",
      "**/.angular/",
      "**/.vscode/",
      "**/.env",
      "**/temp/"
    ]
  },
  
  // 2. TypeScript & JSDoc Configuration
  {
    files: ["**/*.ts"],
    plugins: {
      jsdoc: jsdoc,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      // Clean TSDoc rules
      "jsdoc/require-returns-type": 0,
      "jsdoc/require-param-type": 0,
      "jsdoc/no-types": 1,
      "jsdoc/check-tag-names": ["warn", { "definedTags": ["required", "default"] }],
      "jsdoc/require-jsdoc": [
        "warn",
        {
          "publicOnly": true,
          "contexts": ["MethodDefinition", "FunctionDeclaration"]
        }
      ]
    }
  }
];