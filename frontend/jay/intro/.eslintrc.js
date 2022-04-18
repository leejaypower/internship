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
    indent: [ 'error', 2 ],
    semi: [ 'error', 'never' ],
    'array-bracket-spacing': [ 'error', 'always' ],
  },
}
