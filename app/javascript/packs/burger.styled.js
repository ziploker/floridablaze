// Burger.styled.js
import React from "react";
import styled from "styled-components";

const StyledBurger = styled.button`
  display: grid;
  flex-direction: column;
  justify-content: space-around;
  height: 1.5rem;
  background: transparent;
  border: none;
  padding: 0;
  z-index: 10;
  cursor: pointer;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 601px) {
    display: none;
  }
  @media only screen and (max-width: 520px) {
    //height: 3rem;
  }

  div {
    width: 50px;

    height: 3px;

    background: ${(props) =>
      props.scroll_dir == "scrolling down"
        ? props.leaf_scrolled_so_change_color_down == "true"
          ? "black"
          : "white"
        : props.leaf_scrolled_so_change_color_up == "true"
        ? "white"
        : "black"};

    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 14px 0;

    @media only screen and (max-width: 520px) {
      background: black;
    }

    :first-child {
      transform: ${({ open_side_menu }) =>
        open_side_menu == "true" ? "rotate(45deg)" : "rotate(0)"};
    }

    :nth-child(2) {
      opacity: ${({ open_side_menu }) =>
        open_side_menu == "true" ? "0" : "1"};
      transform: ${({ open_side_menu }) =>
        open_side_menu == "true" ? "translateX(5px)" : "translateX(0)"};

      /* background: ${(props) =>
        props.scroll_dir == "scrolling down"
          ? props.leaf_scrolled_so_change_color_down == "true"
            ? "black"
            : "white"
          : props.leafScrolledSoChangeColorUp == "true"
          ? "white"
          : "black"};
       */

      @media only screen and (max-width: 520px) {
        color: black;
      }

      // font-size: 0.7rem;

      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
    }

    :nth-child(3) {
      transform: ${({ open_side_menu }) =>
        open_side_menu == "true" ? "rotate(-45deg)" : "rotate(0)"};

      /* background: ${(props) =>
        props.scroll_dir == "scrolling down"
          ? props.leaf_scrolled_so_change_color_down == " true"
            ? "black"
            : "white"
          : props.leaf_scrolled_so_change_color_up == "true"
          ? "white"
          : "black"}; */

      @media only screen and (max-width: 520px) {
        background: black;
      }
    }
  }
`;

export default StyledBurger;
