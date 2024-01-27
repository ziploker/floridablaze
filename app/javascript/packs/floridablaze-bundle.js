import ReactOnRails from "react-on-rails";

import App from "./app";
import Admin from "./admin";
import AdminLogin from "./admin_login";


// This is how react_on_rails can see the component in the browser.
ReactOnRails.register({ App, Admin, AdminLogin });
