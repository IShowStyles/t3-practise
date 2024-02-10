/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tabWidth: 2,
  printWidth: 105,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  semi: true,
  bracketSpacing: true,
};

export default config;
