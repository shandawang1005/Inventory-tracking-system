module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // ✅ 这里必须用 @tailwindcss/postcss，而不是 tailwindcss
    require('autoprefixer'),
  ],
};
