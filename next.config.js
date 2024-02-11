/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  swcMinify: false,
  runtime: 'edge',
  unstable_allowDynamic: [
    './node_modules/bcrypt',
    './node_modules/@babel/runtime/regenerator/index.js',
    './node_modules/next-auth/**',
  ],
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, 'bcrypt'];
    // if (!isServer) {
    //   config.resolve.alias['@babel/runtime/regenerator'] = regeneratorRuntime;
    // }
    return config;
  },
};
export default config;
