// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("alien_data_dump");
  const data = JSON.parse(node.getAttribute("data"));

  ReactDOM.render(
    <React.StrictMode>
      <App d={data} />
    </React.StrictMode>,
    document.body.appendChild(document.createElement("div"))
  );

  // ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  //   <App d={data}/>,
  //   document.body.appendChild(document.createElement('div')),
  // );
});
