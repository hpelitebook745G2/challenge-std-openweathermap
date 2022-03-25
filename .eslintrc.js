module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'func-names': 0,
    'react/function-component-definition': 0,
    'class-methods-use-this': 0,
    'global-require': 0,
    'react/no-unstable-nested-components': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 0,
  },
};
