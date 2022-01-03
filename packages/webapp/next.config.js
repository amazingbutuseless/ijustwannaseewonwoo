const withTM = require('next-transpile-modules')(['shared']);

module.exports = {
  ...withTM(),
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
};
