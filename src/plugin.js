export const syncWebpackPlugin = (dist = '.') => {
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  let path = __dirname + '/fetchWorker.js';
  return new CopyWebpackPlugin([
    {
      from: path,
      to: dist,
    },
  ]);
};
