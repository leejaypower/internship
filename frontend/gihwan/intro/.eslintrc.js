module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    semi: [ 'error', 'never' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'no-console': process.env.NODE_ENV === 'development' ? 0 : 1,
    'no-debugger': process.env.NODE_ENV === 'development' ? 0 : 1,
  },
}
