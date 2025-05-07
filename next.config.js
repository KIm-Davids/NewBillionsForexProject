/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;


// next.config.js
// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: '/:path*',
//         destination: '/404',
//         permanent: false, // This makes the redirect temporary
//       },
//     ];
//   },
// };
