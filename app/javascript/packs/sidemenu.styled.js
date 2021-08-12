// Menu.styled.js
import React from "react";
import styled from "styled-components";

const StyledMenu = styled.nav`
  //display: ${({ openSideMenu }) => (openSideMenu ? "flex" : "none")};
  //display: ${(props) => (props.openSideMenu ? "flex" : "none")};
  display: flex;
  //grid-area: 1/1/-1/-1;
  flex-direction: column;
  justify-content: flex-start;
  //background: ${({ theme }) => theme.primaryLight};
  background: #f4f4f4;
  //opacity: 1;
  height: 100vh;
  text-align: left;
  //padding: ${({ openSideMenu }) => (openSideMenu ? "2rem" : "0")};
  position: absolute;
  //top: 85px;
  width: 100%;
  //right: 0;
  left: 0;

  //height: ${({ openSideMenu }) => (openSideMenu ? "auto" : "0px")};
  transition: .2s ease-in-out;
  z-index: 3;
  

  transform: ${props => props.openSideMenu ? "translateX(0%)" : "translateX(100%)"};
  
  
  //transform: ${props => props.openSideMenu ? "scale(1,1)" : "scale(0,1)"};

  

  ul {
    list-style-type: none;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    //width: 100%;
  }

  li {
    text-align: center;
    margin-bottom: 20px;
  }

  a {
    font-size: 2rem;
    //text-transform: uppercase;
    //padding: 2.5rem 0;
    font-weight: bold;
    letter-spacing: 0.1rem;
    //color: ${({ theme }) => theme.primaryDark};
    color: #465772;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      //font-size: 1.5rem;
      //text-align: center;
    }

    &:hover {
      //color: ${({ theme }) => theme.primaryHover};
      color: #f7c562;
    }
  }
`;

export default StyledMenu;
