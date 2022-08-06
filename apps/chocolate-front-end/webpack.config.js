/** @file Left for historical reasons if we need to use polkadot api with jest or any such unit testing lib */
const getNrwlWebpackConfig = require('@nrwl/react/plugins/webpack');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { merge } = require('webpack-merge');

// Re: https://github.com/nrwl/nx/issues/3175
/**
 * @typedef {import('webpack').Configuration}  Configuration
 * @param {Configuration} config
 * @returns Configuration
 */
function getWebpackConfig(config) {
  getNrwlWebpackConfig(config);
  /**
   * @type Configuration
   */
  const newConfig = {
    // resolve: {
    //   fallback: {
    //     stream: require.resolve('stream-browserify'),
    //   },
    // },
    // plugins: [new NodePolyfillPlugin()],
  };

  return merge(config, newConfig);
}

module.exports = getWebpackConfig;
