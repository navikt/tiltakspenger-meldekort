import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import cssModules from 'eslint-plugin-css-modules';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
const tsCommonRules = {
    ...tseslint.configs.recommended.rules,
    'no-undef': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^(_|req|res|next)$' }],
};
export default [
    {
        ignores: ['**/dist/**', '**/_ssr-dist/**', 'deploy/**', '**/*.cjs', '**/*.mjs', '**/*.js', 'tests'],
    },
    // Klient
    {
        files: ['packages/client/src/**/*.{ts,tsx}'],
        languageOptions: { parser: tsParser },
        plugins: {
            react,
            'react-hooks': reactHooks,
            '@typescript-eslint': tseslint,
            'css-modules': cssModules,
            'react-refresh': reactRefresh,
        },
        settings: { react: { version: 'detect' } },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...tsCommonRules,
            ...reactHooks.configs.recommended.rules,
            ...cssModules.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/react-in-jsx-scope': 'off',
            'react-hooks/set-state-in-effect': 'warn',
        },
    },
    // Server — håndhever at importer er deklarert i server/package.json
    {
        files: ['packages/server/src/**/*.{ts,tsx}'],
        languageOptions: { parser: tsParser },
        plugins: { '@typescript-eslint': tseslint, import: importPlugin },
        settings: {
            // Node-resolver kun: TS path aliases (@*) blir uresolvable og
            // dermed ignorert av no-extraneous-dependencies, mens reelle
            // npm-imports fortsatt valideres mot server/package.json.
            'import/resolver': { node: true },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tsCommonRules,
            'no-constant-binary-expression': 'off',
            'import/no-extraneous-dependencies': [
                'error',
                { packageDir: ['packages/server'] },
            ],
        },
    },
    // Common — felles typer/utils
    {
        files: ['packages/common/src/**/*.{ts,js}'],
        languageOptions: { parser: tsParser },
        plugins: { '@typescript-eslint': tseslint },
        rules: tsCommonRules,
    },
];
