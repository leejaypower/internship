module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 'off', // export/import를 좀 더 작은 단위로 할 수 있도록 추가
    'no-useless-escape': 'off', // 정규 표현식 때문에 추가
    semi: [2, 'never'],
  },
}
