import React, { useEffect, useState, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import NewForm from "../packs/form.jsx";

function Admin(props) {
  //const loggedInStatus = { props };

  console.log("in admin.jsx", props);

  return (
    <div style={{ marginTop: "50px" }}>
      <NewForm />
    </div>
  );
}

export default (props) => <Admin {...props} />;
