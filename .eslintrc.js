module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:json/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    "no-tabs": 0,
    "max-len": [0, 120, 4, {"ignoreUrls": true}], // 1 warn, 2 error
    "func-names": "off",
    "global-require": "off",
    "new-cap": [
      "error",
      {
        "newIsCap": false,
        "capIsNew": false,
        "capIsNewExceptions": [
          "When",
          "Then",
          "Given",
          "After",
          "Before"
        ]
      }
    ],
    "no-loop-func": "off",
    "no-plusplus": "off",
    "no-restricted-properties": "off",
    "no-return-assign": "off",
    "no-underscore-dangle": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ],
    "no-param-reassign": "off",
    "camelcase": [
      "error",
      {
        "properties": "never"
      }
    ]
  },
  "settings": {
    "mocha/additionalTestFunctions": [
      "describeModule"
    ]
  }
};
