import React from 'react';
import styled, { keyframes } from "styled-components";


const buttonWidth = "157.8px";

const blue =  "#0076d3";
const orange = "#ffc439";
const textLight= "#fefefe";


const SendButtonV2LoadingAnimationSpin = keyframes`

  to {
    transform: rotate(359deg);
    
  }



`;

const SendButtonV2LoadingAnimationGrow = keyframes`

  to {
    width: 14px;
    height: 14px;
    margin-top: -8px;
    right: 13px;
    
  }



`;

const StyledLoadingButton = styled.button`



  @media only screen and (max-width: 400px){

    width: 100%;
    min-width: inherit;


  }
  display: inline-block;
  min-width: $button-width;
  height: 35px;
  line-height: 0;
  color: black;
  margin: 0 5px 0px 0px;
  background: $btn-bg;
  //color: $text-light;
  font-size: 1.1em;
  padding: 1em;
  border-radius: 4px;
  text-align: center;
  position: relative;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border: 10;
  transition: border-radius linear 0.05s, width linear 0.05s;


  &:focus{
    outline: 0;
  }






`;

const SendButtonV2Loading = styled.div`

  
  //display: inline-block;
  border: 0;
  outline: 0;
  padding: 12px 16px;
  line-height: 1.4;
  //background: linear-gradient(#4d4d4d,#2f2f2f);
  //border-radius: 5px;
  //border: 1px solid black;
  font-family: "poppins", Sans-Serif;
  color: white !important;
  font-size: 1.2em;
  cursor: pointer;
  /* Important part */
  position: relative;
  //transition: padding-right .3s ease-out;
  //padding-right: 40px;
  width: 100%;
  top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
    

  &:after{
    content: "";
    position: absolute;
    border-radius: 100%;
    
    
    left: 0px;
    right: 0px;
    margin: 0 auto;
    top: 5px;
    //top: 0px;
    //width: 0px;
    //height: 0px;
    //margin-top: -2px;
    border: 2px solid rgba(255,255,255,0.5);
    border-left-color: #FFF;
    border-top-color: #FFF;
    

    /* , , ${SendButtonV2LoadingAnimationGrow} .3s forwards ease-out */

    width: 14px;
    height: 14px;
    
    //transform: translateY(-50%);
    //margin-top: -8px;
    //right: 13px;
    //transform: translateY(-50%);

    animation: ${SendButtonV2LoadingAnimationSpin} .6s infinite linear;


  }


`;


function Button_Gen({ isLoading, children, ...props }) {
  
  return (
    <StyledLoadingButton className="button" {...props}>
      {isLoading ? <SendButtonV2Loading /> : children}
    </StyledLoadingButton>
  );
}

export default Button_Gen;