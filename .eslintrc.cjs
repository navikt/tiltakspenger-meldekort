module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:css-modules/recommended',
    ],
    ignorePatterns: ['dist', '*.cjs', '*.mjs', '*.js', 'tests'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-refresh', 'css-modules'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_$',
            },
        ],
        '@typescript-eslint/no-explicit-any': ['off'],
        'react/react-in-jsx-scope': ['off'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
