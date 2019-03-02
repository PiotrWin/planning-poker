module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: ['node_modules', 'src'],
            extensions: ['.js', '.json', '.jsx'],
          },
        },
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      2, { extensions: ['.js'] },
    ],
    'function-paren-newline': 0,
    'jsx-a11y/anchor-is-valid': [ 'error', {
      'components': [ 'Link' ],
      'specialLink': [ 'to', 'hrefLeft', 'hrefRight' ],
      'aspects': [ 'noHref', 'invalidHref', 'preferButton' ]
    }],
    'jsx-a11y/label-has-for': [ 2, {
      'components': [],
      'required': {
          'every': ['id']
      },
      'allowChildren': false
    }]
  },
};
