/**
 * @type {import('prettier').Options}
 */
module.exports = {
  singleQuote: true,
  semi: true,
  importOrder: ['^react$', '^(@?expo|native-base)(.*)$', '^[^\\./]', '^[\\./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
