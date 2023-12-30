// Burger.js
import React from "react";

import StyledBurger from "./burger.styled";

const Burger = (props) => {
  return (
    <StyledBurger
      openSideMenu={props.openSideMenu}
      hamburgerScrolled={props.hamburgerScrolled}
      leafScrolledSoChangeColorDown={props.leafScrolledSoChangeColorDown}
      leafScrolledSoChangeColorUp={props.leafScrolledSoChangeColorUp}
            scrollDir={props.scrollDir}
      onClick={() => {
        props.setOpenSideMenu(!props.openSideMenu);
      }}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
