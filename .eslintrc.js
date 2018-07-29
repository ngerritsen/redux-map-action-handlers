'use strict';

module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'script'
  },
  env: {
    browser: false,
    node: true,
    es6: true,
    jest: true,
    jasmine: true
  }
};
