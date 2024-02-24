// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig, merge } = require("shakapacker");

const webpackConfig = generateWebpackConfig();

const isDevelopment = process.env.NODE_ENV !== "production";

const myoptions = {
  mode: isDevelopment ? "development" : "production",
};

//console.log("MERGED)))))))))))))))))))))))))))))))))", merge(myoptions, webpackConfig) )
module.exports = merge(myoptions, webpackConfig);
