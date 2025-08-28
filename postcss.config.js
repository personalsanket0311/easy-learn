// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {}, // ✅ use this instead of 'tailwindcss'
    autoprefixer: {},
  },
};
