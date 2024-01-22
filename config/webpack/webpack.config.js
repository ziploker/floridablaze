// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig } = require("shakapacker");

const webpackConfig = generateWebpackConfig();

console.log("weeeeeeeeb", webpackConfig)

module.exports = webpackConfig;
