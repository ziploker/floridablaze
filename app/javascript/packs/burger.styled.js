// Burger.styled.js
import React from "react";
import styled from "styled-components";

const StyledBurger = styled.button`
  //position: absolute;
  //top: 5%;
  //left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 1.5rem;
  background: transparent;
  //background: pink;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 501px) {
    display: none;
  }

  div {
    width: 1.75rem;
    height: 0.13rem;
    //background: ${({ theme }) => theme.offWhite};
    background: white;
    @media only screen and (max-width: 265px) {
      background: black;
    }
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ openSideMenu }) =>
        openSideMenu ? "rotate(45deg)" : "rotate(0)"};
    }

    :nth-child(2) {
      opacity: ${({ openSideMenu }) => (openSideMenu ? "0" : "1")};
      transform: ${({ openSideMenu }) =>
        openSideMenu ? "translateX(5px)" : "translateX(0)"};
      background: inherit;

      @media only screen and (max-width: 265px) {
        //color: black;
      }

      //color: white;
      font-size: 0.5em;
      height: auto;
    }

    :nth-child(3) {
      transform: ${({ openSideMenu }) =>
        openSideMenu ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;

export default StyledBurger;
