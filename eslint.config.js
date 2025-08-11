import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import cssModules from 'eslint-plugin-css-modules';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const parserOptions = {
    ecmaVersion: 'latest',
    sourceType: 'module',
};

export default [
    {
        ignores: ['dist', '*.cjs', '*.mjs', '*.js', 'tests'],
    },

    // Klient
    {
        files: ['src/**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions,
            globals: {
                ...globals.browser,
                ...globals.es2020,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            '@typescript-eslint': tseslint,
            'css-modules': cssModules,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...cssModules.configs.recommended.rules,
            'no-undef': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^(_|req|res|next)$' },
            ],
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },

    // Server
    {
        files: ['server/**/*.{ts,tsx,js,jsx}', 'vite.config.{ts,js}', 'playwright.config.{ts,js}'],
        languageOptions: {
            parser: tsParser,
            parserOptions,
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2020,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            'no-undef': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^(_|req|res|next)$' },
            ],
            'no-constant-binary-expression': 'off',
        },
    },

    // Felles
    {
        files: ['commonSrc/**/*.{ts,js}'],
        languageOptions: {
            parser: tsParser,
            parserOptions,
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2020,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'no-undef': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^(_|req|res|next)$' },
            ],
        },
    },
];
