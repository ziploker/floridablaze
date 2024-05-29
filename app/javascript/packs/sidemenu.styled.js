// Menu.styled.js
import React from "react";
import styled from "styled-components";

const StyledMenu = styled.nav`
  display: grid;
  grid-template-columns: minmax(10px, 1fr) 20fr;
  background: #f4f4f4;

  height: 100vh;

  text-align: left;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding-top: ${({ hamburger_scrolled }) =>
    hamburger_scrolled == "true" ? "70px" : "150px"};

  transition: 0.2s ease-in-out;
  z-index: 50;

  transform: ${(props) =>
    props.open_side_menu == "true" ? "translateX(0%)" : "translateX(100%)"};

  span {
    margin-bottom: 20px;
    display: block;
    font-size: 2rem;
  }

  ul {
    list-style-type: none;
    display: grid;
    height: 100%;
    max-height: 800px;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }

  li {
    text-align: center;
    margin-bottom: 20px;
  }

  a {
    // font-size: 10vw;
    //text-transform: uppercase;
    //padding: 2.5rem 0;
    font-weight: bold;
    letter-spacing: 0.1rem;
    //color: ${({ theme }) => theme.primaryDark};
    color: #465772;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      //// font-size: 1.5rem;
      //text-align: center;
    }

    &:hover {
      //color: ${({ theme }) => theme.primaryHover};
      color: #f7c562;
    }
  }
`;

export default StyledMenu;
