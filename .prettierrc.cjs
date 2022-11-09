/**
 * @type {import('prettier').Options}
 */
module.exports = {
  singleQuote: true,
  semi: true,
  importOrder: ['^react$', '^@expo/(.*)$', '^[^\\./]', '^[\\./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
