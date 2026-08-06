// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
      '@angular-eslint/component-class-suffix': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/use-lifecycle-interface': 'off',
      '@angular-eslint/no-output-on-prefix': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/ban-tslint-comment': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
    ],
    rules: {
      '@angular-eslint/template/eqeqeq': 'off',
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  },
]);


