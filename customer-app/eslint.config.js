// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const pluginQuery = require('@tanstack/eslint-plugin-query');

module.exports = defineConfig([
  globalIgnores(['dist/*']),
  expoConfig,
  eslintPluginPrettierRecommended,
  ...pluginQuery.configs['flat/recommended'],
  {
    ignores: ['dist/*'],
    files: ['babel.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
