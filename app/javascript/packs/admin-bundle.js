import ReactOnRails from "react-on-rails";

import Admin from "./admin";
import AdminLogin from "./admin_login";

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Admin,
  AdminLogin,
});
