// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
import { webpackConfig as baseClientWebpackConfig, merge } from "shakapacker";

const commonOptions = {
  resolve: {
    // extensions: [".css", ".ts", ".tsx"],
    extensions: [".css"],
  },
  //mode: "development",
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () =>
  merge({}, baseClientWebpackConfig, commonOptions);

console.log(
  "{{{{{{{{{{{{{{commonWebpackConfig}}}}}}}}}}}}}}}}}",
  commonWebpackConfig
);

export default commonWebpackConfig;
