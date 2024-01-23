// Burger.js
import React from "react";

import StyledBurger from "./burger.styled";

const Burger = (props) => {
  return (
    <StyledBurger
    open_side_menu={props.open_side_menu}
      hamburger_scrolled={props.hamburger_scrolled}
      leaf_scrolled_so_change_color_down={props.leaf_scrolled_so_change_color_down}
      leaf_scrolled_so_change_color_up={props.leaf_scrolled_so_change_color_up}
            scroll_dir={props.scroll_dir}
      onClick={() => {
        props.set_open_side_menu(props.open_side_menu == "true" ? "false" : "true");
      }}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
